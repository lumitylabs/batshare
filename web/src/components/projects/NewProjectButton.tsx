import ImgComponent from "../general/manager/img-manager/ImgComponent";

export function NewProjectButton() {
  return (
    <button
      onClick={() => (window.location.href = "/new-project")}
      className="flex justify-center items-center h-[60px] w-[200px] bg-[#fff]/20 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
    >
      <span className="w-full font-BalooDa2 font-medium text-[20px] text-[#fff]">
        New Project
      </span>
      <span className="w-px h-full bg-[#8C4B5E]" />
      <div className="flex justify-center items-center mx-3">
        <ImgComponent name={"plus_ic"} type={"icons-button"}></ImgComponent>
      </div>
    </button>
  );
}
