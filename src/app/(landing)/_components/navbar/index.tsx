import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="w-full flex justify-between sticky top-0 z-50 items-center py-5 ">
            <p className="font-bold text-2xl text-themeTextWhite">Europa.</p>{" "}
            <div>
                <Link href="/sign-in">
                    <Button className="text-white bg-demonGreen hover:bg-demonGreen/80  flex items-center gap-1">
                        Get Started
                        <ArrowRight className=" h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
