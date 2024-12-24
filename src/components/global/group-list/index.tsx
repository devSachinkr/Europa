import { UseFormRegister } from "react-hook-form";
import { SwiperProps, SwiperSlide } from "swiper/react";
import Slider from "../slider";
import { EUROPA_CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GroupListItem from "./group-list-Item";
import "swiper/css/bundle";
interface Props extends SwiperProps {
    selected?: string;
    overlay?: boolean;
    register?: UseFormRegister<any>;
    label?: string;
    route?: boolean;
}

export const GroupList = ({
    overlay,
    selected,
    register,
    label,
    route,
    ...rest
}: Props) => {
    return (
        <Slider
            slidesPerView={"auto"}
            spaceBetween={10}
            loop
            freeMode
            label={label}
            overlay={overlay}
            {...rest}
        >
            {EUROPA_CONSTANTS.groupList.map((item, idx) => (
                <SwiperSlide className="content-width-slide" key={idx}>
                    {!register ? (
                        route ? (
                            <Link href={`/explore/${item.path.toLowerCase()}`}>
                                <GroupListItem {...item} selected={selected} />
                            </Link>
                        ) : (
                            <GroupListItem {...item} />
                        )
                    ) : (
                        idx > 0 && (
                            <Label htmlFor={`item-${item.id}`}>
                                <span>
                                    <Input
                                        id={`item-${item.id}`}
                                        type="radio"
                                        className="hidden"
                                        value={item.path.toLowerCase()}
                                        {...register("category")}
                                    />
                                    <GroupListItem
                                        {...item}
                                        selected={selected}
                                    />
                                </span>
                            </Label>
                        )
                    )}
                </SwiperSlide>
            ))}
        </Slider>
    );
};
