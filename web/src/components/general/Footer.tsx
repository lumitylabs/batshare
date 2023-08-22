import { motion } from "framer-motion";
import ImgComponent from "./manager/img-manager/ImgComponent";

export function Footer() {
  return (
    <div className="flex items-center justify-between bg-gradient-to-l from-[#C4A5A0] to-[#BB9EC2] w-[1350px] h-[420px] rounded-t-[60px] px-20">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-9">
          <div className="flex gap-2">
            <div className="flex h-[76px] w-[76px] justify-center items-center bg-white rounded-full">
              <ImgComponent
                name={"batsharelogo"}
                type={"footer-logo"}
              ></ImgComponent>
            </div>

            <span className="flex items-center font-BalooDa2 text-white font-bold text-[56px] tracking-[-0.05em]">
              batshare
            </span>
          </div>

          <div className="flex gap-8">
            <a href="#">
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

            <a href="#">
              <ImgComponent
                name={"instagramw_ic"}
                type={"icons-footer"}
              ></ImgComponent>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <a className="font-BeVietnamPro font-regular text-white tracking-[-0.05em] cursor-pointer hover:underline">
              Terms & Conditions
            </a>
            <a className="font-BeVietnamPro font-regular text-white tracking-[-0.05em] cursor-pointer hover:underline">
              Privacy Policy
            </a>
            <a className="font-BeVietnamPro font-regular text-white tracking-[-0.05em] cursor-pointer hover:underline">
              Manage Cookie Settings
            </a>
          </div>

          <div className="font-BeVietnamPro font-regular text-[#79687B] tracking-[-0.05em] cursor-pointer hover:underline">
            © Lumity 2023
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <p className="pb-3 font-BeVietnamPro font-regular text-white text-[46px] tracking-[-0.05em]">
            We're here to help
          </p>
          <p className="font-BeVietnamPro font-regular text-white text-[24px] tracking-[-0.05em]">
            If there’s anything you need to know that’s not <br></br>
            covered on our website, then please get in <br></br> touch.
          </p>
          <div className="flex pt-4">
            <motion.button
              whileHover={{
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex py-4 px-12 bg-[#B54A5E] rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] hover:bg-[#CC5B70]"
            >
              <span className="font-BalooDa2 font-regular  text-white text-[26px] leading-[26px] tracking-[-0.04em]">
                Get in Touch
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
