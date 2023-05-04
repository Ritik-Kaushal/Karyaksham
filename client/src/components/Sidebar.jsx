import store from "@/store/baseStore";
import { addCategory } from "@/store/categoryStore";
import { HOME_PAGE } from "@/utils/constant";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsPlusCircle } from "react-icons/bs";


// Props include highlight
export default function Sidebar(props) {
    const { categories } = useSelector((state) => state.category);
    const [category_name, setCategoryName] = useState("");
    return (
        <>
            <div className="Sidebar-Container">
                <CreateCategoryModal category_name={category_name} setCategoryName={setCategoryName} category_list={categories} />
                <ul className="SideNav-container side-navbar-items-offscreen">

                    <SideNavHeading heading="CORE" />
                    <SideNavLi title="Go Home" link={HOME_PAGE} svg={HomeSvg} highlight={props.highlight} />
                    <NavDivider />

                    <div className="flex justify-between align-middle">
                        <SideNavHeading heading="TASK CATEGORIES" />
                        <div className="tooltip tooltip-info" data-tip="Add new category" onClick={() => {
                            document.getElementById('create-category').checked = true;
                        }}>
                            <BsPlusCircle size={20} color="rgb(179, 170, 170)" cursor={"pointer"} />
                        </div>
                    </div>

                    {categories.length !== 0 ? <>
                        {categories.map((category, index) => (
                            <SideNavLi title={category} link={HOME_PAGE} svg={CategorySvg} highlight={props.highlight} />
                        ))}
                    </> : <><SideNavLi title="No categories available" link={"#"} svg={NoCategorySvg} highlight={props.highlight} /></>}
                    <NavDivider />


                </ul>
            </div>
        </>
    )
}


// To render the heading in side nav
// props include heading
function SideNavHeading(props) {
    return (
        <li id="nav-li">
            <div id="nav-heading">{props.heading}</div>
        </li>
    )
}


// To render the options in side nav
// Props include link, svg, highlight, title
function SideNavLi(props) {
    return (
        <li id="nav-li">
            <Link
                href={props.link}
            >
                <span id="nav-items">
                    <span>
                        <props.svg highlight={props.highlight} />

                    </span>
                    <span
                        className={
                            props.highlight === 1
                                ? "active"
                                : "none"
                        }
                    >
                        {props.title}
                    </span>
                </span>
            </Link>
        </li>
    )
}

// Renders the divider between two sections
function NavDivider() {
    return (
        <li className="nav-divider">
            <hr></hr>
        </li>
    )
}

// Modal to create category
function CreateCategoryModal(props) {

    function handleCreateCategory() {
        store.dispatch(addCategory(props.category_name));
        // document.getElementById('create-category').checked = false;
    }

    return (
        <>
            <input type="checkbox" id="create-category" className="modal-toggle" />
            <label htmlFor="create-category" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Create Category</h3>
                    <br></br>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" value={props.category_name} onChange={(e) => props.setCategoryName(e.target.value)} name="create-category" id="create-category" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="create-category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cateogry</label>
                    </div>
                    {props.category_name ? <button className="Create-Category-Button btn btn-outline btn-info float-right" onClick={handleCreateCategory}>Create</button> : <button className="btn btn-outline btn-info float-right cursor-not-allowed">Create</button>}
                </label>
            </label>
        </>
    )
}

// SVG of home symbol
function HomeSvg(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={
                props.highlight === 1
                    ? "white"
                    : "gray"
            }
            className="bi bi-house-door-fill"
            viewBox="0 0 16 16"
        >
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
        </svg>
    )
}

// SVG of category
function CategorySvg(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
            <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
        </svg>
    )
}

// SVG for no category
function NoCategorySvg(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
        </svg>
    )
}