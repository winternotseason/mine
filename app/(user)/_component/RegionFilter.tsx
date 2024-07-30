"use client";

import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import { getRegion } from "../_lib/api-handler/Region";
import { Region } from "../_lib/type";
import { MdPlace } from "react-icons/md";
import Link from "next/link";
interface Props {
  isRegionOpen: boolean;
  setIsRegionOpen: Dispatch<SetStateAction<boolean>>;
}

const RegionFilter = ({ isRegionOpen, setIsRegionOpen }: Props) => {
  const { data, isLoading } = useQuery<Region[], Object, Region[]>({
    queryKey: ["region"],
    queryFn: getRegion,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  }); 

  return (
    <div
      className={`fixed z-50 top-0 -left-5 h-full bg-white  transition-transform duration-300 ease-in-out overflow-auto ${
        isRegionOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "100vw" }}
    >
      <div className="p-10">
        <div
          onClick={() => setIsRegionOpen(false)}
          className="mt-2 cursor-pointer w-fit"
        >
          ᐸ
        </div>
        <div className="mt-5 space-y-7">
          <p className="text-sm font-light text-center mb-7">
            올라온 리뷰들의 지역만 표시됩니다.
          </p>
          {data?.map((region: Region) => (
            <div key={region.state}>
              <h2 className="text-lg font-semibold mb-3 flex items-center text-black/70">
                {region.state}
              </h2>
              <div>
                {region.cites.map((city) => (
                  <Link
                    key={city.cityname}
                    href={`/region/${region.state} ${city.cityname}`}
                  >
                    <div className="flex space-x-1 bg-black/10 w-fit py-2 px-4 text-sm rounded-3xl items-center mb-3">
                      <div className="flex items-center space-x-1">
                        <MdPlace />
                        <p>{city.cityname}</p>
                      </div>
                      <p>{city.count}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionFilter;
