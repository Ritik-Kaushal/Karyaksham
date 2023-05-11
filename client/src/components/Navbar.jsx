import store from "@/store/baseStore";
import { logout } from "@/store/userStore";
import { DASHBOARD_PAGE, HOME_PAGE } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoginModal from "./modals/Auth/LoginModal";
import RegisterModal from "./modals/Auth/RegisterModal";

export default function NavBar() {
    const { logged_in, profile_pic } = useSelector(state => state.user);

    function displayLoginModal(){
        document.getElementById('login-modal').checked = true;
    }

    function displayRegisterModal(){
        document.getElementById('register-modal').checked = true;
    }

    return (
        <>
            <LoginModal />
            <RegisterModal />
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

                    {logged_in ? (
                        <UserMenu profile_pic={profile_pic} />
                    ) : <>
                        <li>
                            <Link href="#" onClick={displayLoginModal}>Login</Link>
                        </li>
                        <li>
                            <Link href="#" onClick={displayRegisterModal}>Register</Link>
                        </li>
                    </>}
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
                    <Link href={DASHBOARD_PAGE}>
                        Dashboard
                    </Link>

                </li>
                <li>
                    <Link
                        href={HOME_PAGE}
                        onClick={() => {
                            store.dispatch(logout());
                            localStorage.removeItem("token");
                        }}
                    >
                        Logout
                    </Link>

                </li>
            </ul>
        </div>
    );
}