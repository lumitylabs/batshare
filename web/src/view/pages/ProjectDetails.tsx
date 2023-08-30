import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useEffect, useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import DetailsComponent from "../../components/project-details/DetailsComponent";
import { AchievementsComponent } from "../../components/project-details/AchievementsComponent";
import { useParams } from "react-router-dom";
import { getProject, getProjectRaised, getUser } from "../../model/calls";
import { UpdateSection } from "../../components/project-details/UpdateSection";
import { CommunityInputText } from "../../components/project-details/CommunityInputText";
import { CommunityComment } from "../../components/project-details/CommunityComment";
import { LatestDonor } from "../../components/project-details/LatestDonor";

function ProjectDetails() {
  const projectDefault = {
    title: "Project Title",
    description: "Project Description",
    next_steps: "Project Next Steps",
    category: "Project Category",
    status: "Project Status",
    creator: "0x000000000000000000000000000000000000",
    link: "github.com",
    nft_image: "",
    image: "",
    donations: 0,
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { project_id } = useParams();
  const [project, setProject] = useState(projectDefault);
  const [user, setUser] = useState({ avatar: "", username: "" });
  const [dailyRaised, setDailyRaised] = useState({
    projectQuadratic: 0,
    bat_value: 0,
    amount: 0,
  });

  useEffect(() => {
    getProject({ url: project_id }).then((res: any) => {
      setProject(res);
    });
  }, []);

  useEffect(() => {
    if (project.creator != "0x000000000000000000000000000000000000") {
      getUser({ wallet: project.creator.toLowerCase() }).then((res: any) => {
        setUser(res);
      });
      getProjectRaised({ url: project_id }).then((res: any) => {
        setDailyRaised(res);
      });
    }
  }, [project]);

  return (
    <>
      <ConnectWalletModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      ></ConnectWalletModal>
      <div className="flex justify-center select-none sticky top-0 z-20">
        <NavBar
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      </div>
      {/*section - top gradient*/}
      {/* <div className="sticky top-0 z-10"> */}
      <div className="h-[140px] bg-gradient-to-l from-[#626CC2] to-[#7E49AB]"></div>
      {/* </div> */}

      <div className="flex pl-[130px] pt-10">
        <Return currencyPage="project-details"></Return>
      </div>

      <div className="flex justify-center bg-white h-full gap-6 pl-[130px] pb-14">
        <div className="flex flex-col w-[60%] mt-6 h-full">
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

          {/*section - Updates*/}

          <div className="flex flex-col mt-10">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
              Updates
            </h1>
            <UpdateSection></UpdateSection>
          </div>

          {/*section - Community*/}

          <div className="flex flex-col mt-10">
            <div className="flex flex-col">
              <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
                Community
              </h1>
              <div className="flex mt-5 flex-col border border-gray-300 rounded-[12px]">
                <CommunityInputText></CommunityInputText>
                <CommunityComment></CommunityComment>
                <CommunityComment></CommunityComment>
              </div>
            </div>
          </div>
        </div>

        {/*section - Achievements*/}
        <div className="flex flex-col w-[40%] sticky top-0 h-screen pr-[130px]">
          <div className="flex flex-col mt-6">
            <AchievementsComponent
              dailyRaised={dailyRaised}
              nft_image={project.nft_image}
              donations={project.donations}
            ></AchievementsComponent>

            {/*section - Latest Donations*/}
            <div className="flex flex-col border w-full border-gray-300 px-10 mt-10 py-5 rounded-[12px]">
              <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
                Latest Donations
              </h1>
              <LatestDonor></LatestDonor>
              <LatestDonor></LatestDonor>
              <LatestDonor></LatestDonor>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetails;
