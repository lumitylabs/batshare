import Skeleton from "react-loading-skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="flex h-[320px] w-[550px] rounded-[15px] bg-white">
      <div className="flex h-full w-full">
        <div className="w-[210px] h-[316px] ">
          <Skeleton
            className="flex w-full h-full"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
          />
        </div>

        <div className="flex flex-col py-8 px-6 gap-2">
          <div className="flex flex-col">
            <Skeleton width={100} height={16} className="" />
            <Skeleton width={300} height={20} className="" />
          </div>

          <Skeleton width={300} height={100} className="mb-2" />

          <div className="flex justify-end mt-8">
            <div className="flex">
              <button className="flex justify-center items-center h-[45px] w-[150px] px-4 py-3 border rounded-full border-[#DFDFDF]  hover:bg-gray-50">
                <div className="flex justify-center items-center gap-2">
                  <Skeleton
                    className="flex items-center border-[12px]"
                    width={90}
                    height={0.5}
                  />
                  <Skeleton
                    className="flex items-center border-[12px]"
                    width={20}
                    height={0.5}
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

export default ProjectCardSkeleton;
