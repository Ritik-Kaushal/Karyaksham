import { HOME_PAGE } from "@/utils/constant";
import Link from "next/link";


// Props include highlight
export default function Sidebar(props) {
    return (
        <>
            <div className="Sidebar-Container">
                <ul className="SideNav-container side-navbar-items-offscreen">
                    <SideNavHeading heading="CORE" />
                    <SideNavLi title="Go Home" link={HOME_PAGE} svg={HomeSvg} highlight={props.highlight} />
                    <NavDivider />

                    <SideNavHeading heading="TASK CATEGORIES" />

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