"use client";
import { useGroupAboutInfo, useGroupInfo } from "@/hooks/group";
import Image from "next/image";
import React from "react";
import MediaGallery from "./media-gallery";

type Props = {
  userId: string;
  groupId: string;
};

const AboutGroupInfo = ({ userId, groupId }: Props) => {
  const { group } = useGroupInfo();
  const {
    onDescription,
    onJsonDescription,
    onHtmlDescription,
    activeMedia,
    onSetActiveMedia,
    setOnDescription,
    setOnJsonDescription,
    setOnHtmlDescription,
    editor,
    onEditDescription,
    isPending,
    onSubmit,
  } = useGroupAboutInfo({
    groupId,
    description: group?.description as string,
    jsonDescription: group?.jsonDescription as string,
    htmlDescription: group?.htmlDescription as string,
    currentMedia: group?.gallery?.[0] as string,
  });
  if (!group)
    return (
      <div className="flex justify-center items-center w-screen">
        <div className="text-center">
          <h1 className="text-4xl text-gradient font-bold">Oops!</h1>
          <p className="text-lg">
            Looks like this group does not exist or you {"don't"} have access to
            it.
          </p>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col gap-y-10">
      <div>
        <h2 className="text-[56px] font-bold leading-none md:leading-normal">
          {group.name}
        </h2>
        <p className="text-themeTextGray leading-none md:mt-2 mt-5">
          {group.description}
        </p>
      </div>

      {group.gallery?.length ||
        (0 > 0 && (
          <div className="relative rounded-xl">
            <div className="img--overlay absolute h-2/6 bottom-0 w-full z-50" />
            {activeMedia?.type === "IMAGE" ? (
              <Image
                src={`https://ucarecdn.com/${activeMedia.url}/`}
                alt="Group Image"
                className="w-full aspect-video z-20  rounded-t-xl"
                width={350}
                height={350}
              />
            ) : activeMedia?.type === "LOOM" ? (
              <div className="w-full aspect-video">
                <iframe
                  src={activeMedia.url}
                  className="w-full absolute outline-none border-0 top-0 left-0 h-full rounded-t-xl "
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              activeMedia?.type === "YOUTUBE" && (
                <div className="w-full aspect-video">
                  <iframe
                    src={activeMedia.url}
                    className="w-full absolute outline-none border-0 top-0 left-0 h-full rounded-t-xl "
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )
            )}
          </div>
        ))}
      <MediaGallery
        groupId={groupId}
        onActiveMedia={onSetActiveMedia}
        userId={userId}
        groupUserId={group.userId}
        gallery={group.gallery}
      ></MediaGallery>
    </div>
  );
};

export default AboutGroupInfo;
