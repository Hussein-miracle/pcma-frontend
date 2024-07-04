"use client";
import React from "react";
import Header from "@/components/header/header";
import {
  CheckSquareBrokenIcon,
  EmptyItemsIcon,
  InformationCircleContainedIcon,
} from "@/components/icons";
import Spacer from "@/components/spacer/spacer";
import { overviewActivities } from "@/data";
import OverviewTable from "./components/overview-table/overview-table";
import OverviewSummaryCard from "./components/overview-summary-card/overview-summary-card";
import OverviewItem from "./components/overview-item/overview-item";
import { OverviewActivity } from "@/lib/types";


const Overview = () => {
  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header type="authed" />
      <main className="w-full mx-auto  px-6 py-4 md:pt-[4rem] md:px-[7.5rem]">
        <div className="w-full bg-white border-2 border-[#0074FF1A] border-solid rounded-3xl grid grid-cols-1 md:grid-cols-4  gap-6 p-4 md:h-44">
          <OverviewSummaryCard
            title="Approved&nbsp;Requests"
            value={12}
            icon={<CheckSquareBrokenIcon stroke="#01F971" />}
          />
          <OverviewSummaryCard
            title="Pending&nbsp;requests"
            value={3}
            icon={<CheckSquareBrokenIcon stroke="#F9B401" />}
          />
          <OverviewSummaryCard
            title="Rejected&nbsp;requests"
            value={1}
            icon={<CheckSquareBrokenIcon stroke="#F90101" />}
          />
          <OverviewSummaryCard
            title="Data&nbsp;Leaks"
            value={0}
            icon={<InformationCircleContainedIcon />}
          />
        </div>

        <Spacer size={32} />

        <section className="w-full h-fit  md:h-[25rem] grid grid-cols-1 md:grid-cols-[2fr_1fr]  md:grid-rows-1 gap-8">
          <div className="w-full hidden md:block h-fit md:h-full bg-white border-[#0074FF1A] border-2 border-solid p-6  rounded-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-secondary-black text-base/4 font-semibold  tracking-[1%]">
                Recents Activities
              </h2>
              <button className=" text-primary  text-base/4 font-semibold  tracking-[1%] outline-none border-none focus:outline-none">
                View All Activities
              </button>
            </div>

            <OverviewTable>
              <OverviewTable.TableRow className="w-full rounded-xl border-[#0074FF1A] border-2">
                <OverviewTable.TableHeader>
                  <span>Name</span>
                </OverviewTable.TableHeader>
                <OverviewTable.TableHeader>
                  <span>Date</span>
                </OverviewTable.TableHeader>
                <OverviewTable.TableHeader>
                  <span>Activity</span>
                </OverviewTable.TableHeader>
                <OverviewTable.TableHeader>
                  <span>Action</span>
                </OverviewTable.TableHeader>
              </OverviewTable.TableRow>

              <div className="w-full">
                {overviewActivities.map((overviewItem:OverviewActivity, index:number) => {
                  return (
                    <OverviewTable.TableRow
                      key={index}
                      className="border-b-2 border-b-[#0074FF0D] w-full"
                    >
                      <OverviewTable.TableDetail>{overviewItem.name}</OverviewTable.TableDetail>
                      <OverviewTable.TableDetail>{overviewItem.date}</OverviewTable.TableDetail>
                      <OverviewTable.TableDetail>{overviewItem.activity}</OverviewTable.TableDetail>
                      <OverviewTable.TableDetail type="action">
                        <span className="!text-primary">View</span>
                      </OverviewTable.TableDetail>
                    </OverviewTable.TableRow>
                  );
                })}
              </div>
            </OverviewTable>
          </div>

          <section className=" md:hidden block w-full">
          <div className="flex items-center justify-between">
              <h2 className="text-secondary-black text-base/4 font-semibold  tracking-[1%]">
                Recents Activities
              </h2>
              <button className=" text-primary  text-base/4 font-semibold  tracking-[1%] outline-none border-none focus:outline-none">
                View All Activities
              </button>
            </div>

            <Spacer size={32} />

            <div className="flex flex-col items-center gap-4 w-full h-96 overflow-auto">
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
              <OverviewItem/>
            </div>
          </section>

          <main className="w-full h-fit md:h-full bg-white border-[#0074FF1A] border-2 border-solid p-6  rounded-3xl">
            <h2 className="capitalize text-base/4 font-semibold tracking-[1%] text-secondary-black">
              Review&nbsp;Requests
            </h2>

            <div className="w-full flex items-center flex-col gap-2">
              <EmptyItemsIcon />
              <p className=" text-xl/[30px] text-center font-extrabold tracking-[1%] text-secondary-black max-w-xs">
                You have no Request at the moment
              </p>
            </div>
          </main>
        </section>
      </main>
    </section>
  );
};

export default Overview;
