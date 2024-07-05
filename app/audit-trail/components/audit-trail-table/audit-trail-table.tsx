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

const AuditTrailTable = ({
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

AuditTrailTable.TableDetail = TableDetailItem;
AuditTrailTable.TableHeader = TableHeaderItem;
AuditTrailTable.TableRow = TableRowItem;

export default AuditTrailTable;
