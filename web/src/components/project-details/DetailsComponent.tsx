import Skeleton from "react-loading-skeleton";
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
  link: string;
}

const DetailsComponent: React.FC<DetailsComponentProps> = (props) => {
  return (
    <div className="flex flex-col border border-gray-300 p-10 rounded-[12px]">
      <HeaderDetailsComponent
        status={props.status}
        username={props.username}
        title={props.title}
        category={props.category}
        avatar={props.avatar}
        wallet={props.wallet}
        social={props.social}
        link={props.link}
      ></HeaderDetailsComponent>
      <div className="w-full mt-6">
        {props.img === "" ? (
          <Skeleton height={300} width={1080} borderRadius={12}></Skeleton>
        ) : (
          <img
            src={props.img}
            className="w-full h-[300px] rounded-[12px] object-cover"
          ></img>
        )}
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
