"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useCourse = ({ groupId }: { groupId: string }) => {
  const [privacy, setPrivacy] = useState<string>("open");
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      privacy: "open",
      published: false,
    },
  });
  return {};
};
