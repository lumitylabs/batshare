import ImgComponent from "../manager/img-manager/ImgComponent";
import ConnectWalletButton from "./ConnectWalletButton";

interface NavBarProps {
  modalIsOpen: any;
  setModalIsOpen: any;
  isConnected: any;
  setIsConnected: any;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <nav className="flex fixed top-[15px] left-50 bg-[#4E607E] bg-opacity-20 p-2 rounded-[12px] backdrop-blur-md select-none">
      <button className="flex items-center ml-2 gap-1">
        <div className="flex h-[30px] w-[30px] items-center justify-center bg-white rounded-full">
          <ImgComponent name={"batsharelogo"} type={"nav-logo"}></ImgComponent>
        </div>

        <span className="font-BalooDa2 text-white font-bold text-[30px] tracking-[-0.05em]">
          batshare
        </span>
      </button>

      <div className="flex items-center justify-center ml-6 space-x-6">
        <a
          href="#"
          className="text-[#FFFFFF] font-BeVietnamPro font-regular tracking-[-0.05em] hover:text-[#B5CAFF] "
        >
          How it Works?
        </a>
        <a
          href="#"
          className="text-[#FFFFFF] font-BeVietnamPro font-regular tracking-[-0.05em] hover:text-[#B5CAFF]"
        >
          Projects
        </a>

        <ConnectWalletButton
          modalIsOpen={props.modalIsOpen}
          setModalIsOpen={props.setModalIsOpen}
          isConnected={props.isConnected}
          setIsConnected={props.setIsConnected}
        ></ConnectWalletButton>
      </div>
    </nav>
  );
};
export default NavBar;
