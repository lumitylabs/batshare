import { motion } from "framer-motion";
import { ChangeEvent, DragEvent, useState } from "react";

interface InputImageProps {
  onImageSelect?: (image: File) => void;
  setProjectImage: (image: File) => void;
}

export function InputImage({
  onImageSelect,
  setProjectImage,
}: InputImageProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = async (file: File | null) => {
    if (file && file.size <= 300 * 1024) {
      setSelectedImage(file);
      onImageSelect?.(file);
      setProjectImage(file);
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
    <>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex justify-center items-center h-[300px] w-full border-gray-300 border-dashed border-[2px] text-center rounded-xl cursor-pointer overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="flex gap-2 flex-col items-center justify-center">
          {selectedImage ? (
            <div className="">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Add Image"
                className={`min-h-[300px]`}
              />
            </div>
          ) : (
            <>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="inline-flex rounded-full p-1 px-3 border boder-gray-200  hover:bg-gray-50"
              >
                <span className="font-BeVietnamPro font-regular text-[14px] tracking-[-0.05em]">
                  Add Image
                </span>
              </motion.div>
            </>
          )}
        </div>
      </label>
    </>
  );
}
