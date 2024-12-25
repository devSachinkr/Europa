import { authUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const Navbar = async () => {
  const user = await authUser();
  const clerkUser = await currentUser();

  return (
    <div className="w-full flex justify-between sticky top-0 z-50 items-center py-5 ">
      <p className="font-bold text-2xl text-themeTextWhite">Europa.</p>{" "}
      <div>
        {!user.id && !clerkUser?.id && (
          <Link href="/sign-in">
            <Button className="text-white bg-demonGreen hover:bg-demonGreen/80  flex items-center gap-1">
              Get Started
              <ArrowRight className=" h-4 w-4" />
            </Button>
          </Link>
        )}
        {user.id && clerkUser?.id && (
          <Link href="/sign-in" className="flex items-center justify-center gap-3">
            <UserButton />
            <Button className="border-demonGreen hover:bg-demonGreen/80 text-themeTextWhite font-semibold border-dashed bg-black border-[1px] ">
              Dashboard
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
