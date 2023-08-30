import { motion } from "framer-motion";
import { SpinAnimation } from "../general/SpinAnimation";

interface MyProjectStatusFragmentCardProps {
  status: "active" | "disabled";
  activeDays?: string;
  onClick: () => void;
  isWithdrawing?: boolean;
}

const MyProjectStatusFragmentCard: React.FC<
  MyProjectStatusFragmentCardProps
> = (props) => {
  const { status, activeDays, onClick, isWithdrawing } = props;

  const statusInfo = {
    active: {
      title: "Ready for Donations!",
      buttonText: `Update in ${activeDays} days`,
      description:
        "Your project will join the next round. Donations are distributed at the end of each round.",
      chipColor: "bg-[#C3FFBE]",
      chipTextColor: "text-[#425F40]",
      textColor: "text-black",
    },
    disabled: {
      title: "Update your Project",
      buttonText: "Update",
      description:
        "You need to update your donors to participate in the next round of donations.",
      chipColor: "bg-gray-300",
      chipTextColor: "text-[#656565]",
      textColor: "text-black",
    },
  };

  const {
    title,
    buttonText,
    description,
    chipColor,
    chipTextColor,
    textColor,
  } = statusInfo[status];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mt-3">
          <span
            className={`font-BeVietnamPro font-bold text-[20px] tracking-[-0.05em] ${textColor}`}
          >
            {title}
          </span>
          <div
            className={`flex items-center rounded-full px-4 py-1 ${chipColor}`}
          >
            <span
              className={`font-BeVietnamPro font-medium text-[15px] ${chipTextColor}`}
            >
              {status === "active" ? "Active" : "Disabled"}
            </span>
          </div>
        </div>
        <p
          className={`font-BeVietnamPro font-medium text-[16px] text-[#656565] tracking-[-0.03em] ${textColor}`}
        >
          {description}
        </p>
      </div>

      <div className="flex justify-around gap-3">
        <motion.button
          onClick={() => "#"}
          whileHover={status === "disabled" ? { scale: 0.95 } : undefined}
          transition={{
            duration: 0.2,
          }}
          className={`flex w-[50%] py-[10px] items-center border px-4 justify-center rounded-full shadow-xl ${
            status === "disabled" ? "border-gray-400" : "bg-gray-200"
          } text-${status === "disabled" ? "gray-600" : "black"}`}
        >
          <span
            className={`font-BalooDa2 font-medium text-[18px] ${
              status === "disabled" ? "text-gray-600" : "text-black"
            }`}
          >
            {buttonText}
          </span>
        </motion.button>
        {status === "active" ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            whileHover={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="flex gap-2 w-[50%] py-[10px] px-4 items-center justify-center rounded-full bg-gradient-to-r shadow-xl from-[#C98AFF] to-[#71BDFF] hover:from-[#71BDFF] hover:to-[#C98AFF] hover:shadow-lg"
          >
            <span className="font-BalooDa2 font-medium text-[18px] text-white">
              Withdraw
            </span>
            {isWithdrawing && <SpinAnimation></SpinAnimation>}
          </motion.button>
        ) : (
          <motion.button
            onClick={() => "#"}
            whileHover={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="flex w-[50%] py-[10px] px-4 items-center justify-center rounded-full bg-gradient-to-r shadow-xl from-[#C98AFF] to-[#71BDFF] hover:from-[#71BDFF] hover:to-[#C98AFF] hover:shadow-lg"
          >
            <span className="font-BalooDa2 font-medium text-[18px] text-white">
              Withdraw
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default MyProjectStatusFragmentCard;
