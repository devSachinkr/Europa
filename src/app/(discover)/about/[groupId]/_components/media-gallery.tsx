import MediaGalleryForm from "@/components/forms/media";
import GlassModal from "@/components/global/glass-modal";
import { Card, CardContent } from "@/components/ui/card";
import { BadgePlus } from "@/icons";
import { validateURLString } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  groupId: string;
  onActiveMedia: (media: { url: string | undefined; type: string }) => void;
  userId: string;
  groupUserId: string;
  gallery: string[] | undefined;
};

const MediaGallery = ({
  groupId,
  onActiveMedia,
  userId,
  groupUserId,
  gallery,
}: Props) => {
  return (
    <div className="flex justify-start gap-3 flex-wrap">
      {gallery &&
        gallery.length > 0 && 
        gallery?.map((media, index) =>
          validateURLString(media).type === "IMAGE" ? (
            <Image
              onClick={() =>
                onActiveMedia({
                  url: media,
                  type: "IMAGE",
                })
              }
              key={index}
              src={`https://ucarecdn.com/${media}/`}
              alt="Group Image"
              className="w-36 aspect-video   rounded-xl cursor-pointer opacity-70"
              width={150}
              height={150}
            />
          ) : validateURLString(media).type === "LOOM" ? (
            <div className="w-36 aspect-video relative cursor-pointer opacity-70">
              <div
                className="w-full h-full absolute z-50"
                onClick={() =>
                  onActiveMedia({
                    url: media,
                    type: "LOOM",
                  })
                }
              ></div>
              <iframe
                src={media}
                className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-xl"
              ></iframe>
            </div>
          ) : (
            <div className="w-full absolute top-0 left-0 h-full rounded-xl">
              <div
                className="w-full h-full absolute z-50"
                onClick={() =>
                  onActiveMedia({
                    url: media,
                    type: "YOUTUBE",
                  })
                }
              ></div>
              <iframe
                src={media}
                className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
                allowFullScreen
              ></iframe>
            </div>
          ),
        )}
      {userId === groupUserId ? (
        <GlassModal
          title="Add Media to VSL"
          description="Paste the link of the media you want to add to the gallery| Youtube, Loom, Image"
          trigger={
            <Card className="border-dashed border-[1px] border-demonGreen hover:bg-themeBlack bg-transparent cursor-pointer">
              <CardContent className="flex justify-center items-center py-10 px-16">
                <BadgePlus  />
              </CardContent>
            </Card>
          }
        >
          <MediaGalleryForm groupId={groupId} />
        </GlassModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MediaGallery;
