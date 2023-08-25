import ImgComponent from "../../components/general/manager/img-manager/ImgComponent";

export function LinkButton() {
  return (
    <a
      href="#"
      className="inline-flex mt-3 items-center gap-2 justify-center border border-[#DFDFDF] rounded-[6px] px-2 py-1 hover:bg-blue-50 cursor-pointer select-none"
    >
      <ImgComponent name={"link_ic"} type={"icons-navbutton"}></ImgComponent>
      <span className="font-BalooDa2 font-medium text-[#2F7DCD] text-[16px]">
        github.com/lucianofbn
      </span>
    </a>
  );
}
