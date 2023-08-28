import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useEffect, useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import DetailsComponent from "../../components/project-details/DetailsComponent";
import { AchievementsComponent } from "../../components/project-details/AchievementsComponent";
import { useParams } from "react-router-dom";
import { getProject, getProjectRaised, getUser } from "../../model/calls";

function ProjectDetails() {
  const projectDefault = {title: "Project Title",
  description: "Project Description",
  next_steps: "Project Next Steps",
  category: "Project Category",
  status: "Project Status",
  creator: "0x000000000000000000000000000000000000",
  link:"github.com",
  nft_image:"",
  image:"",
donations:0};
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { project_id } = useParams();
  const [project, setProject] = useState(projectDefault);
  const [user,setUser]  = useState({avatar:"",username:""});
  const [dailyRaised, setDailyRaised] = useState({projectQuadratic:0,bat_value:0,amount:0});

  useEffect(() => {
    getProject({url:project_id}).then((res: any) => {
      setProject(res);
    });
  }, []);

  useEffect(() => {
    if(project.creator != "0x000000000000000000000000000000000000")
    {
      getUser({wallet:project.creator.toLowerCase()}).then((res: any) => {
        setUser(res);
      });
      getProjectRaised({url:project_id}).then((res: any) => {
        setDailyRaised(res);
      });
    }
    
  },[project]);

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
      <div className="h-[140px] bg-gradient-to-l from-[#626CC2] to-[#7E49AB]"></div>
      <div className="flex pl-20 pt-12 pb-7">
        <Return currencyPage="project-details"></Return>
      </div>

      <div className="flex justify-center bg-white h-full gap-6 pb-14">
        <DetailsComponent
          status={"Active"}
          username={user.username}
          avatar={user.avatar}
          wallet={project.creator}
          social={""}
          title={project.title}
          category={project.category}
          img={project.image}
          text={project.description}
          nextsteps={project.next_steps}
          link={project.link}
        ></DetailsComponent>

        <AchievementsComponent dailyRaised={dailyRaised} nft_image={project.nft_image} donations={project.donations}></AchievementsComponent>
      </div>
    </>
  );
}

export default ProjectDetails;
