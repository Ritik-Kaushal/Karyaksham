import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

export default function Dashboard() {

    return (
        <>
            <Head><title>Dashboard</title></Head>
            <NavBar />
            <Sidebar highlight={"dashboard"}/>
            <div className="Content-Area-Top Content-Area-Side">
                From Dashboard
            </div>
        </>
    )
}