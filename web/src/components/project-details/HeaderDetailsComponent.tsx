import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { LinkButton } from "./LinkButton";
import { WalletChip } from "./WalletChip";
import SocialButton from "./SocialButton";

interface HeaderDetailsComponentProps {
  status: string;
  username: string;
  title: string;
  category: string;
  avatar: string;
  wallet: string;
  social: string;
}

const HeaderDetailsComponent: React.FC<HeaderDetailsComponentProps> = (
  props
) => {
  return (
    <div className="flex ">
      <div className="flex flex-col w-[55%]">
        <div className="flex mb-3 justify-center items-center h-[28px] w-[80px] bg-[#C4FFB5] rounded-full select-none">
          <span className="font-BeVietnamPro font-regular text-[15px] text-[#0F170E] tracking-[-0.05em]">
            {props.status}
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-BeVietnamPro font-medium text-[16px] leading-[14px] text-[#828282] tracking-[-0.05em]">
            {props.category}
          </h2>
          <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
            {props.title}
          </h1>
        </div>

        <div className="flex">
          <LinkButton></LinkButton>
        </div>
      </div>

      <div className="flex items-center">
        <div className="border-l h-[100px] border-gray-300" />
      </div>

      <div className="flex flex-col justify-center pl-16">
        <div className="flex gap-2">
          <ImgComponent name={props.avatar} type={"avatar"}></ImgComponent>
          <div className="flex justify-center flex-col">
            <span className="font-BeVietnamPro text-[14px] font-medium leading-[14px] text-[#828282]">
              Created by
            </span>
            <span className="font-BeVietnamPro font-semibold text[#090808]">
              {props.username}
            </span>
          </div>
        </div>

        <div className="flex mt-8 space-x-2">
          <WalletChip></WalletChip>
          <SocialButton icon={"x_ic"}></SocialButton>
          <SocialButton icon={"instagram_ic"}></SocialButton>
          <SocialButton icon={"discord_ic"}></SocialButton>
          <SocialButton icon={"email_ic"}></SocialButton>
        </div>
      </div>
    </div>
  );
};
export default HeaderDetailsComponent;
