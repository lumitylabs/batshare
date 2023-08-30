import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import ImgComponent from "../../components/general/manager/img-manager/ImgComponent";
import MulticolorComponent from "../../components/general/manager/svg-manager/MulticolorComponent";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import MyAchievementsFragment from "../../components/profile/MyAchievementsFragment";
import MyProjectsFragment from "../../components/profile/MyProjectsFragment";
import EditProfileFragment from "../../components/profile/EditProfileFragment";

function Profile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [isOn, setIsOn] = useState(false); // <- switch

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  let fragmentToRender;

  switch (selectedTab) {
    case 1:
      fragmentToRender = (
        <MyAchievementsFragment isOn={isOn} handleToggle={handleToggle} />
      );
      break;

    case 2:
      fragmentToRender = <MyProjectsFragment />;
      break;
    case 3:
      fragmentToRender = <EditProfileFragment />;
  }

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
      <div className="h-[350px] bg-gradient-to-l from-[#626CC2] to-[#7E49AB]"></div>
      <div className="absolute top-[300px] left-[250px] transform -translate-x-1/2 -translate-y-1/2">
        <ImgComponent name={"avatar"} type={"profile-avatar"}></ImgComponent>
      </div>

      <div className="absolute top-1/1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
        <div className="flex bg-white h-[72px] pt-[6px] w-[780px] rounded-[12px] shadow-2xl">
          <div className="flex items-center w-full justify-around ">
            <div
              className={`flex items-center gap-2 ${
                selectedTab === 1 ? "hovered" : ""
              }`}
              onClick={() => handleTabClick(1)}
            >
              <div className="flex flex-col pb-[20px]">
                <MulticolorComponent
                  name={"TrophyIcon"}
                  baseColor={"#7A90FF"}
                  selectedColor={"#B166FF"}
                  isSelected={selectedTab === 1}
                  classParameters="h-[34px] w-[34px] cursor-pointer"
                ></MulticolorComponent>
              </div>
              <div
                className={`flex flex-col cursor-pointer text-gradient ${
                  selectedTab === 1 ? "text-gradient-hovered" : ""
                }`}
              >
                <span
                  className={`font-BeVietnamPro font-medium text-[18px] leading-[17px] tracking-[-0.07em] ${
                    selectedTab === 1
                      ? "text-transparent bg-clip-text bg-gradient-to-l from-[#7A90FF] to-[#B166FF]"
                      : "text-[#7A90FF]"
                  } hover:from-[#699CFF] hover:to-[#B166FF]`}
                >
                  Achievements
                </span>
                <span className="font-BeVietnamPro font-regular text-gray-400 text-[14px] tracking-[-0.04em]">
                  Explore your rewards
                </span>
              </div>
            </div>
            {/* Code for the second tab */}
            <div
              className={`flex items-center gap-2 ${
                selectedTab === 2 ? "hovered" : ""
              }`}
              onClick={() => handleTabClick(2)}
            >
              <div className="flex flex-col pb-[20px]">
                <MulticolorComponent
                  name={"ProjectsIcon"}
                  baseColor={"#7A90FF"}
                  selectedColor={"#B166FF"}
                  isSelected={selectedTab === 2}
                  classParameters="h-[34px] w-[34px] cursor-pointer"
                ></MulticolorComponent>
              </div>
              <div
                className={`flex flex-col cursor-pointer text-gradient ${
                  selectedTab === 2 ? "text-gradient-hovered" : ""
                }`}
              >
                <span
                  className={`font-BeVietnamPro font-medium text-[18px] leading-[17px] tracking-[-0.07em] ${
                    selectedTab === 2
                      ? "text-transparent bg-clip-text bg-gradient-to-l from-[#7A90FF] to-[#B166FF]"
                      : "text-[#7A90FF]"
                  } hover:from-[#699CFF] hover:to-[#B166FF]`}
                >
                  Projects
                </span>
                <span className="font-BeVietnamPro font-regular text-gray-400 text-[14px] tracking-[-0.04em]">
                  View your projects
                </span>
              </div>
            </div>
            {/* Code for the third tab */}
            <div
              className={`flex items-center gap-2 ${
                selectedTab === 3 ? "hovered" : ""
              }`}
              onClick={() => handleTabClick(3)}
            >
              <div className="flex flex-col pb-[20px]">
                <MulticolorComponent
                  name={"EditIcon"}
                  baseColor={"#7A90FF"}
                  selectedColor={"#B166FF"}
                  isSelected={selectedTab === 3}
                  classParameters="h-[34px] w-[34px] cursor-pointer"
                ></MulticolorComponent>
              </div>
              <div
                className={`flex flex-col cursor-pointer text-gradient ${
                  selectedTab === 3 ? "text-gradient-hovered" : ""
                }`}
              >
                <span
                  className={`font-BeVietnamPro font-medium text-[18px] leading-[17px] tracking-[-0.07em] ${
                    selectedTab === 3
                      ? "text-transparent bg-clip-text bg-gradient-to-l from-[#7A90FF]  to-[#B166FF]"
                      : "text-[#7A90FF]"
                  } hover:from-[#699CFF]  hover:to-[#B166FF]`}
                >
                  Profile
                </span>
                <span className="font-BeVietnamPro font-regular text-gray-400 text-[14px]  tracking-[-0.04em]">
                  Edit your profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-16 pl-[160px]">
        <ProfileHeader></ProfileHeader>
      </div>

      <div className="flex flex-col px-[160px] pt-14 h-full w-full mb-[50px]">
        {fragmentToRender}
      </div>
    </>
  );
}

export default Profile;
