
type Props = {
  params: Promise<{
    groupId: string;
    courseId: string;
    sectionId: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { groupId, courseId, sectionId } = await params;
  return <div>{sectionId}</div>;
};

export default Page;
