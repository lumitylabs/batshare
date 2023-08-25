import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImgComponent from "../manager/img-manager/ImgComponent";
import NavDropDownButton from "./NavDropDownButton";
import { useMetaMask } from "../../../model/useMetaMask";
import { createUser, getUser } from "../../../model/calls";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ConnectWalletButtonProps {
  modalIsOpen: any;
  setModalIsOpen: any;
  isConnected: any;
  setIsConnected: any;
}

const connectWallet = async (
  wallet: any,
  setUsername: any,
  setIsLoading: any
) => {
  const isLogged: any = localStorage.getItem("batshare_logged");
  if (isLogged !== null) {
    setIsLoading(true);
    console.log(wallet)

    try {
      const username: any = localStorage.getItem("batshare_username" + wallet);
      if (username === null) {
        const user: any = await getUser({ wallet: wallet });

        if (user === null) {
          await createUser({ wallet: wallet });
        }

        const unnamedUser = user ? user["username"] : "unnamed";
        localStorage.setItem("batshare_username" + wallet, unnamedUser);
        setUsername(unnamedUser);
      } else {
        setUsername(username);
      }
    } finally {
      setIsLoading(false);
    }
  }
};

const disconnectWallet = async (wallet: any, setUsername: any) => {
  // Remover o usuário da localStorage
  localStorage.removeItem("batshare_username" + wallet);
  localStorage.removeItem("batshare_logged");
  setUsername(null);
};

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = (props) => {
  const { wallet } =
    useMetaMask();
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      
      connectWallet(wallet.accounts[0], setUsername, setIsLoading);
    }
  }, [wallet, props.isConnected]);

  useEffect(() => {
    const isLogged: any = localStorage.getItem("batshare_logged");
    if(isLogged !== null){
      setIsLoading(true);
    }
    

  }, []);

  let hoverTimeout: any;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout); // Limpa o timeout se já estiver definido
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Inicia um timeout para fechar o menu após um pequeno atraso
    hoverTimeout = setTimeout(() => {
      setIsHovered(false);
    }, 100); // 300ms de atraso
  };

  return username == null && !isLoading ? (
    <motion.button
      onClick={() => props.setModalIsOpen(true)}
      className="flex justify-center items-center rounded-[12px] h-[50px] w-[200px] bg-white hover:shadow-lg"
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-BalooDa2 font-medium text-[20px] tracking-[-0.02em]">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#903DA4] to-[#EA6846] hover:from-[#EA6846] hover:to-[#903DA4]">
          Connect Wallet
        </span>
      </p>
    </motion.button>
  ) : (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex gap-1 rounded-[12px] px-2 h-[50px] w-[200px] bg-white hover:shadow-lg">
        <div className="flex w-full h-full items-center">
          <div className="flex mr-1.5">
          {isLoading ? (
                <Skeleton height={40} width={40} borderRadius={100}></Skeleton>
              ) : (
                <ImgComponent name={"avatar"} type={"avatar-button"} />
              )}
            
          </div>
          <div className="flex flex-col">
            <span className="flex font-BeVietnamPro font-regular text-[12px] leading-[12px] text-[#828282] tracking-[-0.02em]">
              {isLoading ? (
                <Skeleton height={12} width={50}></Skeleton>
              ) : (
                "Collaborator"
              )}
            </span>
            <p className="font-BalooDa2 font-medium text-[18px] leading-[18px] tracking-[-0.02em] flex">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#903DA4] to-[#EA6846] hover:from-[#EA6846] hover:to-[#903DA4] line-clamp-1">
                {isLoading ? (
                  <Skeleton height={12} width={90}></Skeleton>
                ) : username!.length > 13 ? (
                  `${username!.slice(0, 13)}...`
                ) : (
                  username
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="flex h-full items-center">
          <motion.div animate={{ rotate: isHovered ? 180 : 0 }}>
            <ImgComponent name={"chevrondown_ic"} type={"icons-navbutton"} />
          </motion.div>
        </div>
      </button>
      {isHovered && (
        <div className="absolute top-[100%] mt-2 right-[0] bg-white w-[230px] rounded-[10px] shadow-lg">
          <div className="flex flex-col p-4 w-full gap-4">
            <NavDropDownButton
              title={"Profile"}
              description={"Customize your profile"}
              onClick={undefined}
              icon={"ProfileIcon"}
            ></NavDropDownButton>

            <NavDropDownButton
              title={"Logout"}
              description={"Disconnect your wallet"}
              onClick={() => {
                disconnectWallet(wallet.accounts[0], setUsername);
              }}
              icon={"LogoutIcon"}
            ></NavDropDownButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
