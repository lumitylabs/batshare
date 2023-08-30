import { ProjectData } from "../../model/MiniProjectModel";

import MulticolorComponent from "../general/manager/svg-manager/MulticolorComponent";

type ProjectCardProps = {
  project: ProjectData;
  url: string;
};

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  return (
    <div className="flex h-[320px] w-[550px] rounded-[15px] bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]">
      <div className="flex h-full w-full">
        <img
          src={props.project.nft_image}
          className="w-[200px] rounded-l-[12px] object-cover"
        />

        <div className="flex flex-col py-8 px-6 gap-2">
          <div className="flex flex-col">
            <h2 className="font-BeVietnamPro font-medium text-[14px] leading-[14px] text-[#828282] tracking-[-0.05em]">
              {props.project.category}
            </h2>
            <h1 className="font-BeVietnamPro font-bold text-[18px] tracking-[-0.05em]">
              {props.project.title}
            </h1>
          </div>

          <div className="font-BeVietnamPro font-regular text-[16px] text-[#5E5A5A] tracking-[-0.04em] w-[300px] h-[300px]">
            {props.project.description!.length > 190
              ? `${props.project.description!.slice(0, 190)}...`
              : props.project.description}
          </div>

          <div className="flex justify-end mt-10">
            <div className="flex">
              <button
                onClick={() =>
                  (window.location.href = "/project-details/" + props.url)
                }
                className="flex justify-center  items-center h-[45px] w-[150px] px-4 py-3 border rounded-full border-[#DFDFDF]  hover:bg-gray-50"
              >
                <div className="flex justify-center items-center gap-2">
                  <span className="font-BalooDa2 font-medium text-[18px] text-[#090808]">
                    View More
                  </span>

                  <MulticolorComponent
                    name={"ArrowIcon"}
                    baseColor="#121718"
                    selectedColor="#090808"
                    isSelected={false}
                    classParameters="w-[20px] h-[20px]"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
