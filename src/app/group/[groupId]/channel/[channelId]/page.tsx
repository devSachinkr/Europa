import React from "react";

type Props = Promise<{
    params: {
        groupId: string;
        channelId: string;
    };
}>;

const page = async (props: Props) => {
    const {
        params: { channelId, groupId },
    } = await props;
    return <div>{channelId}</div>;
};

export default page;
