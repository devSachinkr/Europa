import { signInUser } from "@/actions/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
    const user = await currentUser();
    if (!user?.id) return redirect("/sign-in/asdasd");

    const auth = await signInUser({ clerkId: user.id });

    if (auth.status === 200) return redirect("/group/create");
    if (auth.status === 207)
        return redirect(`/group/${auth.groupId}/channel/${auth.channelId}`);

    // if (auth.status !== 200) return redirect("/sign-in");
};

export default page;
