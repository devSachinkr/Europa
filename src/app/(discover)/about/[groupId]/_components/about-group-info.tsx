/* eslint-disable @next/next/no-img-element */
"use client";
import { Loader } from "@/components/global/loader";
import BlockTextEditor from "@/components/global/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useGroupAboutInfo, useGroupInfo } from "@/hooks/group";
import { JSONContent } from "novel";
import MediaGallery from "./media-gallery";
import { HtmlParser } from "@/components/global/html-parser";

type Props = {
  userId: string;
  groupId: string;
};

const AboutGroupInfo = ({ userId, groupId }: Props) => {
  const { group } = useGroupInfo();
  const {
    onDescription,
    onJsonDescription,
    activeMedia,
    onSetActiveMedia,
    setOnDescription,
    setOnJsonDescription,
    setOnHtmlDescription,
    editor,
    onEditDescription,
    isPending,
    onSubmit,
    errors,
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
        <h2 className="font-bold text-[56px] leading-none md:leading-normal">
          {group.name}
        </h2>
      </div>

      {group && group.gallery && group.gallery?.length > 0 && (
        <div className="relative rounded-xl">
          <div className="img--overlay absolute h-2/6 bottom-0 w-full z-50" />
          {activeMedia?.type === "IMAGE" ? (
            <img
              src={`https://ucarecdn.com/${activeMedia.url}/`}
              alt="Group Image"
              className="w-full aspect-video z-20  rounded-t-xl"
            />
          ) : activeMedia?.type === "LOOM" ? (
            <div className="w-full aspect-video">
              <iframe
                src={activeMedia.url}
                allowFullScreen
                className="absolute outline-none border-0 top-0 left-0 w-full h-full rounded-t-xl"
              ></iframe>
            </div>
          ) : (
            activeMedia?.type === "YOUTUBE" && (
              <div className="w-full aspect-video relative">
                <iframe
                  className="w-full absolute top-0 left-0 h-full rounded-xl"
                  src={activeMedia.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )
          )}
        </div>
      )}
      <MediaGallery
        groupId={groupId}
        onActiveMedia={onSetActiveMedia}
        userId={userId}
        groupUserId={group.userId}
        gallery={group.gallery}
      />
      {userId !== group.userId ? (
        <HtmlParser html={group.htmlDescription || "<></>"} />
      ) : (
        <form ref={editor} className="flex flex-col mt-5" onSubmit={onSubmit}>
          <BlockTextEditor
            onEdit={onEditDescription}
            max={10000}
            inline
            min={100}
            disabled={userId !== group.userId}
            name="jsondescription"
            errors={errors}
            setContent={setOnJsonDescription}
            content={onJsonDescription as JSONContent}
            htmlContent={group.htmlDescription as string | undefined}
            setHtmlContent={setOnHtmlDescription}
            textContent={onDescription}
            setTextContent={setOnDescription}
          />
          {onEditDescription && (
            <Button
              type="submit"
              className="mt-5 self-end bg-demonGreen text-white hover:bg-demonGreen/80 disabled:bg-demonGreen/40 disabled:hover:bg-demonGreen/40
                px-10  rounded-xl"
              disabled={isPending}
            >
              <Loader loading={isPending}>Update</Loader>
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default AboutGroupInfo;
