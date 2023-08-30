import backgroundHome from "../../assets/background_home.webp";
import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import NavBar from "../../components/general/navbar/NavBar";
import { useEffect, useState } from "react";
import Divider from "../../components/general/Divider";
import { FilterButton } from "../../components/projects/FilterButton";
import { NewProjectButton } from "../../components/projects/NewProjectButton";
import { SearchButton } from "../../components/projects/SearchButton";
import { Footer } from "../../components/general/Footer";
import ProjectCard from "../../components/projects/ProjectCard";
import { getProjects } from "../../model/calls";
import { MiniProjectModel } from "../../model/MiniProjectModel";
import ProjectCardSkeleton from "../../components/projects/ProjectCardSkeleton";

function Projects() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [projects, setProjects] = useState<MiniProjectModel>({});
  const projectKeys = Object.keys(projects);

  useEffect(() => {
    getProjects({}).then((res: any) => {
      const projectKeys = Object.keys(res);
      shuffle(projectKeys);

      const shuffledProjects = projectKeys.reduce((acc:any, key) => {
        acc[key] = res[key];
        return acc;
      }, {});

      setProjects(shuffledProjects);
    });
  }, []);

  function shuffle(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

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
        <div className="flex justify-center items-center">
          <div className="flex mt-32 flex-col w-[1350px] rounded-[70px] bg-gradient-to-t from-[#4F2F5D] to-[#904C5E]">
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
            <div className="flex justify-center mb-10">
              <div className="grid gap-16 grid-cols-2 pt-9 ">
                {Object.keys(projects).length === 0
                  ? Array.from({ length: 4 }, (_, index) => (
                      <ProjectCardSkeleton key={index} />
                    ))
                  : Object.keys(projects).map((url) => (
                      <ProjectCard
                        project={projects[url]}
                        url={url}
                        key={url}
                      />
                    ))}
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
