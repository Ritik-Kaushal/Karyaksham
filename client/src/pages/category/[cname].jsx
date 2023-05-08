import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CompletedTaskCard from "@/components/CompletedTaskCard";
import DelayedTaskCard from "@/components/DelayedTaskCard";
import MissedTaskCard from "@/components/MissedTaskCard";
import PendingTaskCard from "@/components/PendingTaskCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Category() {
  const router = useRouter();
  const { cname } = router.query;

  const taskList = useSelector(state => state.task[cname]);

  return (
    <>
      <Head>
        <title>{cname}</title>
      </Head>

        <NavBar />
        <Sidebar highlight={cname} />
      {/* <div className="navigation">
      </div> */}
      
      <div className="Content-Area-Top Content-Area-Side">
        <div className="Category-Container">
          <div className="Category-Header">{cname}</div>
          {taskList && <div className="Category-Body">
            <div className="Category-Card"><PendingTaskCard tasklist={taskList.upcoming} /></div>
            <div className="Category-Card"><CompletedTaskCard tasklist={taskList.completed} /></div>
            <div className="Category-Card"><MissedTaskCard tasklist={taskList.missed} /></div>
            <div className="Category-Card"><DelayedTaskCard tasklist={taskList.delayed} /></div>
          </div>}
        </div>
      </div>
    </>
  );
}

