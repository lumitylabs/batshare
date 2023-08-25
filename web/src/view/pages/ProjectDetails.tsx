import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import DetailsComponent from "../../components/project-details/DetailsComponent";
import { AchievementsComponent } from "../../components/project-details/AchievementsComponent";

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
      <div className="flex justify-center select-none">
        <NavBar
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
      <div className="h-[140px] bg-gradient-to-l from-[#7E49AB] to-[#626CC2]"></div>
      <div className="flex pl-20 pt-12 pb-7">
        <Return currencyPage="project-details"></Return>
      </div>

      <div className="flex justify-center bg-white h-full gap-6 pb-14">
        <DetailsComponent
          status={"Active"}
          username={"Luciano Ferreira"}
          avatar={"avatar"}
          wallet={"0x9e4...BC3a"}
          social={""}
          title={"Blockchain & CO2"}
          category={"Environment"}
          img={"imgdetails"}
          text={
            "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability and sustainability. Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability and sustainability."
          }
          nextsteps={
            "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability and sustainability. Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability and sustainability."
          }
        ></DetailsComponent>

        <AchievementsComponent></AchievementsComponent>
      </div>
    </>
  );
}

export default ProjectDetails;
