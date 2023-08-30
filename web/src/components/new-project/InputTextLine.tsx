interface InputTextLineProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputTextLine: React.FC<InputTextLineProps> = (props) => {
  return (
    <input
      name={props.name}
      type="text"
      className="w-full border-b border-gray-300 focus:border-[#6766BE] placeholder-[#AAAAAA] outline-none font-BeVietnamPro text-[16px]"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default InputTextLine;
