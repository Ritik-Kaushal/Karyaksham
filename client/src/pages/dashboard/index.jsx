import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
// import BarChart from "@/components/barChart";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

const BarChart = dynamic(() => import("@/components/barChart"), {
    ssr: false,
})

export default function Dashboard() {

    return (
        <>
            <Head><title>Dashboard</title></Head>
            <NavBar />
            <Sidebar highlight={"dashboard"} />
            <div className="Content-Area-Top Content-Area-Side">
                <div className='bar-chart'>
                    <BarChart/>
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}