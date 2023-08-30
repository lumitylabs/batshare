import ImgComponent from "../general/manager/img-manager/ImgComponent";
import MyProjectStatusFragmentCard from "./MyProjectStatusFragmentCard";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { contractAddress } from "../../model/ContractData";
import contractJSON from "../../model/QuadraticFunding.json";
import { useState } from "react";

type MyProjectCardProps = {
  title: string;
  category: string;
  round: string;
  raised: string;
  total: string;
  nft_img: string;
  donations: string;
  wallet: string;
};

const MyProjectCard: React.FC<MyProjectCardProps> = (props) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  async function handleWithdraw() {
    try {
      if (window.ethereum) {
        const provider = new Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111) {
          alert("Please switch to the correct testnet, Sepolia.");
          return;
        }
        setIsWithdrawing(true);

        const signer = provider.getSigner();
        const contract = new Contract(
          contractAddress,
          contractJSON.abi,
          signer
        );
        const project_id =
          props.title
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .toLowerCase() +
          "-" +
          props.wallet.substring(0, 5);
        console.log(project_id);
        console.log(props.wallet);
        await contract.callStatic.withdraw(project_id);
        const back = await contract.withdraw(project_id);
        console.log(back);
        setIsWithdrawing(false);
      } else {
        alert("Please install a web3 wallet like, Brave Wallet or Metamask.");
        return;
      }
    } catch (error: any) {
      console.log(error);
      // Transação falhou; manipular o erro aqui
      if (error.toString().includes("No funds to withdraw")) {
        alert("No funds to withdraw.");
      } else {
        alert("An error occurred.");
        console.error(error);
      }
    } finally {
      // Esconder indicador de carregamento
    }
  }

  return (
    <div className="relative flex h-[320px] w-[640px] rounded-[15px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
      <div className="flex h-full w-full">
        <img
          src={props.nft_img}
          className="w-[200px] rounded-l-[12px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25 rounded-l-[12px] w-[200px]"></div>

        <div className="absolute bottom-0 left-0 p-5 w-[200px]">
          <div className="flex items-center gap-2">
            <p className="flex font-BeVietnamPro text-white/70 font-medium text[13px]">
              {props.category}
            </p>
            <p className="flex font-BeVietnamPro text-white/70 font-medium text[13px]">
              #{props.round}
            </p>
          </div>

          <h2 className="font-BeVietnamPro text-white font-bold text-[17px]">
            {props.title}
          </h2>
        </div>

        <div className="flex flex-col p-5 gap-2 w-full">
          <div className="flex items-center justify-between">
            <span className="font-BeVietnamPro font-bold text-[20px] tracking-[-0.05em]">
              Donations
            </span>

            <div className="flex items-center gap-1">
              <ImgComponent
                name={"heart_ic"}
                type={"icon-buttons"}
              ></ImgComponent>
              <span className="font-BeVietnamPro font-bold text-[16px] tracking-[-0.05em]">
                {props.donations}
              </span>
            </div>
          </div>

          <div className="flex justify-around">
            <div className="flex flex-col w-[44%]">
              <div className="flex flex-start">
                <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                  15-Day Raised
                </span>
              </div>

              <div className="flex items-center justify-start border-2 bg-[#FCFCFF] border-[#C98AFF] rounded-[8px]">
                <div className="flex px-2 items-center justify-center">
                  <ImgComponent
                    name={"batlogo"}
                    type={"icons-button"}
                  ></ImgComponent>
                </div>

                <div className="border w-px h-[40px] border-[#C98AFF]"></div>

                <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                  0
                </span>
              </div>
            </div>

            <div className="flex items-center 100 px-[6px] pt-[26px]">
              <ImgComponent
                name={"longrightarrow_ic"}
                type={"long-arrow-right"}
              ></ImgComponent>
            </div>

            <div className="flex flex-col  w-[44%]">
              <div className="flex flex-start">
                <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                  Total
                </span>
              </div>

              <div className="flex items-center justify-start border-2 bg-[#FFFDDA] border-[#FFE662] rounded-[8px]  ">
                <div className="flex px-2 items-center justify-center">
                  <ImgComponent
                    name={"batlogo"}
                    type={"icons-button"}
                  ></ImgComponent>
                </div>

                <div className="border w-px h-[40px] border-[#FFE662]"></div>

                <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                  0.00
                </span>
              </div>
            </div>
          </div>

          <MyProjectStatusFragmentCard
            status={"active"}
            activeDays={"15"}
            onClick={() => handleWithdraw()}
            isWithdrawing={isWithdrawing}
          ></MyProjectStatusFragmentCard>
        </div>
      </div>
    </div>
  );
};

export default MyProjectCard;
