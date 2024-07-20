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
      id="overview-tr-item"
    >
      {children}
    </div>
  );
};
const TableRowLoaderItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("overflow-hidden w-full grid grid-cols-4 gap-4", className)}
      id="overview-tr-item"
    >
      {children}
    </div>
  );
};

const TableHeaderItem = ({ children,className }: { children: React.ReactNode;className?:string; }) => {
  return (
    <div className={cn("first:pl-8 pl-6 pr-6 py-3 last:pr-8",className)} id="overview-th-item">
      {children}
    </div>
  );
};

const TableDetailLoaderItem = ({className,skeletonClassName}: {className?:string;skeletonClassName?:string;}) => {
  return (
    <div className={cn("first:pl-8 pl-6 pr-6 py-4 truncate  last:pr-8 cursor-default text-left text-base/4 font-medium tracking-[1%] ",className)} role="status">
      <span className={cn("bg-[#eee] block min-w-10 min-h-2 w-16 h-4 rounded-md animate-pulse",skeletonClassName)}>&nbsp;</span>
    </div>
  )
}

const TableDetailItem = ({
  children,
  type = "text",
  className
}: {
  children: React.ReactNode;
  type?: "action" | "text";
  className?:string;
}) => {
  return (
    <>
      {type === "text" ? (
        <div
          className={cn("first:pl-8 pl-6 pr-6 py-4 truncate  last:pr-8 cursor-default text-left text-base/4 font-medium tracking-[1%]",className)}
          id="overview-td-item"
        >
          {children}
        </div>
      ) : (
        <div
          
          className={cn(" first:pl-8 pl-6 pr-6 py-4 truncate text-primary last:pr-8 cursor-pointer text-left text-base/4 font-semibold tracking-[1%] select-none",className)}
          id="overview-td-item"
        >
          {children}
        </div>
      )}
    </>
  );
};

const OverviewTable = ({ children,className }: { children: React.ReactNode,className?:string; }) => {
  return (
    <>
      <div
        className={cn("w-full mt-4 flex flex-col items-center gap-4 justify-between",className)}
        // role="table"
      >
        {children}
      </div>
    </>
  );
};

OverviewTable.TableDetail = TableDetailItem;
OverviewTable.TableDetailLoaderItem = TableDetailLoaderItem;
OverviewTable.TableHeader = TableHeaderItem;
OverviewTable.TableRow = TableRowItem;

export default OverviewTable;
