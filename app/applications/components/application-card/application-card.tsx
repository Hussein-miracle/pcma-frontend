"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Application } from "@/lib/types";
import { format } from "date-fns";

interface ApplicationCardProps {
  application:Application;
}


const ApplicationCard = ({application}:ApplicationCardProps) => {
  const router = useRouter();

  const handleViewApplication = () => {
    if(!application?.id) return;
    router.push(`/applications/${application?.id}`);	
  };

  const applicationId = application?.id;

  return (
    <div className=" w-96 bg-white  border border-[#D4DAF0] rounded-xl p-3 flex justify-between items-center h-[5rem]">
      <div className="h-full flex gap-x-4 items-center justify-start">
        <div className=" w-[46px] h-[46px] rounded-md overflow-hidden bg-grey-10 p-1" >
          <img
            src={application?.logo_url}
            alt="application logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col h-full items-start justify-between">
          <h2 className=" text-secondary-black font-bold text-xl capitalize">{application?.name}</h2>
          <p className=" font-normal text-sm/5 text-grey-90">
            {application?.createdAt  ? format(new Date(application?.createdAt), "dd MMM yyyy") : 'N/A'}
          </p>
        </div>
      </div>

      <Link href={`/applications/${applicationId}`}>
        <div
          className="inline-flex items-center gap-2 rounded-xl bg-[#0074FF0D] py-1 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none"
          // onClick={handleViewApplication}
        >
          Open
        </div>
      </Link>
    </div>
  );
};

export default ApplicationCard;
