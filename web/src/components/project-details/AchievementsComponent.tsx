import ImgComponent from "../general/manager/img-manager/ImgComponent";
import { motion } from "framer-motion";
import DonateModal from "./DonateModal";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { formatBalance } from "../../model/utils";

export function AchievementsComponent(props: {
  dailyRaised: any;
  nft_image: string;
  donations: any;
  totalRaised: any;
  title: string;
  category: string;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [raised, setRaised] = useState(-1);

  useEffect(() => {
    if (props.dailyRaised.amount > 0) {
      setRaised(
        (props.dailyRaised.projectQuadratic / props.dailyRaised.amount) *
          props.dailyRaised.bat_value
      );
    } else {
      setRaised(0);
    }
  }, [props.dailyRaised]);

  return (
    <>
      <DonateModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        title={props.title}
        category={props.category}
      ></DonateModal>

      <div className="flex flex-col border w-full h-[310px] border-gray-300 px-10 py-5 rounded-[12px]">
        <div className="flex justify-between">
          <span className="font-BeVietnamPro font-bold text-[26px] tracking-[-0.05em]">
            Achievements
          </span>

          <div className="flex items-center gap-1">
            <ImgComponent
              name={"heart_ic"}
              type={"icon-buttons"}
            ></ImgComponent>
            <span className="font-BeVietnamPro font-bold text-[18px] tracking-[-0.05em]">
              {props.donations}
            </span>
          </div>
        </div>
        <div className="flex justify-center mb-4 items-center w-[150px] p-1 rounded-full bg-[#D2FFC8]">
          <span className="font-BeVietnamPro font-regular text-[15px] tracking-[-0.05em] text-[#115900]">
            <span className="font-BeVietnamPro font-bold text-[15px] tracking-[-0.05em]">
              12
            </span>{" "}
            days remaining
          </span>
        </div>

        {/*Parte 1 Imagem*/}
        <div className="flex">
          <div className="flex flex-row">
            <motion.div
              initial={{
                scale: 1,
                translateY: 0,
              }}
              animate={{
                translateY: [0, -4, 0, -4, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className=""
            >
              <div className="relative w-[170px] h-[170px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C98AFF] via-[rgb(212,242,255)] to-[#71BDFF] shadow-2xl rounded-[12px]"></div>
                <div className="flex justify-center items-center w-[170px] h-[170px] rounded-[12px]">
                  {/* Ajuste o tamanho e o posicionamento da imagem */}
                  {props.nft_image === "" ? (
                    <Skeleton
                      baseColor={"#fff"}
                      height={160}
                      width={160}
                      borderRadius={12}
                      style={{ zIndex: 10, position: "relative" }}
                    ></Skeleton>
                  ) : (
                    <img
                      src={props.nft_image}
                      className="w-[160px] h-[160px] rounded-[12px] object-cover"
                      style={{ zIndex: 11, position: "relative" }}
                    ></img>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/*Parte 2 values*/}
          <div className="flex flex-col justify-center flex-grow ml-3">
            <div className="flex justify-center gap-3">
              <div className="flex flex-col w-[48%]">
                <div className="flex flex-start">
                  <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                    Raised Today
                  </span>
                </div>

                <div className="flex items-center justify-start border-2 bg-[#FCFCFF] border-[#C98AFF] rounded-[8px]">
                  <div className="flex px-2 items-center justify-center">
                    <ImgComponent
                      name={"batlogo"}
                      type={"icons-button"}
                    ></ImgComponent>
                  </div>

                  <div className="border w-px h-[40px] border-[#C98AFF]"></div>

                  <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                    {raised === -1 ? (
                      <Skeleton width={60} height={22}></Skeleton>
                    ) : (
                      parseFloat(formatBalance(raised.toString())).toFixed(2)
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-col w-[48%]">
                <div className="flex flex-start">
                  <span className="font-BeVietnamPro font-medium text-[#828282] text-[15px] tracking-[-0.04em]">
                    Total
                  </span>
                </div>

                <div className="flex items-center justify-start border-2 bg-[#e3eeff] border-[#8bbaff] rounded-[8px]  ">
                  <div className="flex px-2 items-center justify-center">
                    <ImgComponent
                      name={"batlogo"}
                      type={"icons-button"}
                    ></ImgComponent>
                  </div>

                  <div className="border w-px h-[40px] border-[#8bbaff]"></div>

                  <span className="ml-1 font-BeVietnamPro text-black font-bold text-[20px] tracking-[-0.05em]">
                  { props.totalRaised === -1 ? (
                      <Skeleton width={60} height={22}></Skeleton>
                    ) : (
                      parseFloat(formatBalance(props.totalRaised.toString())).toFixed(2)
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center mt-[26px]">
                <motion.button
                  onClick={() => setModalIsOpen(true)}
                  whileHover={{
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex w-[310px] py-[10px] px-4 items-center  justify-center rounded-[10px] bg-gradient-to-r shadow-xl from-[#C98AFF] to-[#71BDFF]  hover:from-[#71BDFF] hover:to-[#C98AFF] hover:shadow-lg "
                >
                  <span className="font-BalooDa2 font-medium text-[20px] text-white">
                    Donate
                  </span>
                </motion.button>
              </div>
              <div className="flex mt-1 justify-center">
                <p className="font-thin italic">
                  Donate and unlock this <span className="font-bold">NFT</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
