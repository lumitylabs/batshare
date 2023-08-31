import { motion } from "framer-motion";
import { ChangeEvent, DragEvent, useState } from "react";

interface InputNFTProps {
  onImageSelect?: (image: File) => void;
  setNftImage: (image: File) => void;
}

export function InputNFTImage({ onImageSelect, setNftImage }: InputNFTProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = async (file: File | null) => {
    if (file && file.size <= 300 * 1024) {
      setSelectedImage(file);
      onImageSelect?.(file);
      setNftImage(file);
    } else {
      alert("Image size must be less than 300kb!");
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleImageSelect(file);
    event.target.value = ""; // Limpar o valor do input
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0] || null;
    handleImageSelect(file);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative w-[180px] h-[180px] rounded-[12px] overflow-hidden shadow-lg"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="absolute inset-[-6px] bg-gradient-to-tl from-[#C98AFF] via-[rgb(212,242,255)] to-[#71BDFF] rounded-[22px] cursor-pointer"></div>
        <div className="absolute inset-[6px] bg-white rounded-[10px] flex items-center justify-center cursor-pointer">
          <div className="flex gap-2 flex-col items-center justify-center relative z-10 cursor-pointer">
            {selectedImage ? (
              <div className="w-[168px] h-[168px] overflow-hidden rounded-[10px] cursor-pointer">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Add NFT"
                  className={`w-full h-full object-cover`}
                />
              </div>
            ) : (
              <>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex rounded-full p-1 px-3 border border-gray-200 hover:bg-gray-50 select-none cursor-pointer"
                >
                  <span className="font-BeVietnamPro font-regular text-[14px] tracking-[-0.05em]">
                    Add NFT
                  </span>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </label>
    </div>
  );
}
