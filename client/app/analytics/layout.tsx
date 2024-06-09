import DashboardNavBar from "@/components/navBars/DashboardNavBar";
import { MinChatUiProvider } from "@minchat/react-chat-ui";



export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <DashboardNavBar />
            {children}
        </section>
    );
}