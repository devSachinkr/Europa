"use server";

import { GroupSchema } from "@/components/forms/group/schema";
import { db } from "@/lib/prisma";
import { z } from "zod";
import { v4 } from "uuid";
import { authUser } from "./auth";
import { revalidatePath } from "next/cache";
import { UPDATE_ATTRIBUTES_TYPE } from "@/hooks/group";

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
            icon: "general",
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
  if (!groupId ) return { status: 404 };
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

export const searchGroups = async ({
  query,
  searchType,
  paginate,
}: {
  query: string;
  searchType: "POSTS" | "GROUPS";
  paginate?: number;
}) => {
  try {
    switch (searchType) {
      case "POSTS": {
        // FOR FUTURE UPDATES
        return { status: 200, data: [] };
      }
      case "GROUPS": {
        const res = await db.group.findMany({
          where: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          take: 6,
          skip: paginate || 0,
        });

        if (res) {
          if (res.length) {
            return {
              status: 200,
              data: res,
            };
          }
          return { status: 404, message: "Category not found", data: [] };
        }
        return { status: 400 };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const updateGroupInfo = async ({
  content,
  groupId,
  path,
  type,
}: {
  groupId: string;
  type: UPDATE_ATTRIBUTES_TYPE;
  content: string;
  path: string;
}) => {
  if (!groupId) return { status: 404, message: "Group ID Missing" };

  try {
    switch (type) {
      case "IMAGE": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            thumbnail: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
      case "ICON": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            icon: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
      case "NAME": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            name: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
      case "DESCRIPTION": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            description: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
      case "JSONDESCRIPTION": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            jsonDescription: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
      case "HTMLDESCRIPTION": {
        const res = await db.group.update({
          where: {
            id: groupId,
          },
          data: {
            htmlDescription: content,
          },
        });
        if (res) {
          revalidatePath(path);
          return { status: 204, message: "Groups Changes Reflected" };
        }
        revalidatePath(path);
        return { status: 400, message: "Something went wrong!" };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getExploreGroups = async ({
  type,
  page,
}: {
  type: string;
  page: number;
}) => {
  if (!type.length)
    return { status: 404, message: "Category not found", data: [] };
  try {
    const res = await db.group.findMany({
      where: {
        category: type,
        NOT: {
          description: null,
          thumbnail: null,
        },
      },
      take: 6,
      skip: page,
    });
    if (res && res.length) {
      return {
        status: 200,
        data: res,
      };
    }
    return { status: 404, message: "Category not found", data: [] };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error", data: [] };
  }
};

export const getPaginatedPosts = async ({
  indentifier,
  paginate,
}: {
  indentifier: string;
  paginate: number;
}) => {
  try {
    const user = await authUser();
    if (!user.id) return { status: 404, message: "User not found", data: [] };
    const res = await db.post.findMany({
      where: {
        channelId: indentifier,
      },
      take: 2,
      skip: paginate,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        channel: {
          select: {
            name: true,
          },
        },
        author: {
          select: { image: true, firstName: true, lastName: true },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        likes: {
          where: {
            userId: user.id,
          },
          select: {
            userId: true,
            id: true,
          },
        },
      },
    });
    if (res && res.length) {
      return {
        status: 200,
        data: res,
      };
    }
    return { status: 404, message: "Category not found", data: [] };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error", data: [] };
  }
};

export const updateGallery = async ({
  groupId,
  content,
}: {
  groupId: string;
  content: string;
}) => {
  if (!groupId) return { status: 404, message: "Group ID Missing" };
  try {
    const mediaLimit = await db.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        gallery: true,
      },
    });
    if (mediaLimit && mediaLimit.gallery.length < 6) {
      await db.group.update({
        where: {
          id: groupId,
        },
        data: {
          gallery: [...mediaLimit.gallery, content],
        },
      });
      return { status: 200, message: "Gallery Updated" };
    }
    revalidatePath(`/groups/${groupId}`);
    return { status: 400, message: "Gallery Limit Reached" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const joinGroup = async ({ groupId }: { groupId: string }) => {
  try {
    const user = await authUser();
    if (!groupId || !user.id) return { status: 404 };

    const res = await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        member: {
          create: {
            userId: user.id,
          },
        },
      },
    });
    if (res) {
      return { status: 200, message: "Group Joined Successfully" };
    }
    return { status: 400, message: "Group Joined Failed" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};  
