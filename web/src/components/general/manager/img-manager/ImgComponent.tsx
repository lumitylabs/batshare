import ImagesData from "./ImgsData";

interface ImgComponentProps {
  name: string;
  type: string;
}

const ImgComponent: React.FC<ImgComponentProps> = (props) => {
  let className = "";
  switch (props.type) {
    case "nav-logo":
      className = " h-[20px] w-[20px] pb-[2px] cursor-pointer";
      break;

    case "footer-logo":
      className = " h-[45px] w-[45px] pb-[3px] cursor-pointer";
      break;

    case "icons-modal":
      className = "h-[28px] w-[28px]";
      break;

    case "icons-social":
      className = "h-[18px] w-[18px]";
      break;

    case "icons-navbutton":
      className = "h-[16px] w-[16px]";
      break;

    case "icons-button":
      className = "h-[26px] w-[26px]";
      break;

    case "brave-modal":
      className = "min-h-[28px] min-w-[24px] w-[24px] h-[28px]";
      break;

    case "meta-modal":
      className = "min-h-[30px] min-w-[28px] h-[30px] w-[28px]";
      break;

    case "icons-footer":
      className = " h-[24px] w-[24px] cursor-pointer select-none";
      break;

    case "avatar-button":
      className = " h-[40px] w-[40px] rounded-full";
      break;

    case "avatar":
      className = " h-[60px] w-[60px] rounded-full";
      break;

    case "profile-avatar":
      className = " h-[190px] w-[190px] rounded-[12px] shadow-2xl";
      break;

    case "latestdonor-avatar":
      className = " h-[70px] w-[70px] rounded-full";
      break;

    case "update-avatar":
      className = " h-[90px] w-[90px] rounded-full shadow-2xl";
      break;

    case "info-cards":
      className =
        "h-[320px] w-[320px] rounded-[40px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] object-contain select-none";
      break;

    case "nft-cards":
      className = "w-[200px] rounded-l-[12px] object-cover";
      break;

    case "nft-achievements":
      className = "w-[350px] h-[350px] rounded-[12px] object-cover";
      break;

    case "bat-icon":
      className = "w-[20px] h-[20px] object-contain";
      break;

    case "long-arrow":
      className = "w-[20px] h-[30px]";
      break;

    case "long-arrow-right":
      className = "w-[30px] h-[30px]";
      break;

    case "nft-donate":
      className = "w-[160px] h-[160px] rounded-[12px] object-cover ";
      break;

    case "nft-update":
      className = "w-[170px] h-[170px] rounded-[12px] object-cover ";
      break;

    case "img-details":
      className = "w-full h-[300px] rounded-[12px] object-cover";
      break;

    case "update-gallery":
      className = "w-[60px] h-[60px] rounded-[12px] object-cover shadow-lg";
      break;
  }
  return (
    <img className={className} src={ImagesData[props.name]} alt="Imagem" />
  );
};

export default ImgComponent;
