import DashboardNavBar from "@/components/homepage/DashboardNavBar";



export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <DashboardNavBar />
            {children}
        </section>
    );
}