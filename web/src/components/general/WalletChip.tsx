import { motion } from "framer-motion";
import MulticolorComponent from "../../components/general/manager/svg-manager/MulticolorComponent";

function truncateWallet(wallet: string, startLength = 6, endLength = 4) {
  const truncatedPart = "...";
  if (wallet.length > startLength + endLength) {
    return (
      wallet.substring(0, startLength) +
      truncatedPart +
      wallet.substring(wallet.length - endLength)
    );
  }
  return wallet;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}

export function WalletChip(props: { wallet: string }) {
  const handleCopyClick = () => {
    copyToClipboard(props.wallet);
  };

  return (
    <motion.button
      onClick={handleCopyClick}
      className="inline-flex gap-2 py-[2px] px-3 border border-[#DFDFDF] rounded-full hover:bg-blue-50 cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex font-BalooDa2 font-medium text-[16px] text-[#2F7DCD]">
        {truncateWallet(props.wallet, 6, 4)}
      </span>
      <MulticolorComponent
        name={"CopyIcon"}
        baseColor={"#2F7DCD"}
        selectedColor={"#3D3D3E"}
        isSelected={false}
        classParameters={"w-[20px] h-[20px]"}
      ></MulticolorComponent>
    </motion.button>
  );
}
