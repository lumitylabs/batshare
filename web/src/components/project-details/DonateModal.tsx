import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImgComponent from "../general/manager/img-manager/ImgComponent";
import Divider from "../general/Divider";
import contractJSON from "../../model/QuadraticFunding.json";
import tokenContractJSON from "../../model/BatToken.json";

import {
  contractAddress,
  tokenContractAddress,
} from "../../model/ContractData";
import { Contract } from "@ethersproject/contracts";
import { useParams } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { donate } from "../../model/calls";
import { SpinAnimation } from "../general/SpinAnimation";
import { formatBalance } from "../../model/utils";

interface DonateModalProps {
  modalIsOpen: any;
  setModalIsOpen: any;
  title: string;
  category: string;
}

function etherStringToWei(etherString: string) {
  const parts = etherString.split(".");

  let beforeDecimal = parts[0];

  let afterDecimal = parts[1] || "";

  if (afterDecimal.length > 18) {
    afterDecimal = afterDecimal.slice(0, 18);
  }

  while (afterDecimal.length < 18) {
    afterDecimal += "0";
  }
  const weiString = beforeDecimal + afterDecimal;

  return weiString;
}

const DonateModal: React.FC<DonateModalProps> = (props) => {
  const [donationValue, setDonationValue] = useState("1.00");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { project_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [message, setMessage] = useState("Send");
  const [userBalance, setUserBalance] = useState("0");


  useEffect(() => {
    setMessage("Send");
  }, [props.modalIsOpen]);

  useEffect(() => {
    fetchUserBalance();
  }, []);


  async function fetchUserBalance() {
    try {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Pega o endereço da conta atual
        const userAddress = await signer.getAddress();
        
        const tokenContract = new Contract(
          tokenContractAddress,
          tokenContractJSON.abi,
          signer
        );
  
        // Consulta o saldo
        const balance = await tokenContract.balanceOf(userAddress);
  
        // Atualiza o estado com o saldo
        setUserBalance(balance.toString());
      }
    } catch (error) {
      console.error("An error occurred while fetching the user balance: ", error);
    }
  }


  async function handleRedeem() {
    try {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) {
          alert("Please switch to the correct testnet, Sepolia.");
          return;
        }
        setIsRedeeming(true);

        const signer = provider.getSigner();
        const tokenContract = new Contract(
          tokenContractAddress,
          tokenContractJSON.abi,
          signer
        );
        await tokenContract.autoMint();
        await fetchUserBalance();
        setIsRedeeming(false);
      } else {
        alert("Please install a web3 wallet like, Brave Wallet or Metamask.");
        return;
      }
    } catch (error: any) {
      console.log(error);
      // Transação falhou; manipular o erro aqui
      if (
        error.toString().includes("You have already received auto-mint tokens.")
      ) {
        alert("You have already minted tokens.");
      } else {
        alert("An error occurred.");
        console.error(error);
      }
    } finally {
      // Esconder indicador de carregamento
      setIsLoading(false);
    }
  }

  async function handleDonate() {
    if (!isRedeeming && !isLoading) {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) {
          alert("Please switch to the correct testnet, Sepolia.");
          return;
        }

        const signer = provider.getSigner();
        const contract = new Contract(
          contractAddress,
          contractJSON.abi,
          signer
        );
        const tokenContract = new Contract(
          tokenContractAddress,
          tokenContractJSON.abi,
          signer
        );

        try {
          setIsLoading(true);
          const approvedAmount = await tokenContract.allowance(
            await signer.getAddress(),
            contractAddress
          );
          console.log("approvedAmount:", approvedAmount.toString());

          const requiredAmount = etherStringToWei(donationValue);

          if (approvedAmount.lt(requiredAmount)) {
            setMessage("Setting approval...");
            const approveTx = await tokenContract.approve(
              contractAddress,
              requiredAmount
            );
            setMessage("Pending...");
            await approveTx.wait();
          }
          setMessage("Waiting transaction...");
          const transaction = await contract.donate(project_id, requiredAmount);
          setMessage("Pending...");
          await transaction.wait();

          await donate({ transactionHash: transaction.hash });
          setMessage("Finalizing...");

          props.setModalIsOpen(false);
          window.location.reload();
        } catch (error) {
          console.error("Error:", error);
          setMessage("Error :(");
          setIsLoading(false);
        }
      } else {
        alert("Please install a web3 wallet like, Brave Wallet or Metamask.");
        return;
      }
    }
  }

  return props.modalIsOpen ? (
    <div
      onClick={() => (isLoading ? null : props.setModalIsOpen(false))}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeOut", duration: 0.3, delay: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[28%] h-[53%] rounded-[30px] relative"
      >
        <button
          onClick={() => (isLoading ? null : props.setModalIsOpen(false))}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <ImgComponent name={"close_ic"} type={"icons-modal"}></ImgComponent>
        </button>
        <div className="flex h-full flex-col items-center pt-10 px-6 gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="font-BeVietnamPro font-semibold text-[24px] ">
              Donate
            </p>
            <p className="text-center font-BeVietnamPro font-regular text-[#5E5A5A] text-[14px]">
              BAT are donated through
              <br></br>quadratic voting.{" "}
              <a
                href="#"
                className="text-blue-600 cursor-pointer hover:text-blue-500"
              >
                Learn more
              </a>
            </p>
            <div className="my-5 flex justify-center">
              <Divider classParameters="w-[200px] border-color[#000]"></Divider>
            </div>

            <p className="text-center font-BeVietnamPro font-regular text-[#5E5A5A] text-[14px]">
              You are contributing to{" "}
              <span className="font-BeVietnamPro text-[#151A52] font-bold">
                {props.category}
              </span>{" "}
              by donating to
            </p>

            <div className="flex justify-center mt-2 p-3 w-[60%] border border-[#5A90E2] bg-[#F3F4FF] rounded-[12px]">
              <span className="font-BeVietnamPro text-[#151A52] font-bold">
                {props.title}
              </span>
            </div>

            <div className="flex mt-2 mb-">
              <ImgComponent
                name={"arrowdown_ic"}
                type={"long-arrow"}
              ></ImgComponent>
            </div>

            <div className="flex flex-col w-[60%]">
              <div className="flex flex-start">
                <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                  Donation Value
                </span>
              </div>
              <div
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex items-center justify-start border-2 bg-[#FCFCFF] hover:border-[#C98AFF] focus-within:border-[#C98AFF] rounded-[8px] cursor-pointer"
              >
                <div className="flex px-2 items-center justify-center">
                  <ImgComponent
                    name={"batlogo"}
                    type={"bat-icon"}
                  ></ImgComponent>
                </div>
                <div className="flex items-center justify-center border w-[1px] h-[40px]">
                  <div
                    className={`border w-[1px] h-[40px] ${
                      isFocused || isHovered
                        ? "border-[#C98AFF]"
                        : "border-[#DFDFDF]"
                    } hover:border-[#C98AFF]`}
                  ></div>
                </div>
                <input
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  placeholder="0.00"
                  type="number"
                  value={donationValue}
                  onChange={(e) => setDonationValue(e.target.value)}
                  className={`pl-1 flex h-full w-full font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em] bg-transparent border-none outline-none max-w-[80%] ${
                    isFocused ? "border-[#C98AFF]" : "border-[#DFDFDF]"
                  }`}
                />
              </div>
              <div className="flex justify-center">
                <p>
                  Available: <span className="font-bold">{parseFloat(formatBalance(userBalance.toString())) } BAT</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-[70%] flex-col gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={
                //props.setModalIsOpen(false);

                handleDonate
              }
              className={`flex py-3 items-center justify-center gap-2 border rounded-full ${
                isRedeeming ? "opacity-50" : ""
              } ${
                isLoading
                  ? "bg-[#d4d4d4]"
                  : "bg-[#636BC1] hover:bg-[#7f87df] hover:border-[#878e9b]"
              } `}
            >
              <span className="font-BeVietnamPro font-medium  text-[#fff] text-[16px]">
                {message}
              </span>

              {isLoading ? <SpinAnimation></SpinAnimation> : <></>}
            </motion.button>

            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-center font-BeVietnamPro font-regular text-[#5E5A5A] text-[15px] tracking-tighter">
                Need BAT?{" "}
              </p>
              <button className="flex items-center justify-center">
                <span
                  className={`font-BeVietnamPro text-center items-center justify-center font-regular text-[15px] text-[#2F7DCD] ${
                    isRedeeming ? "opacity-50" : ""
                  }`}
                  onClick={() => {
                    !isRedeeming && handleRedeem();
                  }}
                >
                  {isRedeeming ? "Redeeming..." : "Redeem Now"}
                  {isRedeeming && <SpinAnimation />}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex p-4 border-solid"></div>
      </motion.div>
    </div>
  ) : (
    <div></div>
  );
};

export default DonateModal;
