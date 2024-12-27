"use client";
import Skeleton from "@/components/global/skeleton";
import Slider from "@/components/global/slider";
import { useExploreSlider } from "@/hooks/explore";
import { useGroupList } from "@/hooks/group";
import { SwiperSlide } from "swiper/react";
import GroupCard from "../group-card";

type Props = {
  label: string;
  text: string;
  query: string;
};

const ExploreSlider = ({ label, text, query }: Props) => {
  const { groups, status } = useGroupList({
    query,
  });
  const {
    data: fetchedData,
    isFetching,
    refetch,
    loadSlider,
  } = useExploreSlider({
    query,
    groups: groups && groups.length,
  });
  

  return (
    status === 200 &&
    groups &&
    groups.length &&
    loadSlider && (
      <div className="flex flex-col mt-16">
        <div className="flex flex-col px-[40px] lg:px-[150px]">
          <h2 className="text-2xl font-bold text-white">{label}</h2>
          <p className="text-themeTextGray text-sm">{text}</p>
        </div>
        <Slider
          freeMode
          className="flex"
          spaceBetween={50}
          autoHeight
          onReachEnd={() => refetch()}
          breakpoints={{
            200: {
              slidesPerView: 1.2,
              slidesOffsetAfter: 40,
              slidesOffsetBefore: 40,
            },
            820: {
              slidesPerView: 2.4,
              slidesOffsetAfter: 40,
              slidesOffsetBefore: 40,
            },
            1024: {
              slidesPerView: 3.2,
              slidesOffsetAfter: 150,
              slidesOffsetBefore: 150,
            },
            1280: {
              slidesPerView: 4.3,
              slidesOffsetAfter: 150,
              slidesOffsetBefore: 150,
            },
            1540: {
              slidesPerView: 5.6,
              slidesOffsetAfter: 150,
              slidesOffsetBefore: 150,
            },
          }}
        >
          {groups.map((group) => (
            <SwiperSlide key={group.id}>
              <GroupCard {...group} />
            </SwiperSlide>
          ))}
          {fetchedData?.status === 200 &&
            fetchedData.data.map((group) => (
              <SwiperSlide key={group.id}>
                <GroupCard {...group} />
              </SwiperSlide>
            ))}
          {isFetching && (
            <SwiperSlide>
              <Skeleton element="CARD" />
            </SwiperSlide>
          )}
        </Slider>
      </div>
    )
  );
};

export default ExploreSlider;
