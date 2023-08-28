import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import ImgComponent from "../../components/general/manager/img-manager/ImgComponent";
import { InputProductImage } from "../../components/new-project/InputImage";
import InputTextLine from "../../components/new-project/InputTextLine";
import InputTextArea from "../../components/new-project/InputTextArea";
import PublishButton from "../../components/new-project/PublishButton";
import { InputNFTImage } from "../../components/new-project/InputNFTImage";
import InputLink from "../../components/new-project/InputLink";

function NewProject() {
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
      <div className="h-[140px] bg-gradient-to-l from-[#626CC2] to-[#7E49AB]"></div>
      <div className="flex justify-between pl-20 pr-20 pt-12 pb-7">
        <Return currencyPage="new-project"></Return>
        <PublishButton></PublishButton>
      </div>

      <div className="flex justify-center bg-white h-full gap-6 pb-14">
        {/*form New Project col1*/}
        <div className="flex flex-col w-[45%] gap-5">
          <div className="flex flex-col border w-full border-gray-300 p-10 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              New Project
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Fill in the fields with your project's details.
            </h2>
            <div className="mt-10">
              <InputTextLine placeholder="Project Name"></InputTextLine>
            </div>

            <div className="mt-8">
              <div className="relative inline-block">
                <select className="w-[250px] text-16px font-BeVietnamPro appearance-none bg-transparent border-b border-gray-300  focus:border-[#6766BE] focus:outline-none pr-4">
                  <option selected disabled value="Select Category">
                    Select Category
                  </option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Social">Social</option>
                  <option value="Education">Education</option>
                  <option value="Science">Science</option>
                  <option value="Environment">Environment</option>
                  <option value="Web3">Web 3</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  <ImgComponent name={"chevrondown_ic"} type={"icons-button"} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-8">
              <InputLink
                icon={"link_ic"}
                placeholder={"Repository or website link"}
              ></InputLink>
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 p-7 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              Details
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Add an image and provide the description about your project.
            </h2>

            <div className="mt-8">
              <InputProductImage></InputProductImage>
            </div>

            <div className="mt-8">
              <InputTextArea
                placeholder={"Describe your project in more detail..."}
              />
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 p-7 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              Next Steps
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Describe your next steps for this project.
            </h2>
            <div className="mt-8">
              <InputTextArea
                placeholder={"What are you looking to do next..."}
              />
            </div>
          </div>
        </div>
        {/*form New Project col2*/}
        <div className="flex flex-col w-[45%] gap-5">
          <div className="flex flex-col border  border-gray-300 p-7 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              Achievement
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Image that will be used to reward supporters.
            </h2>

            <div className="flex justify-center mt-8">
              <InputNFTImage></InputNFTImage>
            </div>
          </div>

          <div className="flex flex-col border border-gray-300 p-7 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              Socials
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Add your contact information.
            </h2>

            <div className="flex flex-col mt-8 gap-8">
              <InputLink icon={"email_ic"} placeholder={"E-mail"}></InputLink>
              <InputLink icon={"x_ic"} placeholder={"@username"}></InputLink>
              <InputLink
                icon={"instagram_ic"}
                placeholder={"@username"}
              ></InputLink>
              <InputLink
                icon={"discord_ic"}
                placeholder={"@username"}
              ></InputLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
