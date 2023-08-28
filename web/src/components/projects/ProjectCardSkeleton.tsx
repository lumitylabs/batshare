import Skeleton from "react-loading-skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="flex h-[320px] w-[550px] rounded-[15px] bg-white ">
      <div className="flex h-full w-full">
        <div className="w-[200px] h-[310px] overflow-hidden">
          <Skeleton
            className="absolute top-0 left-0 w-full h-full "
            style={{
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
            }}
          />
        </div>

        <div className="flex flex-col py-8 px-6 gap-2">
          <div className="flex flex-col">
            <Skeleton width={100} height={14} className="mb-2" />
            <Skeleton width={300} height={18} className="mb-2" />
          </div>

          <Skeleton width={300} height={100} className="mb-2" />

          <div className="flex justify-end mt-10">
            <div className="flex">
              <button className="flex justify-center items-center h-[45px] w-[150px] px-4 py-3 border rounded-full border-[#DFDFDF]  hover:bg-gray-50">
                <div className="flex justify-center items-center gap-2">
                  <Skeleton circle={true} width={20} height={20} />
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
