import Greeting from "./Greetings";
import {useSelector} from "react-redux";
import LoginControl from "./Greetings";

function Header() {
    return (
        <header
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <p className="h5 my-0 me-md-auto fw-normal">Company name</p>
            <nav className="my-2 my-md-0 me-md-3 justify-content-end">
                <a className="p-2 text-dark" href="/home">Home</a>
                <a className="p-2 text-dark" href="/providers">Find Care</a>
                <a className="p-2 text-dark" href="/account">My Account</a>
                <a className="p-2 text-dark" href="/plans">Plans</a>
            </nav>
            <LoginControl />
        </header>
    )
}
export default Header;
