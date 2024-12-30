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

export const createCourse = async ({
  name,
  id,
  image,
  description,
  privacy,
  published,
  groupId,
}: {
  name: string;
  id: string;
  image: string;
  description: string;
  privacy: string;
  published: boolean;
  groupId: string;
}) => {
  if (!groupId) return { status: 404 };
  try {
    const res = await db.group.update({
      where: { id: groupId },
      data: {
        courses: {
          create: {
            name,
            id,
            thumbnail: image,
            description,
            privacy,
            published,
          },
        },
      },
    });
    if (res) {
      return { status: 200, message: "Course created successfully" };
    }
    return { status: 404, message: "Course not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const getCourseModules = async ({ courseId }: { courseId: string }) => {
  if (!courseId) return { status: 404 };
  try {
    const res = await db.module.findMany({
      where: { courseId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        section: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (res && res.length) {
      return { status: 200, data: res, message: "Modules found" };
    }
    return { status: 404, message: "Modules not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const updateCourseModule = async ({
  action,
  content,
  moduleId,
}: {
  action: "NAME" | "DATA";
  content: string;
  moduleId: string;
}) => {
  if (!moduleId) return { status: 404, message: "Module ID Missing" };
  try {
    switch (action) {
      case "NAME": {
        const res = await db.module.update({
          where: {
            id: moduleId,
          },
          data: {
            title: content,
          },
        });
        if (res) {
          return { status: 200, message: "Module Updated" };
        }
        return { status: 400, message: "Something went wrong!" };
      }
      case "DATA": {
        // FOR FUTURE UPDATES
        return { status: 200, message: "Module Updated" };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const updateCourseSection = async ({
  action,
  content,
  activeSection,
}: {
  action: "NAME" | "COMPLETE";
  content: string;
  activeSection: string;
}) => {
  if (!activeSection) return { status: 404, message: "Section ID Missing" };
  try {
    switch (action) {
      case "NAME": {
        const res = await db.section.update({
          where: {
            id: activeSection,
          },
          data: {
            name: content,
          },
        });
        if (res) {
          return { status: 200, message: "Section Updated" };
        }
        return { status: 400, message: "Something went wrong!" };
      }
      case "COMPLETE": {
        const res = await db.section.update({
          where: {
            id: activeSection,
          },
          data: {
            complete: true,
          },
        });
        if (res) {
          return { status: 200, message: "Section Updated" };
        }
        return { status: 400, message: "Something went wrong!" };
      }
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const createModuleSection = async ({
  moduleId,
  sectionId,
}: {
  moduleId: string;
  sectionId: string;
}) => {
  if (!moduleId || !sectionId) return { status: 404 };
  try {
    const res = await db.module.update({
      where: {
        id: moduleId,
      },
      data: {
        section: {
          create: {
            id: sectionId,
          },
        },
      },
    });
    if (res) {
      return { status: 200, message: "Section Created" };
    }

    return { status: 400, message: "Section Creation Failed" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};
