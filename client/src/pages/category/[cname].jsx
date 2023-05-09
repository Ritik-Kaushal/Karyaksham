import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CompletedTaskCard from "@/components/CompletedTaskCard";
import DelayedTaskCard from "@/components/DelayedTaskCard";
import MissedTaskCard from "@/components/MissedTaskCard";
import UpcomingTaskCard from "@/components/UpcomingTaskCard";
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

      <div className="Content-Area-Top Content-Area-Side">
        <div className="Category-Container">
          <div className="Category-Header">{cname}</div>
          {taskList && <div className="Category-Body">
            <div className="Category-Card"><UpcomingTaskCard tasklist={taskList.upcoming} category={cname} /></div>
            <div className="Category-Card"><CompletedTaskCard tasklist={taskList.completed} category={cname} /></div>
            <div className="Category-Card"><MissedTaskCard tasklist={taskList.missed} category={cname} /></div>
            <div className="Category-Card"><DelayedTaskCard tasklist={taskList.delayed} category={cname} /></div>
          </div>}
        </div>
      </div>
    </>
  );
}

