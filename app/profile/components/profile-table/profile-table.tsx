"use client";
import { cn } from "@/lib/utils";

const TableRowItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("overflow-hidden w-full grid grid-cols-4 gap-4", className)}
      id="profile-tr-item"
    >
      {children}
    </div>
  );
};

const TableHeaderItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("first:pl-6 pl-4 pr-4 py-3 last:pr-6", className)}
      id="profile-th-item"
    >
      {children}
    </div>
  );
};
const TableDetailItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "first:pl-6 pl-4 pr-4 py-3 truncate  last:pr-6 cursor-default text-left text-base/4 font-medium tracking-[1%]",
          className
        )}
        id="profile-td-item"
      >
        {children}
      </div>
    </>
  );
};

const TableDetailLoaderItem = ({className,skeletonClassName}: {className?:string;skeletonClassName?:string;}) => {
  return (
    <div         className={cn(
      "first:pl-6 pl-4 pr-4 py-3 truncate  last:pr-6 cursor-default text-left text-base/4 font-medium tracking-[1%]",
      className
    )} role="status">
      <span className={cn("bg-[#eee] block min-w-10 min-h-2 w-16 h-4 rounded-md animate-pulse",skeletonClassName)}>&nbsp;</span>
    </div>
  )
}


const ProfileTable = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "w-full mt-4 flex flex-col items-center gap-4 justify-between",
          className
        )}
        // role="table"
      >
        {children}
      </div>
    </>
  );
};

ProfileTable.TableDetail = TableDetailItem;
ProfileTable.TableHeader = TableHeaderItem;
ProfileTable.TableRow = TableRowItem;
ProfileTable.TableDetailLoaderItem = TableDetailLoaderItem;

export default ProfileTable;
