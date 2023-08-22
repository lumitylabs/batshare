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

    case "icons-footer":
      className = " h-[24px] w-[24px] cursor-pointer";
      break;

    case "info-cards":
      className =
        "h-[320px] w-[320px] rounded-[40px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] object-contain";
      break;
  }
  return (
    <img className={className} src={ImagesData[props.name]} alt="Imagem" />
  );
};

export default ImgComponent;
