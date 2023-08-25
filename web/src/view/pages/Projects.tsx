import backgroundHome from "../../assets/background_home.webp";
import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import NavBar from "../../components/general/navbar/NavBar";
import { useState } from "react";
import Divider from "../../components/general/Divider";
import { FilterButton } from "../../components/projects/FilterButton";
import { NewProjectButton } from "../../components/projects/NewProjectButton";
import { SearchButton } from "../../components/projects/SearchButton";
import { Footer } from "../../components/general/Footer";
import ProjectCard from "../../components/projects/ProjectCard";

function Projects() {
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
          height: "100%",
        }}
      >
        <div className="flex justify-center select-none">
          <NavBar
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />
        </div>
        <div className="flex h-screen justify-center items-center">
          <div className="flex mt-64 flex-col h-[1000px] w-[1350px] rounded-[70px] bg-gradient-to-t from-[#4F2F5D] to-[#904C5E]">
            <div className="flex pt-14 px-14">
              <h1 className="font-BeVietnamPro font-bold text-white text-[40px] tracking-[-0.05em]">
                Projects
              </h1>
            </div>

            <div className="flex justify-between px-14">
              <div className="flex pt-3 pb-3 gap-3">
                <div className="flex">
                  <FilterButton></FilterButton>
                </div>

                <div className="flex">
                  <SearchButton></SearchButton>
                </div>
              </div>

              <div className="flex">
                <NewProjectButton></NewProjectButton>
              </div>
            </div>
            <Divider classParameters={"mt-4 border-[#78425E]"}></Divider>

            {/*Card*/}
            <div className="flex justify-center">
              <div className="grid gap-16 grid-cols-2 pt-9">
                <ProjectCard
                  category={"Environment"}
                  title={"Blockchain & CO2"}
                  description={
                    "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability..."
                  }
                  img={"nft_card"}
                ></ProjectCard>

                <ProjectCard
                  category={"Environment"}
                  title={"Blockchain & CO2"}
                  description={
                    "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability..."
                  }
                  img={"nft_card"}
                ></ProjectCard>

                <ProjectCard
                  category={"Environment"}
                  title={"Blockchain & CO2"}
                  description={
                    "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability..."
                  }
                  img={"nft_card"}
                ></ProjectCard>

                <ProjectCard
                  category={"Environment"}
                  title={"Blockchain & CO2"}
                  description={
                    "Utilizing blockchain technology to ensure transparent tracking and management of carbon emissions, the 'Blockchain & CO2' project aims to create a verifiable and secure system to foster accountability..."
                  }
                  img={"nft_card"}
                ></ProjectCard>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-52 select-none">
          <Footer style="dark"></Footer>
        </div>
      </div>
    </>
  );
}

export default Projects;
