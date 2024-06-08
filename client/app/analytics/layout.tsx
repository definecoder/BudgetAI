import DashboardNavBar from "@/components/navBars/DashboardNavBar";



export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <DashboardNavBar />
            {children}
        </section>
    );
}