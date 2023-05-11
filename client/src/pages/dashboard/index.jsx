import DashboardCard from "@/components/DashboardCard";
import LoginAlert from "@/components/LoginAlert";
import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BarChart = dynamic(() => import("@/components/barChart"), {
    ssr: false,
})

export default function Dashboard() {
    const { logged_in } = useSelector(state => state.user);

    useEffect(()=>{
        if(!logged_in){
          if(document.getElementById('login-modal')) document.getElementById('login-modal').checked = true;
        }
      },[])

    return (
        <>
            <Head><title>Dashboard</title></Head>
            <NavBar />
            {logged_in ? <><Sidebar highlight={"dashboard"} />
                <div className="Content-Area-Top Content-Area-Side overflow-auto">
                    <div className='bar-chart'>
                        <BarChart />
                    </div>
                    <div className="dashboard-card">
                        <DashboardCard />
                    </div>
                </div></> : <><LoginAlert /></>}
        </>
    )
}