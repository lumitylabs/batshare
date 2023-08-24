import React from "react";
import ImgComponent from "../manager/img-manager/ImgComponent";
import { motion } from "framer-motion";

interface ConnectWalletModalProps {
  modalIsOpen: any;
  setModalIsOpen: any;
  isConnected: any;
  setIsConnected: any;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = (props) => {
  return props.modalIsOpen ? (
    <div
      onClick={() => props.setModalIsOpen(false)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeOut", duration: 0.3, delay: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[28%] h-[30%] rounded-[30px] relative"
      >
        <button
          onClick={() => props.setModalIsOpen(false)}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <ImgComponent name={"close_ic"} type={"icons-modal"}></ImgComponent>
        </button>
        <div className="flex h-full flex-col justify-center px-6 gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="font-BeVietnamPro font-semibold text-[24px] ">
              Connect Wallet
            </p>
            <p className="text-center font-BeVietnamPro font-regular text-[#5E5A5A] text-[14px]">
              If you don't have a wallet, you can select a provider and{" "}
              <br></br> create one now.{" "}
              <a
                href="#"
                className="text-blue-600 cursor-pointer hover:text-blue-500"
              >
                Learn more
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                props.setIsConnected(true);
                props.setModalIsOpen(false);
              }}
              className="flex py-3 items-center justify-center gap-2 border border-[#DFDFDF] rounded-full hover:bg-[#e1ecfc] hover:border-[#878e9b]"
            >
              <ImgComponent
                name={"bravelogo"}
                type={"brave-modal"}
              ></ImgComponent>
              <span className="font-BeVietnamPro font-medium  text-[#000000] text-[16px]">
                Brave Wallet
              </span>
            </button>

            <button
              onClick={() => {
                props.setIsConnected(true);
                props.setModalIsOpen(false);
              }}
              className="flex py-3 items-center justify-center gap-2 border border-[#DFDFDF] rounded-full hover:bg-[#e1ecfc] hover:border-[#878e9b]"
            >
              <ImgComponent
                name={"metamasklogo"}
                type={"meta-modal"}
              ></ImgComponent>
              <span className="font-BeVietnamPro font-medium  text-[#000000] text-[16px]">
                MetaMask
              </span>
            </button>
          </div>
        </div>

        <div className="flex p-4 border-solid"></div>
      </motion.div>
    </div>
  ) : (
    <div></div>
  );
};

export default ConnectWalletModal;
