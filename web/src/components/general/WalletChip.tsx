import MulticolorComponent from "../../components/general/manager/svg-manager/MulticolorComponent";

export function WalletChip() {
  return (
    <div className="inline-flex gap-2 py-[2px] px-3 border border-[#DFDFDF] rounded-full hover:bg-blue-50 cursor-pointer">
      <span className="flex items-center font-BalooDa2 font-medium text-[16px] text-[#2F7DCD]">
        0x6e4...AC9a
      </span>
      <MulticolorComponent
        name={"CopyIcon"}
        baseColor={"#2F7DCD"}
        selectedColor={"#3D3D3E"}
        isSelected={false}
        classParameters={"w-[20px] h-[20px]"}
      ></MulticolorComponent>
    </div>
  );
}
