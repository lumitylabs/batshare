import ImgComponent from "../general/manager/img-manager/ImgComponent";

interface SocialButtonProps {
  icon: string;
}

const SocialButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <div className="flex items-center  border rounded-[6px] px-2 py-1 border-[#DFDFDF] hover:bg-blue-50 cursor-pointer select-none">
      <ImgComponent name={props.icon} type={"icons-social"}></ImgComponent>
    </div>
  );
};

export default SocialButton;
