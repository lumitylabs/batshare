import { WalletChip } from "../general/WalletChip";
import SocialButton from "../general/SocialButton";

export function ProfileHeader() {
  return (
    <div className="flex flex-col">
      <span className="font-BeVietnamPro text-[15px] font-medium leading-[15px] text-[#828282]">
        Collaborator
      </span>
      <span className="font-BeVietnamPro font-semibold text-[24px] leading-[28px] text[#090808]">
        lucianofbn
      </span>

      <div className="flex mt-2 gap-2">
        <div>
          <WalletChip></WalletChip>
        </div>
        <div className="flex space-x-3">
          <SocialButton icon={"email_ic"}></SocialButton>
          <SocialButton icon={"instagram_ic"}></SocialButton>
          <SocialButton icon={"x_ic"}></SocialButton>
          <SocialButton icon={"discord_ic"}></SocialButton>
        </div>
      </div>
    </div>
  );
}
