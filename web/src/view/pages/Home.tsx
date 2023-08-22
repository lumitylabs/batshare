import { motion } from "framer-motion";
import { NavBar } from "../../components/general/navbar/NavBar";
import { InfoCard } from "../../components/home/InfoCard";
import { Footer } from "../../components/general/Footer";

function Home() {
  return (
    <div className="bg-[url('..\src\assets\background_home.webp')] bg-cover h-screen">
      <div className="flex justify-center select-none">
        <NavBar />
      </div>
      <div className="flex flex-col h-full justify-center pl-20 select-none">
        <h1 className="flex items-center gap-6">
          <span className="font-BeVietnamPro text-white text-[108px] font-regular tracking-[-0.05em]">
            Be{" "}
          </span>

          <div className="inline-flex">
            <span className="bg-white rounded-full py-4 px-12">
              <span className="font-BeVietnamPro font-regular text-[108px] leading-[108px] bg-clip-text text-transparent bg-gradient-to-l from-[#EA6846] to-[#903DA4] tracking-[-0.05em]">
                Brave
              </span>
            </span>
            <span className="font-BeVietnamPro text-white text-[108px] pt-6 leading-[108px] font-regular tracking-[-0.05em]">
              ,
            </span>
          </div>
        </h1>
        <h1 className="font-BeVietnamPro text-white text-[108px] leading-[108px] tracking-[-0.05em] ">
          Be Generous
        </h1>
        <h2 className="pt-8 font-BeVietnamProtext text-white text-[36px] font-regular tracking-[-0.05em] ">
          Donate BATs, Enhance the Community.
        </h2>

        <div className="flex space-x-4 pt-5">
          <motion.button
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-[60px] w-[250px] bg-gradient-to-l from-[#8F3CA3]/60 to-[#FEF9FF]/20 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]  hover:from-[#8F3CA3]/90 hover:to-[#FEF9FF]/70"
          >
            <span className=" text-white text-[24px] px-[60px] py-2  font-BalooDa2 font-regular tracking-[-0.05em]">
              Donate
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="h-[60px] w-[250px] bg-gradient-to-l from-[#E96745]/60 to-[#FFFFFF]/20 rounded-[12px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]  hover:from-[#E96745]/90 hover:to-[#FFFFFF]/70"
          >
            <span className=" text-white text-[24px] px-[60px] py-2 rounded-[12px] font-BalooDa2 font-regular tracking-[-0.05em]">
              New Project
            </span>
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-60 pt-32">
        <InfoCard
          title="What is Batshare?"
          paragraph="Batshare is a web3 platform that provides a more straightforward and more effective way to support public goods projects, ensuring that everyone has the opportunity to contribute and engage with the initiatives  they believe in. To make this possible, we harness the resources of the Brave browser to reinvent donations. We utilize BATs, a token received upon using the Brave ad rewards, along with an integrated wallet within the browser."
          nameImg="infocardbatshare"
          position="right"
        />

        <InfoCard
          title="How can I Join?"
          paragraph="In Batshare, you can register your public goods projects to receive support from the community or donate your BATs to the projects you wish to encourage"
          nameImg="infocardjoin"
          position="left"
        />

        <InfoCard
          title="How does it Work?"
          paragraph="On the platform, you establish direct communication with donors and the project leaders, staying informed about the progress of each initiative. Every two weeks, a cycle is completed, and the contributions are transferred to the responsible parties, who need to update their donors through the platform to ensure their project continues in the next cycle. The amounts to be received from donations are determined through a quadratic funding process."
          nameImg="infocardwork"
          position="right"
        />

        <InfoCard
          title="Be a Part!"
          paragraph="We want donors to feel like they are part of the projects and the accomplishments of a collaborative proposal. To make donations even more enjoyable, donors will receive supporter titles for each round they participate in, as well as unique NFTs for each supported project."
          nameImg="infocardpart"
          position="left"
        />
      </div>
      <div className="flex justify-center mt-52 select-none">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
