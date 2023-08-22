import { motion } from "framer-motion";

export function ConnectWalletButton() {
  return (
    <motion.button
      className="flex justify-center mr-10 items-center rounded-[12px] px-7 py-[9px] bg-white hover:shadow-lg"
      whileHover={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-BalooDa2 font-medium text-[20px] tracking-[-0.02em]">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#903DA4] to-[#EA6846] hover:from-[#EA6846] hover:to-[#903DA4]">
          Connect Wallet
        </span>
      </p>
    </motion.button>
  );
}
