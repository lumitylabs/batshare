import { WalletChip } from "../general/WalletChip";
import SocialButton from "../general/SocialButton";
import { useMetaMask } from "../../model/useMetaMask";
import { useEffect, useState } from "react";

export function ProfileHeader() {
  const { wallet } = useMetaMask();
  const [userWallet, setUserWallet] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [username, setUsername] = useState("unnamed");

  useEffect(() => {
    if (wallet.accounts.length > 0) {
      setUserWallet(wallet.accounts[0]);
      setUsername(localStorage.getItem("batshare_username" + wallet.accounts[0])!);
    }
  }, [wallet]);



  return (
    <div className="flex flex-col">
      <span className="font-BeVietnamPro text-[15px] font-medium leading-[15px] text-[#828282]">
        Collaborator
      </span>
      <span className="font-BeVietnamPro font-semibold text-[24px] leading-[28px] text[#090808]">
        {username}
      </span>

      <div className="flex mt-2 gap-2">
        <div>
          <WalletChip wallet={userWallet}></WalletChip>
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
