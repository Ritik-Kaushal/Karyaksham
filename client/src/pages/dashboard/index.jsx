import DashboardCard from "@/components/DashboardCard";
import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";
import Head from "next/head";

const BarChart = dynamic(() => import("@/components/barChart"), {
    ssr: false,
})

export default function Dashboard() {

    return (
        <>
            <Head><title>Dashboard</title></Head>
            <NavBar />
            <Sidebar highlight={"dashboard"} />
            <div className="Content-Area-Top Content-Area-Side overflow-auto">
                <div className='bar-chart'>
                    <BarChart/>
                </div>
                    <div className="dashboard-card">
                        <DashboardCard />
                    </div>
            </div>
        </>
    )
}