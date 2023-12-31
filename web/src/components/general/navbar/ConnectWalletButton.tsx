import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  setIsLoading: any,
  setAvatar: any
) => {
  const isLogged: any = localStorage.getItem("batshare_logged");
  if (isLogged !== null) {
    setIsLoading(true);
    console.log(wallet);

    try {
      const username: any = localStorage.getItem("batshare_username" + wallet);
      const avatar: any = localStorage.getItem("batshare_avatar" + wallet);
      if (username === null) {
        const user: any = await getUser({ wallet: wallet });

        if (user === null) {
          await createUser({ wallet: wallet });
        }

        const unnamedUser = user ? user["username"] : "unnamed";
        const unnamedAvatar = user ? user["avatar"] : "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/4.webp?alt=media&token=5ffa5283-b0a7-4ccd-b47a-d8f565ce370c";
        localStorage.setItem("batshare_username" + wallet, unnamedUser);
        localStorage.setItem("batshare_avatar" + wallet, unnamedAvatar);
        setUsername(unnamedUser);
        setAvatar(unnamedAvatar);
      } else {
        setUsername(username);
        setAvatar(avatar);
      }
    } finally {
      setIsLoading(false);
    }
  }
};

const disconnectWallet = async (wallet: any, setUsername: any) => {
  // Remover o usuário da localStorage
  localStorage.removeItem("batshare_username" + wallet);
  localStorage.removeItem("batshare_avatar" + wallet);
  localStorage.removeItem("batshare_logged");
  setUsername(null);
};

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = (props) => {
  const { wallet } = useMetaMask();
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string>("https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/4.webp?alt=media&token=5ffa5283-b0a7-4ccd-b47a-d8f565ce370c");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectHovered, setIsConnectHovered] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      connectWallet(wallet.accounts[0], setUsername, setIsLoading, setAvatar);
    }
  }, [wallet, props.isConnected]);

  useEffect(() => {
    const isLogged: any = localStorage.getItem("batshare_logged");
    setStartLoading(true);

    if (isLogged !== null) {
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
      onMouseEnter={() => setIsConnectHovered(true)}
      onMouseLeave={() => setIsConnectHovered(false)}
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-BalooDa2 font-medium text-[20px] tracking-[-0.02em]">
        <span
          className={`bg-clip-text text-transparent ${
            isConnectHovered
              ? "bg-gradient-to-r from-[#EA6846] to-[#903DA4]"
              : "bg-gradient-to-r from-[#903DA4] to-[#EA6846]"
          }`}
        >
          {startLoading ? "Connect Wallet" : ""}
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
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fade}
                  transition={{ duration: 0.25 }}
                >
                  <Skeleton
                    height={40}
                    width={40}
                    borderRadius={100}
                  ></Skeleton>
                </motion.div>
              ) : (
                <motion.div
                  key="avatar"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fade}
                >
                  <img src={avatar} className="h-[40px] w-[40px] rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col">
            <span className="flex font-BeVietnamPro font-regular text-[12px] leading-[12px] text-[#828282] tracking-[-0.02em]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 1 }}
                    variants={fade}
                  ></motion.div>
                ) : (
                  <motion.div
                    key="loader"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fade}
                    transition={{ duration: 1 }}
                  >
                    Collaborator
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
            <p className="font-BalooDa2 font-medium text-[18px] leading-[18px] tracking-[-0.02em] ">
              <AnimatePresence mode="wait">
                <span
                  className={`bg-clip-text text-transparent line-clamp-1 ${
                    isHovered
                      ? "bg-gradient-to-r from-[#EA6846] to-[#903DA4]"
                      : "bg-gradient-to-r from-[#903DA4] to-[#EA6846]"
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      key="loader"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fade}
                      transition={{ duration: 0.1 }}
                    >
                      <div className="flex items-center justify-center">
                        <Skeleton height={14} width={90}></Skeleton>
                      </div>
                    </motion.div>
                  ) : username!.length > 13 ? (
                    <motion.div
                      key="loader"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fade}
                      transition={{ duration: 0.5 }}
                    >
                      `${username!.slice(0, 13)}...`
                    </motion.div>
                  ) : (
                    <motion.div
                      key="loader"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fade}
                      transition={{ duration: 0.5 }}
                    >
                      {username}
                    </motion.div>
                  )}
                </span>
              </AnimatePresence>
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
              title={"My Account"}
              description={"Manage your account"}
              onClick={() => (window.location.href = "/profile")}
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
