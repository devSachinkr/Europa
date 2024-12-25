"use client";

import { createChannel } from "@/actions/channel";
import { getGroupsChannels } from "@/actions/group";
import { GroupInfoType, IGroups } from "@/components/global/sidebar";
import ToastNotify from "@/components/global/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSidebar = ({ groupId }: { groupId: string }) => {
  const { data: groups } = useQuery({
    queryKey: ["user-groups"],
  }) as { data: IGroups };

  const { data: channels } = useQuery({
    queryKey: ["group-channels"],
    queryFn: () => getGroupsChannels({ groupId }),
  });
  const { data: groupInfo } = useQuery({
    queryKey: ["group-info"],
  }) as { data: GroupInfoType };
  const query = useQueryClient();

  const { isPending, mutate, isError, variables } = useMutation({
    mutationFn: (data: {
      id: string;
      name: string;
      icon: string;
      createdAt: Date;
      groupId: string | null;
    }) => {
      return createChannel(groupId, {
        id: data.id,
        name: data.name.toLowerCase(),
        icon: data.icon,
      });
    },
    onSettled: async () => {
      return await query.invalidateQueries({
        queryKey: ["group-channels"],
      });
    },
  });

  if (isPending) {
    ToastNotify({
      title: "Success",
      msg: "Channel Created Successfully",
    });
  }
  if (isError) {
    ToastNotify({
      title: "Oops!",
      msg: "Oops!, Something went wrong, Try again later!",
    });
  }
  return { groups, channels, groupInfo, mutate, variables, isPending };
};

export { useSidebar };
