import ConnectWalletModal from "../../components/home/ConnectWalletModal";
import { useEffect, useState } from "react";
import NavBar from "../../components/general/navbar/NavBar";
import Return from "../../components/general/Return";
import ImgComponent from "../../components/general/manager/img-manager/ImgComponent";
import { InputImage } from "../../components/new-project/InputImage";
import InputTextLine from "../../components/new-project/InputTextLine";
import InputTextArea from "../../components/new-project/InputTextArea";
import PublishButton from "../../components/new-project/PublishButton";
import { InputNFTImage } from "../../components/new-project/InputNFTImage";
import InputLink from "../../components/new-project/InputLink";
import { createUserProject, upload, uploadFile } from "../../model/calls";
import { useMetaMask } from "../../model/useMetaMask";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { contractAddress } from "../../model/ContractData";
import contractJSON from "../../model/QuadraticFunding.json";

function NewProject() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [nftImage, setNftImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useMetaMask();
  const [status, setStatus] = useState("Publish");
  useEffect(() => {
    if (wallet.accounts.length > 0) {
      setFormData({ ...formData, wallet: wallet.accounts[0] });
    }
  }, [wallet]);
  const [formData, setFormData] = useState({
    category: "Art",
    wallet: "",
    description: "",
    image: "",
    link: "",
    next_steps: "",
    nft_image: "",
    twitter: "",
    instagram: "",
    discord: "",
    email: "",
    title: "",
  });

  //const handleUploadSuccess = (link: string) => {
  // setFormData({ ...formData, image: link });
  //};

  async function sendForm() {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        alert("Please switch to the correct testnet, Sepolia.");
        return;
      }
    } else {
      alert("Please install a web3 wallet like, Brave Wallet or Metamask.");
      return;
    }
    const requiredFields = [
      "category",
      "wallet",
      "description",
      "link",
      "next_steps",
      "title",
    ];
    for (const field of requiredFields) {
      if (!(formData as any)[field]) {
        alert(`The field ${field} is required.`);
        return;
      }
    }

    const socialFields = ["twitter", "instagram", "discord", "email"];
    for (const field of socialFields) {
      if ((formData as any)[field]) {
        if (
          field === "email" &&
          !formData[field].match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          )
        ) {
          alert("The email field is not in the correct format.");
          return;
        }

        if (field !== "email" && !(formData as any)[field].startsWith("@")) {
          alert(`The ${field} field should start with '@'.`);
          return;
        }
      }
    }

    if (!projectImage || !nftImage) {
      alert(`You should upload an image for the project and an image for NFT.`);
      return;
    }
    setIsLoading(true);
    var formCopy = Object.assign({}, formData);
    formCopy.image = await uploadImage(projectImage);
    formCopy.nft_image = await uploadImage(nftImage);
    setStatus("Uploading images...");
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new Contract(
          contractAddress,
          contractJSON.abi,
          signer
        );
        var url =
          formCopy.title
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .toLowerCase() +
          "-" +
          formCopy.wallet.substring(0, 5);
        setStatus("Registering...");
        await contract.registerProject(url);
        setStatus("Finishing...");
        await createUserProject(formCopy);
        window.location.href = "/project-details/" + url;
      } catch (e) {
        alert(e);
      }
    }
    setStatus("Publish");
    setIsLoading(false);
  }

  async function uploadImage(file: File) {
    const link: any = await upload({});
    await uploadFile(file, link.url);
    console.log(link.fileName, link.uuid);
    return `https://firebasestorage.googleapis.com/v0/b/batshare-a7917.appspot.com/o/${link.fileName.replace(
      "/i",
      "%2Fi"
    )}?alt=media&token=${link.uuid}`;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

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
      <div className="flex px-[130px] justify-between pt-[27px] mb-[24px]">
        <Return currencyPage="new-project"></Return>
        <PublishButton
          onClick={sendForm}
          isLoading={isLoading}
          status={status}
        ></PublishButton>
      </div>

      <div className="flex justify-center  bg-white h-full gap-6 pb-14">
        {/*form New Project col1*/}
        <div className="flex flex-col w-[62%] pl-[130px] gap-5">
          <div className="flex flex-col border w-full border-gray-300 p-10 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              New Project
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Fill in the fields with your project's details.
            </h2>
            <div className="mt-10">
              <InputTextLine
                placeholder="Project Name"
                onChange={handleInputChange}
                name={"title"}
              ></InputTextLine>
            </div>

            <div className="mt-8">
              <div className="relative inline-block">
                <select
                  name="category"
                  value={formData.category}
                  className="w-[250px] text-16px font-BeVietnamPro appearance-none bg-transparent border-b border-gray-300  focus:border-[#6766BE] focus:outline-none pr-4"
                  onChange={handleInputChange}
                >
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
                onChange={handleInputChange}
                name={"link"}
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
              <InputImage setProjectImage={setProjectImage}></InputImage>
            </div>

            <div className="mt-8">
              <InputTextArea
                placeholder={"Describe your project in more detail..."}
                onChange={handleInputChange}
                name={"description"}
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
                onChange={handleInputChange}
                name={"next_steps"}
              />
            </div>
          </div>
        </div>
        {/*form New Project col2*/}
        <div className="flex flex-col w-[37%] pr-[130px] gap-6">
          <div className="flex flex-col border  border-gray-300 p-7 rounded-[12px]">
            <h1 className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.04em]">
              Achievement
            </h1>
            <h2 className="font-BeVietnamPro font-regular text-[16px] leading-[14px] text-[#828282] tracking-[-0.04em]">
              Image that will be used to reward supporters.
            </h2>

            <div className="flex justify-center mt-8">
              <InputNFTImage setNftImage={setNftImage}></InputNFTImage>
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
              <InputLink
                icon={"email_ic"}
                placeholder={"E-mail"}
                onChange={handleInputChange}
                name={"email"}
              ></InputLink>
              <InputLink
                icon={"x_ic"}
                placeholder={"@username"}
                onChange={handleInputChange}
                name={"twitter"}
              ></InputLink>
              <InputLink
                icon={"instagram_ic"}
                placeholder={"@username"}
                onChange={handleInputChange}
                name={"instagram"}
              ></InputLink>
              <InputLink
                icon={"discord_ic"}
                placeholder={"@username"}
                onChange={handleInputChange}
                name={"discord"}
              ></InputLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
