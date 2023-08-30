import { ProjectData } from "../../model/MiniProjectModel";
import ImgComponent from "../general/manager/img-manager/ImgComponent";
import MyProjectStatusFragmentCard from "./MyProjectStatusFragmentCard";

type MyProjectCardProps = {
  project: ProjectData;
  url: string;
};

const MyProjectCard: React.FC<MyProjectCardProps> = () => {
  return (
    <div className="relative flex h-[320px] w-[640px] rounded-[15px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
      <div className="flex h-full w-full">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/nfts%2Fnft1.webp?alt=media&token=f0cc526e-51e4-4bfc-941f-f1f278587ca5"
          }
          className="w-[200px] rounded-l-[12px] object-cover"
        />
        <div className="absolute bottom-0 left-0 p-5 w-[200px]">
          <div className="flex items-center gap-2">
            <p className="flex font-BeVietnamPro text-white/70 font-medium text[13px]">
              Environment
            </p>
            <p className="flex font-BeVietnamPro text-white/70 font-medium text[13px]">
              #12
            </p>
          </div>

          <h2 className="font-BeVietnamPro text-white font-bold text-[17px]">
            Blockchain & CO2
          </h2>
        </div>

        <div className="flex flex-col p-5 gap-2 w-full">
          <div className="flex items-center justify-between">
            <span className="font-BeVietnamPro font-bold text-[20px] tracking-[-0.05em]">
              Donations
            </span>

            <div className="flex items-center gap-1">
              <ImgComponent
                name={"heart_ic"}
                type={"icon-buttons"}
              ></ImgComponent>
              <span className="font-BeVietnamPro font-bold text-[16px] tracking-[-0.05em]">
                10K
              </span>
            </div>
          </div>

          <div className="flex justify-around">
            <div className="flex flex-col w-[44%]">
              <div className="flex flex-start">
                <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                  15-Day Raised
                </span>
              </div>

              <div className="flex items-center justify-start border-2 bg-[#FCFCFF] border-[#C98AFF] rounded-[8px]">
                <div className="flex px-2 items-center justify-center">
                  <ImgComponent
                    name={"batlogo"}
                    type={"icons-button"}
                  ></ImgComponent>
                </div>

                <div className="border w-px h-[40px] border-[#C98AFF]"></div>

                <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                  0
                </span>
              </div>
            </div>

            <div className="flex items-center 100 px-[6px] pt-[26px]">
              <ImgComponent
                name={"longrightarrow_ic"}
                type={"long-arrow-right"}
              ></ImgComponent>
            </div>

            <div className="flex flex-col  w-[44%]">
              <div className="flex flex-start">
                <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                  Total
                </span>
              </div>

              <div className="flex items-center justify-start border-2 bg-[#FFFDDA] border-[#FFE662] rounded-[8px]  ">
                <div className="flex px-2 items-center justify-center">
                  <ImgComponent
                    name={"batlogo"}
                    type={"icons-button"}
                  ></ImgComponent>
                </div>

                <div className="border w-px h-[40px] border-[#FFE662]"></div>

                <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                  0.00
                </span>
              </div>
            </div>
          </div>

          <MyProjectStatusFragmentCard
            status={"active"}
            activeDays={"15"}
          ></MyProjectStatusFragmentCard>
        </div>
      </div>
    </div>
  );
};

export default MyProjectCard;
