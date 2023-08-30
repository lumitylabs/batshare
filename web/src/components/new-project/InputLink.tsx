import ImgComponent from "../general/manager/img-manager/ImgComponent";
import InputTextLine from "./InputTextLine";

interface InputLinkProps {
  icon: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputLink: React.FC<InputLinkProps> = (props) => {
  return (
    <div className="flex w-full gap-2">
      <div className="flex items-center border rounded-[6px] px-2 py-1 border-[#DFDFDF] cursor-pointer select-none">
        <ImgComponent name={props.icon} type={"icons-social"}></ImgComponent>
      </div>
      <InputTextLine
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      ></InputTextLine>
    </div>
  );
};

export default InputLink;
