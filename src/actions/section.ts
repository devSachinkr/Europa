"use server";

import { db } from "@/lib/prisma";

export const getSectionInfo = async ({ sectionId }: { sectionId: string }) => {
  try {
    const res = await db.section.findUnique({
      where: {
        id: sectionId,
      },
    });
    if (res) {
      return { status: 200, data: res };
    }
    return { status: 404, message: "Not Found" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
