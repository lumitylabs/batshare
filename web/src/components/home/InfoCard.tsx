import ImgComponent from "../general/manager/img-manager/ImgComponent";

interface InfoCardProps {
  title: string;
  paragraph: string;
  nameImg: string;
  position: "left" | "right";
}

export function InfoCard({
  title,
  paragraph,
  nameImg,
  position,
}: InfoCardProps) {
  return (
    <div className="flex gap-20 max-w-[1400px] justify-center items-center">
      <div
        className={`flex gap-6 flex-col max-w-[900px] ${
          position === "left" ? "order-2" : "order-1"
        }`}
      >
        <h2 className="font-BeVietnamPro font-semibold text-[40px] tracking-[-0.04em]">
          {title}
        </h2>
        <p className="font-BeVietnamPro font-regular text-[24px] text-[#303336] tracking-[-0.04em]">
          {paragraph}
        </p>
      </div>
      <div className={`flex ${position === "left" ? "order-1" : "order-2"}`}>
        <ImgComponent name={nameImg} type="info-cards" />
      </div>
    </div>
  );
}
