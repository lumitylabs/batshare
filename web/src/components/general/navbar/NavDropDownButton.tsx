import React, { useState } from "react";
import MulticolorComponent from "../manager/svg-manager/MulticolorComponent";

interface NavDropDownButtonProps {
  title: string;
  description: string;
  onClick: any;
  icon: string;
}

const NavDropDownButton: React.FC<NavDropDownButtonProps> = (props) => {
  const [svgHovered, setSvgHovered] = useState(false);
  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setSvgHovered(true)}
      onMouseLeave={() => setSvgHovered(false)}
      className={`flex gap-2 cursor-pointer ${
        svgHovered ? "hover:text-[#BDBEBE]" : ""
      }`}
    >
      <div className="flex">
        <MulticolorComponent
          name={props.icon}
          baseColor="#121718"
          selectedColor="#585B5C"
          isSelected={svgHovered}
          classParameters="w-[25px] h-[25px]"
        />
      </div>

      <div className="flex flex-col gap-[5px] pt-1">
        <span
          className={`text-BeVietnamPro font-medium text-[18px] text-[#121718] leading-[14px] tracking-[-0.02em] ${
            svgHovered ? "text-[#BDBEBE]" : ""
          }`}
        >
          {props.title}
        </span>
        <p
          className={`text-BeVietnamPro font-regular text-[14px] text-[#787777] leading-[14px] tracking-[-0.05em] ${
            svgHovered ? "text-[#BDBEBE]" : ""
          }`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
};
export default NavDropDownButton;
