import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return <SignIn afterSignOutUrl={"/"} fallbackRedirectUrl={"/"} />;
};

export default SignInPage;
