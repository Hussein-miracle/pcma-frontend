interface OverviewSummaryCardProps {
  title: string;
  value?: number;
  icon?: React.ReactNode;
}

const OverviewSummaryCard = ({
  title,
  value = 0,
  icon,
}: OverviewSummaryCardProps) => {
  return (
    <div className="w-full rounded-xl pt-3 px-3 pb-6 bg-white border-[#0074FF0D] border-2 border-solid h-full flex flex-col gap-2 items-center justify-between ">
      <div className="w-full self-start flex items-center gap-2">
        {icon}
        <span className=" capitalize text-base/6 font-normal tracking-[1%] text-secondary-black">
          {title}
        </span>
      </div>

      <div className="text-center">
        <h1 className="text-center font-extrabold text-secondary-black text-[32px]/[32px]">
          {value}
        </h1>
      </div>
    </div>
  );
};

export default OverviewSummaryCard;