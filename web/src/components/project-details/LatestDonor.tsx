import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { LatestDonorChip } from "./LatestDonorChip";

export function LatestDonor() {
  return (
    <div className="mt-6 mb-3">
      <div className="flex w-full gap-2">
        <ImgComponent name={"avatar"} type={"avatar"}></ImgComponent>
        <div className="flex flex-col pt-2 gap-2 justify-center">
          <div className="flex flex-col">
            <span className="font-BeVietnamPro text-[16px] font-medium leading-[14px] text-[#828282] tracking-[-0.05em]">
              Collaborator
            </span>
            <span className="font-BeVietnamPro text-[20px] font-semibold text[#090808] tracking-[-0.05em]">
              lucianofbn
            </span>
          </div>

          <div className="flex">
            <LatestDonorChip wallet={"00x000x"}></LatestDonorChip>
            <ImgComponent name={"lineball_ic"} type={""}></ImgComponent>
            <div className=" border py-2 px-3 rounded-[12px] border-gray-200">
              <div className="flex items-center gap-2">
                <ImgComponent name={"batlogo"} type={"bat-icon"}></ImgComponent>
                <span className="font-BeVietnamPro text-[20px] text-center font-bold text[#090808] leading-[20px] tracking-[-0.05em]">
                  30
                </span>
                <span className="font-BeVietnamPro text-[20px] font-regular text[#4D4A4A] leading-[23px] tracking-[-0.05em]">
                  BAT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
