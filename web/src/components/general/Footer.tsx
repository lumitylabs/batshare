import { motion } from "framer-motion";
import ImgComponent from "./manager/img-manager/ImgComponent";

export function Footer({ style }: { style: "dark" | "light" }) {
  const baseClasses = {
    light: {
      container: "bg-gradient-to-l from-[#C4A5A0] to-[#BB9EC2]",
      text: "text-white",
      link: "text-white hover:underline",
      button: "bg-[#B54A5E] hover:bg-[#CC5B70] text-white",
      dev: "text-[#79687B]",
    },
    dark: {
      container: "bg-gradient-to-l from-[#201B23] to-[#48394C]",
      text: "text-white",
      link: "text-[#D3D3D3] hover:underline",
      button: "bg-[#B54A5E] hover:bg-[#CC5B70] text-white",
      dev: "text-[#8E8E8E]",
    },
  };

  const styleClasses = baseClasses[style];

  return (
    <div
      className={`flex items-center justify-between w-[1350px] h-[420px] rounded-t-[60px] px-20 ${styleClasses.container}`}
    >
      <div className={`flex flex-col gap-16 ${styleClasses.text}`}>
        <div className={`flex flex-col gap-9 ${styleClasses.text}`}>
          <div className="flex gap-2">
            <div className="flex h-[76px] w-[76px] justify-center items-center bg-white rounded-full">
              <ImgComponent
                name={"batsharelogo"}
                type={"footer-logo"}
              ></ImgComponent>
            </div>

            <span
              className={`flex items-center font-BalooDa2 ${styleClasses.text} font-bold text-[56px] tracking-[-0.05em]`}
            >
              batshare
            </span>
          </div>

          <div className={`flex gap-8 ${styleClasses.text}`}>
            <a href="https://github.com/lumitylabs/batshare" target="_blank">
              <ImgComponent
                name={"github_ic"}
                type={"icons-footer"}
              ></ImgComponent>
            </a>
            <a href="#">
              <ImgComponent
                name={"youtube_ic"}
                type={"icons-footer"}
              ></ImgComponent>
            </a>

            <a href="https://www.instagram.com/lumitylabs/" target="_blank">
              <ImgComponent
                name={"instagramw_ic"}
                type={"icons-footer"}
              ></ImgComponent>
            </a>
          </div>
        </div>
        <div className={`flex flex-col gap-5 ${styleClasses.text}`}>
          <div className={`flex gap-4 ${styleClasses.text}`}>
            <a
              className={`font-BeVietnamPro font-regular cursor-pointer ${styleClasses.link}`}
            >
              Terms & Conditions
            </a>
            <a
              className={`font-BeVietnamPro font-regular cursor-pointer ${styleClasses.link}`}
            >
              Privacy Policy
            </a>
            <a
              className={`font-BeVietnamPro font-regular cursor-pointer ${styleClasses.link}`}
            >
              Manage Cookie Settings
            </a>
          </div>
          <div
            className={`font-BeVietnamPro font-regular cursor-pointer ${styleClasses.dev}`}
          >
            © Lumity 2023
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <p
            className={`pb-3 font-BeVietnamPro font-regular ${styleClasses.text} text-[46px] tracking-[-0.05em]`}
          >
            We're here to help
          </p>
          <p
            className={`font-BeVietnamPro font-regular ${styleClasses.text} text-[24px] tracking-[-0.05em]`}
          >
            If there’s anything you need to know that’s not <br></br>
            covered on our website, then please get in <br></br> touch.
          </p>
          <div className="flex pt-4">
            <a href="mailto:contact@lumitylabs.com" target="_blank">
              <motion.button
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`flex py-4 px-12 rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] ${styleClasses.button}`}
              >
                <span
                  className={`font-BalooDa2 font-regular text-white text-[26px] leading-[26px] tracking-[-0.04em] ${styleClasses.text}`}
                >
                  Get in Touch
                </span>
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
