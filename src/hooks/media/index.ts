"use client";

import { updateGallery } from "@/actions/group";
import { UpdateGallerySchema } from "@/components/forms/media/schema";
import ToastNotify from "@/components/global/toast";
import { upload } from "@/lib/upload-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useMediaGalleryForm = ({ groupId }: { groupId: string }) => {
  const router = useRouter();
  const onUpdateGallery = async ({ content }: { content: string }) => {
    const res = await updateGallery({
      groupId,
      content,
    });

    if (res.status === 200) {
      return ToastNotify({
        title: "Success",
        msg: res.message || "Successfully updated gallery",
      });
    }
    if (res.status !== 200) {
      return ToastNotify({
        title: "Oops!",
        msg: res.message || "Something went wrong",
      });
    }
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof UpdateGallerySchema>>({
    mode: "onChange",
    resolver: zodResolver(UpdateGallerySchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-gallery"],
    mutationFn: async (values: z.infer<typeof UpdateGallerySchema>) => {
      if (values.videourl) {
        await onUpdateGallery({
          content: values.videourl,
        });
      }
      if (values.image && values.image.length) {
        let count = 0;
        while (count < values.image.length) {
          const uploaded = await upload.uploadFile(values.image[count]);
          if (uploaded) {

            await onUpdateGallery({
              content: uploaded.uuid,
            });
          }
          count++;
        }
      }
      router.refresh();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      image: data.image,
      videourl: data.videourl,
    });
  });

  return {
    onSubmit,
    errors,
    isPending,
    register,
  };
};

export { useMediaGalleryForm };
