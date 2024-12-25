import React from "react";
import Dropdown from "../drop-down";
import { IconRenderer } from "../icon-renderer";

type Props = {
    ref: React.RefObject<HTMLButtonElement>;
    page?: string;
    onSetIcon:({icon}:{icon: string})=> void;
    channelId: string;
    icon: string;
    currentIcon?: string;
};

const IconDropdown = ({
    channelId,
    icon,
    page,
    ref,
}: Props) => {
    return (
        <Dropdown
            trigger={
                <span>
                    <IconRenderer
                        icon={icon}
                        mode={page === channelId ? "LIGHT" : "DARK"}
                    />
                </span>
            }
            ref={ref}
            title="Pick Icon"
        ><></></Dropdown>
    );
};

export default IconDropdown;
