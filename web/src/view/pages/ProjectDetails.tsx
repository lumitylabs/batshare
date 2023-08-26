import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useEffect, useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import DetailsComponent from "../../components/project-details/DetailsComponent";
import { AchievementsComponent } from "../../components/project-details/AchievementsComponent";
import { useParams } from "react-router-dom";
import { getProject } from "../../model/calls";

function ProjectDetails() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { project_id } = useParams();
  const [project, setProject] = useState({
    title: "Project Title",
    description: "Project Description",
    next_steps: "Project Next Steps",
    category: "Project Category",
    status: "Project Status",
  });

  useEffect(() => {
    getProject({url:project_id}).then((res: any) => {
      setProject(res);
    });
  }, []);

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
          title={project.title}
          category={project.category}
          img={"imgdetails"}
          text={project.description}
          nextsteps={project.next_steps}
        ></DetailsComponent>

        <AchievementsComponent></AchievementsComponent>
      </div>
    </>
  );
}

export default ProjectDetails;
