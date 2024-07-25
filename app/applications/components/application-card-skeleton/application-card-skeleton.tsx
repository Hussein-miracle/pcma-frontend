import React from "react";

const ApplicationCardSkeleton = () => {
  return (
    <div className=" w-96 bg-white  border border-[#D4DAF0] rounded-xl p-3 flex justify-between items-center h-[5rem]">
      <div className="h-full flex gap-x-4 items-center justify-start">
        <div className=" w-[46px] h-[46px] rounded-md overflow-hidden cursor-wait animate-pulse bg-[#eee]" />

        <div className="flex flex-col h-full items-start justify-between">
          <h2 className="w-20 h-6 text-secondary-black font-bold text-xl cursor-wait animate-pulse bg-[#eee] rounded-lg">&nbsp;</h2>

          <p className="w-24 h-4 flex items-center gap-2 rounded-lg  font-normal cursor-wait animate-pulse bg-[#eee]">
            &nbsp;
          </p>
        </div>
      </div>

      <div className="w-12 h-6 flex items-center gap-2 rounded-lg py-1 px-3 text-sm/6 font-semibold cursor-wait animate-pulse bg-[#eee]">
        &nbsp;
      </div>
    </div>
  );
};

export default ApplicationCardSkeleton;
