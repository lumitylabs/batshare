interface InputTextLineProps {
  placeholder: string;
}
const InputTextLine: React.FC<InputTextLineProps> = (props) => {
  return (
    <input
      type="text"
      className="w-full border-b border-gray-300 focus:border-[#6766BE] placeholder-[#AAAAAA] outline-none font-BeVietnamPro text-[16px]"
      placeholder={props.placeholder}
    />
  );
};

export default InputTextLine;
