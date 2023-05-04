import { HOME_PAGE } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            <div className="Navbar-Container">
                <div className="Navbar-Logo">
                    <Link href={HOME_PAGE}>
                        <Image
                            src="/logo.png"
                            width={50}
                            height={0}
                        />
                    </Link>
                </div>
                <ul className="Navbar-Items">
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/faq">FAQs</Link>
                    </li>

                    {loggedIn && (
                        <UserMenu profile_pic="https://ik.imagekit.io/pqymxdgbi/avtar.png" />
                    )}
                    {!loggedIn && (
                        <>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/signup">SignUp</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}


// For displaying the profile pic on the top right side
// It takes profile_pic (which is a link) as props
function UserMenu(props) {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src={props.profile_pic} />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-2 p-2 shadow rounded-box w-52 bg-black"
            >
                <li>
                    <Link
                        href={HOME_PAGE}
                        onClick={() => {
                            // store.dispatch(logoutUser());
                            alert("Logged out");
                        }}
                    >
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}