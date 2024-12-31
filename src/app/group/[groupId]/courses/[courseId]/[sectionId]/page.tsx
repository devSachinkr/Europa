import { authUser } from "@/actions/auth";
import { getGroupInfo } from "@/actions/group";
import CourseContentForm from "@/components/forms/course";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    groupId: string;
    courseId: string;
    sectionId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { groupId, courseId, sectionId } = await params;
  const user = await authUser();
  if (!user.id) return redirect("/sign-in");
  const groupInfo = await getGroupInfo({ groupId });

  return (
    <CourseContentForm
      groupUserId={groupInfo.data?.userId as string}
      sectionId={sectionId}
      userId={user.id}
    />
  );
};

export default Page;
