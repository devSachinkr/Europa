"use server";

import { db } from "@/lib/prisma";
import { authUser } from "./auth";

export const getChannelInfo = async ({ channelId }: { channelId: string }) => {
    if (!channelId) return { status: 404 };
    const user = await authUser();
    try {
        const res = await db.channel.findUnique({
            where: { id: channelId },
            include: {
                posts: {
                    take: 3,
                    orderBy: {
                        createdAt: "asc",
                    },
                    include: {
                        channel: {
                            select: {
                                name: true,
                            },
                        },
                        author: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                            },
                        },
                        _count: {
                            select: {
                                likes: true,
                                comments: true,
                            },
                        },
                        likes: {
                            where: {
                                userId: user.id,
                            },
                            select: {
                                id: true,
                                userId: true,
                            },
                        },
                    },
                },
            },
        });
        if (res)
            return {
                status: 200,
                data: res,
            };
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const createChannel = async (
    groupId: string,
    data: { id: string; name: string; icon: string },
) => {
    const user = await authUser();
    if (!groupId || !user.id) return { status: 404 };
    try {
        const res = await db.group.update({
            where: { id: groupId },
            data: {
                channel: {
                    create: {
                        ...data,
                    },
                },
            },
            select: {
                channel: true,
            },
        });
        if (res) return { status: 201, data: res.channel };
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const updateChannel = async (data: {
    id: string;
    name?: string;
    icon?: string;
}) => {
    const user = await authUser();
    if (!data.id || !user.id) return { status: 404 };
    try {
        if (data.name) {
            const res = await db.channel.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                },
            });
            if (res) return { status: 202, message: "Channel name updated" };
        }

        if (data.icon) {
            const res = await db.channel.update({
                where: { id: data.id },
                data: {
                    icon: data.icon,
                },
            });
            if (res) return { status: 202, message: "Channel icon updated" };
        } else {
            const res = await db.channel.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    icon: data.icon,
                },
            });
            if (res) return { status: 202, message: "Channel updated" };
        }
        return { status: 400, message: "Something went wrong" };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "Internal Server Error" };
    }
};

export const deleteChannel = async ({ id }: { id: string }) => {
    const user = await authUser();
    if (!id || !user.id) return { status: 404 };
    try {
        const res = await db.channel.delete({
            where: { id },
        });
        if (res) return { status: 200, message: "Channel deleted" };
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};
