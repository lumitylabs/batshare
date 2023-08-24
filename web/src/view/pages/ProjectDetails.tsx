import backgroundHome from "../../assets/background_home.webp";
import ConnectWalletModal from "../../components/general/navbar/ConnectWalletModal";
import { useState } from "react";

function ProjectDetails() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <ConnectWalletModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      ></ConnectWalletModal>

      <div
        style={{
          backgroundImage: `url('${backgroundHome}')`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      ></div>
    </>
  );
}

export default ProjectDetails;
