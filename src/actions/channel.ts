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

export const createPost = async (data: {
  channelId: string;
  title: string;
  content: string;
  htmlcontent: string;
  jsoncontent: string;
  postId: string;
}) => {
  const user = await authUser();
  if (!data.channelId || !user.id)
    return { status: 404, message: "Channel ID or User not found" };
  try {
    const res = await db.post.create({
      data: {
        content: data.content,
        htmlContent: data.htmlcontent,
        jsonContent: data.jsoncontent,
        id: data.postId,
        authorId: user.id!,
        title: data.title,
        channelId: data.channelId,
      },
    });
    if (res) return { status: 201, message: "Post created" };
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const likePost = async ({
  postId,
  likeId,
}: {
  postId: string;
  likeId: string;
}) => {
  const user = await authUser();
  if (!user.id) return { status: 404, message: "User not found" };
  try {
    const alreadyLiked = await db.like.findFirst({
      where: { userId: user.id, id: likeId },
    });

    if (alreadyLiked) {
      await db.like.delete({
        where: { id: likeId, userId: user.id },
      });
      return { status: 200, message: "You have unliked this post" };
    }
    const res = await db.like.create({
      data: {
        id: likeId,
        userId: user.id,
        postId: postId,
      },
    });
    if (res) return { status: 201, message: "You have liked this post" };
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const createComment = async ({
  postId,
  content,
  commentId,
}: {
  postId: string;
  content: string;
  commentId: string;
}) => {
  const user = await authUser();
  if (!user.id) return { status: 404, message: "User not found" };
  try {
    const res = await db.post.update({
      where: { id: postId },
      data: {
        comments: {
          create: {
            id: commentId,
            content,
            userId: user.id,
          },
        },
      },
    });
    if (res) return { status: 200, message: "Comment created" };
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const createCommentReply = async ({
  postId,
  commentId,
  content,
  replyId,
}: {
  postId: string;
  commentId: string;
  content: string;
  replyId: string;
}) => {
  try {
    const user = await authUser();
    if (!user.id) return { status: 404, message: "User not found" };
    const res = await db.comment.update({
      where: { id: commentId },
      data: {
        reply: {
          create: {
            id: replyId,
            content,
            userId: user.id,
            replied: true,
            postId,
          },
        },
      },
    });
    if (res) return { status: 200, message: "Reply created" };
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
