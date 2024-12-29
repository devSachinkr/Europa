"use server";

import { db } from "@/lib/prisma";

export const getGroupCourses = async ({ groupId }: { groupId: string }) => {
  if (!groupId) return { status: 404 };
  try {
    const res = await db.course.findMany({
      where: { groupId },
      take: 8,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (res && res.length)
      return { status: 200, data: res, message: "Courses found" };
    return { status: 404, message: "Courses not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
