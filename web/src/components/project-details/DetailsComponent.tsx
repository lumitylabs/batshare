import ImgComponent from "../general/manager/img-manager/ImgComponent";
import HeaderDetailsComponent from "./HeaderDetailsComponent";

interface DetailsComponentProps {
  img: string;
  text: string;
  nextsteps: string;
  status: string;
  username: string;
  title: string;
  category: string;
  avatar: string;
  wallet: string;
  social: string;
}

const DetailsComponent: React.FC<DetailsComponentProps> = (props) => {
  return (
    <div className="flex flex-col border w-[60%] border-gray-300 p-10 rounded-[12px]">
      <HeaderDetailsComponent
        status={props.status}
        username={props.username}
        title={props.title}
        category={props.category}
        avatar={props.avatar}
        wallet={props.wallet}
        social={props.social}
      ></HeaderDetailsComponent>
      <div className="w-full mt-6">
        <ImgComponent name={props.img} type={"img-details"}></ImgComponent>
      </div>

      <div className="h-full mt-4">
        <p className="font-BeVietnamPro font-regular text-[18px] text-[#141414] tracking-[-0.02em]">
          {props.text}
        </p>
      </div>

      <h1 className="font-BeVietnamPro mt-6 font-bold text-[26px] tracking-[-0.05em]">
        Next Steps
      </h1>

      <p className="font-BeVietnamPro mt-2 font-regular text-[18px] text-[#141414] tracking-[-0.01em]">
        {props.nextsteps}
      </p>
    </div>
  );
};

export default DetailsComponent;
