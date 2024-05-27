import AuthNavBar from "@/components/navBars/AuthNavBar";
import { LoginForm } from "./loginform";

export default function Page() {
    return (
        <main>
            <AuthNavBar />
            <div className="h-[80vh] flex justify-center items-center">
                <LoginForm />
            </div>
            
        </main>
            

        
    );
}