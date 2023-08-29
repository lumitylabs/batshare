import React, { useState, useRef, useEffect } from "react";

interface InputTextAreaProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

const InputTextArea: React.FC<InputTextAreaProps> = ({ placeholder, name, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);



  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset the height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set the height to scrollHeight
    }
   }, [onChange]);

  return (
    <div className="w-full">
      <textarea
      name={name}
        ref={textAreaRef}
        onChange={onChange}
        className={`w-full border-b border-gray-300 placeholder-[#AAAAAA] font-BeVietnamPro text-[16px] ${
          isFocused
            ? "font-BeVietnamPro text-black"
            : "font-BeVietnamPro placeholder-[#AAAAAA]"
        }  focus:border-[#6766BE] focus:border-opacity focus:outline-none transition-colors duration-300 font-BeVietnamPro text-[16px]`}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          wordWrap: "break-word",
          resize: "none",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: "20px",
        }}
        
      />
    </div>
  );
};

export default InputTextArea;
