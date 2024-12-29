"use client";
import BlockTextEditor from "@/components/global/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateChannelPost } from "@/hooks/channel";

import { Loader } from "../loader";

type PostContentProps = {
  channelId: string;
};

export const PostContent = ({ channelId }: PostContentProps) => {
  const {
    errors,
    register,
    onDescription,
    onJsonDescription,
    onHtmlDescription,
    setOnDescription,
    setOnHtmlDescription,
    setOnJsonDescription,
    onSubmit,
    isPending,
  } = useCreateChannelPost({ channelId });

  return (
    <form className="flex flex-col gap-y-5 w-full" onSubmit={onSubmit}>
      <Input
        placeholder="Title"
        className="bg-transparent outline-none border-none text-2xl px-3"
        {...register("title")}
      />
      <BlockTextEditor
        errors={errors}
        name="jsoncontent"
        min={0}
        max={10000}
        inline
        onEdit
        textContent={onDescription}
        content={onJsonDescription!}
        setContent={setOnJsonDescription}
        setTextContent={setOnDescription}
        htmlContent={onHtmlDescription}
        setHtmlContent={setOnHtmlDescription}
      />
      <Button
        className="self-end rounded-2xl bg-demonGreen text-white hover:bg-demonGreen/80 flex gap-x-2"
        type="submit"
        disabled={isPending}
      >
        <Loader loading={isPending}>Create</Loader>
      </Button>
    </form>
  );
};
