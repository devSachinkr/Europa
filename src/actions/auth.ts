"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const authUser = async () => {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: 401,
      };
    let userData = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstName: true,
        id: true,
        lastName: true,
      },
    });
    if (!userData) {
      const res = await signUpUser({
        firstName: user.firstName!,
        lastName: user.lastName!,
        clerkId: user.id,
        image: user.imageUrl,
      });
      if (res.status === 201) {
         userData = await db.user.findUnique({
          where: {
            clerkId: user.id,
          },
          select: {
            firstName: true,
            id: true,
            lastName: true,
          },
        });
      }
    }

    return {
      status: 200,
      id: userData?.id,
      image: user.imageUrl,
      username: `${userData?.firstName} ${userData?.lastName}`,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
};

export const signUpUser = async (data: {
  firstName: string;
  lastName: string;
  clerkId: string;
  image: string;
}) => {
  try {
    const res = await db.user.create({
      data: { ...data },
    });
    if (res) {
      return {
        status: 201,
        message: "User created successfully",
        id: res.id,
      };
    }
    return {
      status: 400,
      message: "Something went wrong",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

export const signInUser = async ({ clerkId }: { clerkId: string }) => {
  if (!clerkId) return { status: 400 };
  try {
    const res = await db.user.findUnique({
      where: { clerkId },
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
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });
    if (res) {
      if (res.group.length) {
        return {
          status: 207,
          groupId: res.group[0].id,
          channelId: res.group[0].channel[0].id,
          id: res.id,
        };
      }
      return {
        status: 200,
        channelId: null,
        message: "User signed in successfully",
        id: res.id,
      };
    }
    return { status: 404, message: "User could not be found or signed in" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
};
