"use client";
import { useRouter } from "next/navigation";


const ApplicationCard = () => {
  const router = useRouter();

  const handleViewApplication = () => {
    router.push("/applications/123");
  };

  
  return (
    <div className=" w-96 bg-white  border border-[#D4DAF0] rounded-xl p-3 flex justify-between items-center h-[5rem]">
      <div className="h-full flex gap-x-4 items-center justify-start">
        <div className=" w-[46px] h-[46px] rounded-md overflow-hidden bg-grey-10" />

        <div className="flex flex-col h-full items-start justify-between">
          <h2 className=" text-secondary-black font-bold text-xl">Google</h2>
          <p className=" font-normal text-sm/5 text-grey-90">
            13th August, 2023
          </p>
        </div>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-xl bg-[#0074FF0D] py-1 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none"
        onClick={handleViewApplication}
      >
        Open
      </button>
    </div>
  );
};

export default ApplicationCard;