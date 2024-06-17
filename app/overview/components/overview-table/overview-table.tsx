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

const TableHeaderItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="first:pl-8 pl-6 pr-6 py-3 last:pr-8" id="overview-th-item">
      {children}
    </div>
  );
};
const TableDetailItem = ({
  children,
  type = "text",
}: {
  children: React.ReactNode;
  type?: "action" | "text";
}) => {
  return (
    <>
      {type === "text" ? (
        <div
          className="first:pl-8 pl-6 pr-6 py-4 truncate  last:pr-8 cursor-default text-left text-base/4 font-medium tracking-[1%] "
          id="overview-td-item"
        >
          {children}
        </div>
      ) : (
        <div
          // role="button"
          className=" first:pl-8 pl-6 pr-6 py-4 truncate text-primary last:pr-8 cursor-pointer text-left text-base/4 font-semibold tracking-[1%] select-none"
          id="overview-td-item"
        >
          {children}
        </div>
      )}
    </>
  );
};

const OverviewTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className="w-full mt-4 flex flex-col items-center gap-4 justify-between"
        // role="table"
      >
        {children}
      </div>
    </>
  );
};

OverviewTable.TableDetail = TableDetailItem;
OverviewTable.TableHeader = TableHeaderItem;
OverviewTable.TableRow = TableRowItem;

export default OverviewTable;
