import React, { useState } from "react";
import { motion } from "framer-motion";
import ImgComponent from "../manager/img-manager/ImgComponent";
import NavDropDownButton from "./NavDropDownButton";

interface ConnectWalletButtonProps {
  modalIsOpen: any;
  setModalIsOpen: any;
  isConnected: any;
  setIsConnected: any;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const username = "lucianofbn";

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

  return !props.isConnected ? (
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
            <ImgComponent name={"avatar"} type={"avatar-button"} />
          </div>
          <div className="flex flex-col">
            <span className="flex font-BeVietnamPro font-regular text-[12px] leading-[12px] text-[#828282] tracking-[-0.02em]">
              Collaborator
            </span>
            <p className="font-BalooDa2 font-medium text-[18px] leading-[18px] tracking-[-0.02em] ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#903DA4] to-[#EA6846] hover:from-[#EA6846] hover:to-[#903DA4] line-clamp-1">
                {username.length > 13
                  ? `${username.slice(0, 13)}...`
                  : username}
              </span>
            </p>
          </div>
        </div>
        <div className="flex h-full items-center">
          <motion.div animate={{ rotate: isHovered ? 180 : 0 }}>
            <ImgComponent name={"chevrondown_ic"} type={"icons-button"} />
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
              onClick={undefined}
              icon={"LogoutIcon"}
            ></NavDropDownButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
