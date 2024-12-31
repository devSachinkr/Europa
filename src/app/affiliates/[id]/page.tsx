import { verifyAffiliate } from "@/actions/group";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const page = async (props: Props) => {
  const { id } = await props.params;
  const verify = await verifyAffiliate({ id });
  if (verify.status === 200) return redirect(`/group/create?affiliate=${id}`);

  if (verify.status !== 200) return redirect("/");
};

export default page;
