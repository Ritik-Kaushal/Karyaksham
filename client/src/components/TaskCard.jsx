import { useEffect, useState } from "react"

export default function TaskCard(props) {
    const [background,setBackground] = useState("bg-info");

    useEffect(()=>{
        if(props.type === "COMPLETED") setBackground("bg-success");
        if(props.type === "PENDING") setBackground("bg-info");
        if(props.type === "PAST-NOT-COMPLETE") setBackground("bg-error");
        if(props.type === "PAST-COMPLETE") setBackground("bg-warning");
    },[props.type])
    return (
        <>
            <div className={`card lg:card-side ${background} shadow-2xl w-full h-full -z-10`}>
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{props.title}</h2>
                    {props.tasklist ? <>
                        {props.tasklist.map((task,index)=>(
                            <>  
                                <p>{task.name}</p>
                            </>
                        ))}
                    </> : <p>No data to display</p>}
                </div>
            </div>

        </>
    )
}