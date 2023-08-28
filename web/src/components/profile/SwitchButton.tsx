import { motion } from "framer-motion";

interface SwitchButtonProps {
  isOn: boolean;
  onToggle: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ isOn, onToggle }) => {
  const handleToggle = () => {
    onToggle();
  };

  return (
    <motion.div
      className={`w-16 h-8 rounded-full cursor-pointer p-1 ${
        isOn
          ? "bg-gradient-to-r from-purple-400 to-blue-500"
          : "bg-gradient-to-r from-gray-100 to-gray-300"
      }`}
      onClick={handleToggle}
      initial={{ borderRadius: 50 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`w-6 h-6 rounded-full ${isOn ? "bg-white" : "bg-gray-500"}`}
        layout
        initial={{ x: isOn ? 32 : 0 }} // Mudança aqui
        animate={{ x: isOn ? 32 : 0 }} // Mudança aqui
        transition={{ type: "spring", stiffness: 400, damping: 50 }}
      />
    </motion.div>
  );
};

export default SwitchButton;
