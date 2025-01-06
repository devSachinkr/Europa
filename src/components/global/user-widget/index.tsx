import User from "./user";

type Props = {
  image: string;
  groupId?: string;
  userId: string;
};

const UserWidget = ({ groupId, image, userId }: Props) => {
  return (
    <div className="gap-5 items-center hidden md:flex ">
     
      <User userId={userId} image={image} groupId={groupId!} />
    </div>
  );
};

export default UserWidget;
