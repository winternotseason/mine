"use client";
import { address, useAddressStore, useModalStore } from "@/lib/store/mapStore";
import useKakaoLoader from "../../../_component/use-kakao-loader";
import React, { useState } from "react";
import { Map } from "react-kakao-maps-sdk";

interface Market {
  id: string;
  category_group_name: string;
  phone: string;
  place_name: string;
  road_address_name: string;
  category_name: string;
  x: string;
  y: string;
}

const MapSearchModal = () => {
  useKakaoLoader();
  const { closeModal } = useModalStore();
  const { setAddress } = useAddressStore();
  const [market, setMarket] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const handleClick = () => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(market, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const restaurant = data.filter((item) =>
          item.category_name.startsWith("음식점")
        );
        //  console.log(restaurant)
        setSearchResult(restaurant);
      }
    });
  };
  const handleMarketClick = (market: Market) => {
    const {
      road_address_name: address_name,
      phone,
      x: location_x,
      y: location_y,
      place_name,
      category_name,
    } = market;
    const category = category_name.split(" > ")[1];
    setAddress({
      address_name,
      phone,
      location_x,
      location_y,
      place_name,
      category,
    });
    closeModal();
  };

  return (
    <>
      <div className="bg-black/30 absolute w-dvw h-dvh top-0 left-0 z-20" />
      <div className="absolute w-1/2 min-w-[25rem] max-w-[40rem] h-[35rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30">
        <div className="p-10 flex flex-col justify-center h-full">
          <div className="flex ">
            <input
              className="border-[1px] p-3 flex-1 outline-none"
              placeholder="상호명을 입력해주세요"
              value={market}
              onChange={(e) => {
                setMarket(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <div
              className="p-2 bg-black text-white px-5 ml-2 flex items-center"
              onClick={handleClick}
            >
              검색
            </div>
          </div>
          <div className="mt-2 flex-1 overflow-y-auto">
            {searchResult.map((market: Market) => (
              <div
                key={market.id}
                className="mt-4"
                onClick={() => handleMarketClick(market)}
              >
                <div className="flex items-center">
                  <p className="text-sm">{market.place_name}</p>
                  <p className="ml-1 text-xs text-black/50">
                    {market.category_group_name}
                  </p>
                </div>
                <p className="text-black/50 text-sm">
                  {market.road_address_name}
                </p>
              </div>
            ))}
          </div>
          <div onClick={closeModal}>모달 닫기</div>
        </div>
      </div>
    </>
  );
};

export default MapSearchModal;
