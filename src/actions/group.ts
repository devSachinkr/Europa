"use server";

import { GroupSchema } from "@/components/forms/group/schema";
import { db } from "@/lib/prisma";
import { z } from "zod";
import { v4 } from "uuid";
import { authUser } from "./auth";
import { lightningCssTransformStyleAttribute } from "next/dist/build/swc/generated-native";

export const getAffiliateInfo = async ({
    affiliate,
}: {
    affiliate: string;
}) => {
    if (!affiliate) return { status: 404 };
    try {
        const res = await db.affiliate.findUnique({
            where: { id: affiliate },
            select: {
                Group: {
                    select: {
                        User: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true,
                                id: true,
                                stripeId: true,
                            },
                        },
                    },
                },
            },
        });
        if (res) return { status: 200, data: res };
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const onCreateGroup = async ({
    data: { category, name },
    userID,
}: {
    userID: string;
    data: z.infer<typeof GroupSchema>;
}) => {
    try {
        if (!userID) return { status: 404 };
        const res = await db.user.update({
            where: { id: userID },
            data: {
                group: {
                    create: {
                        category,
                        name,
                        affiliate: {
                            create: {},
                        },
                        member: {
                            create: {
                                userId: userID,
                            },
                        },
                        channel: {
                            create: [
                                {
                                    id: v4(),
                                    name: "General",
                                    icon: "general",
                                },
                                {
                                    id: v4(),
                                    name: "Announcements",
                                    icon: "announcement",
                                },
                            ],
                        },
                    },
                },
            },
            select: {
                id: true,
                group: {
                    select: {
                        id: true,
                        channel: {
                            select: {
                                id: true,
                            },
                            take: 1,
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                },
            },
        });

        if (res) {
            return {
                status: 201,
                data: res,
                message: "Group created successfully",
            };
        }
        return { status: 400, data: null, message: "Failed to create group" };
    } catch (error) {
        console.log(error);
        return { status: 500, data: null, message: "Internal Server Error" };
    }
};

export const getGroupInfo = async ({ groupId }: { groupId: string }) => {
    const user = await authUser();
    if (!groupId || !user.id) return { status: 404 };
    try {
        const res = await db.group.findUnique({
            where: { id: groupId },
        });
        if (res)
            return {
                status: 200,
                data: res,
                groupOwner: res.userId === res.id,
            };
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const getUserGroups = async ({ userID }: { userID: string }) => {
    if (!userID) return { status: 404 };
    try {
        const res = await db.user.findUnique({
            where: { id: userID },
            select: {
                group: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                        channel: {
                            where: {
                                name: "General",
                            },
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                membership: {
                    select: {
                        Group: {
                            select: {
                                id: true,
                                name: true,
                                icon: true,
                                channel: {
                                    where: {
                                        name: "General",
                                    },
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if ((res && res.group.length) || res?.membership.length) {
            return {
                status: 200,
                data: {
                    groups: res.group,
                    members: res.membership,
                },
            };
        }
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const getGroupsChannels = async ({ groupId }: { groupId: string }) => {
    if (!groupId) return { status: 404 };

    try {
        const res = await db.channel.findMany({
            where: {
                groupId,
            },

            orderBy: {
                createdAt: "asc",
            },
        });

        if (res) {
            return {
                status: 200,
                data: res,
            };
        }
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const getGroupSubscription = async ({
    groupId,
}: {
    groupId: string;
}) => {
    if (!groupId) return { status: 404 };
    try {
        const res = await db.subscription.findMany({
            where: {
                groupId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const count = await db.members.count({
            where: { groupId },
        });

        if (res) {
            return { status: 200, data: res, count };
        }
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};

export const getMemberChat = async ({ groupId }: { groupId: string }) => {
    if (!groupId) return { status: 404 };
    try {
        const user = await authUser();
        const res = await db.members.findMany({
            where: {
                groupId,
                NOT: {
                    userId: user.id,
                },
            },
            include: {
                User: true,
            },
        });

        if (res && res.length) {
            return { status: 200, data: res };
        }
        return { status: 400 };
    } catch (error) {
        console.log(error);
        return { status: 500 };
    }
};
