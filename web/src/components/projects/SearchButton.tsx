import ImgComponent from "../general/manager/img-manager/ImgComponent";

export function SearchButton() {
  return (
    <button className="flex justify-center items-center h-[50px] w-[50px] bg-[#fff]/20 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <ImgComponent name={"search_ic"} type={"icons-button"}></ImgComponent>
    </button>
  );
}
