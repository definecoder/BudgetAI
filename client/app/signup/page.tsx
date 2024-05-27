import AuthNavBar from "@/components/navBars/AuthNavBar";
import { SignUpForm } from "./signupform";

export default function Page() {
    return (
        <main>
            <AuthNavBar />
            <div className="h-[80vh] flex justify-center items-center">
                <SignUpForm />
            </div>
        </main>
    );
}