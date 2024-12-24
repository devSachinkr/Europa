import { Label } from "@/components/ui/label";
import React from "react";
import { Swiper, SwiperProps } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
interface Props extends SwiperProps {
    label?: string;
    overlay?: boolean;
    children: React.ReactNode;
}

const Slider = ({ label, overlay, children, ...rest }: Props) => {
    return (
        <div className="w-full max-w-full overflow-x-hidden mt-5 relative">
            {overlay && (
                <>
                    <div className="absolute w-[40px] slider-overlay left-0 h-full z-50  " />

                    <div className="absolute w-[40px] slider-overlay right-0 h-full z-50  " />
                </>
            )}
            {label && (
                <Label className="pl-7 mb-3 text-themeTextGray">{label}</Label>
            )}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, FreeMode]}
                {...rest}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default Slider;
