import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {

    return (
        <>
            <NavBar />
            <Sidebar/>
            <div className="Content-Area-Top Content-Area-Side">
                From Dashboard
            </div>
        </>
    )
}