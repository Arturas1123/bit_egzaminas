import 'bootstrap/dist/css/bootstrap.css';
import {Link, usePage} from "@inertiajs/react";
import {useState} from "react";
import button from "bootstrap/js/src/button";

export default function AppLayout({ children}) {
    const {auth, pavadinimas}=usePage().props;

    const [showNav, setShowNav] = useState("block");

    const user=auth.user;




    return (
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Sistema</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav" style={{display: "block" }}>

                            { user!=null?
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" href={route("dishes.index")}>Patiekalai</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href={route("cafes.index")}>Kavinės</Link>
                                    </li>



                                </ul>
                                :
                                <ul className="navbar-nav">
                                    <li className="nav-item">

                                    </li>
                                    <li className="nav-item">

                                    </li>
                                </ul>
                            }


                        </div>
                        {user==null ?
                            <div className="float-end">

                                <Link className="btn btn-primary mr-3 "  href={ route("login")} >Prisijungti</Link>
                                &nbsp;


                                <Link className="btn btn-info "  href={ route("register")} >Registruotis</Link>

                            </div>
                            :
                            <div className="float-end">
                                <span >Sveiki: <b>{user.name} ({user.type==1?"administratorius":"vartotojas"})</b> </span>
                                <Link className="btn btn-warning " href={route('logout')} method="post"  >Atsijungti</Link>

                            </div>
                        }
                        <div className="float-end">

                        </div>

                    </div>
                </nav>
                {children}
            </div>
        </div>
    );
}
