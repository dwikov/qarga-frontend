import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch, useHistory
} from "react-router-dom";
import NluData from "./Components/NluData";
import {useContext, useState} from "react";
import {AuthContext} from "../../Services/Firebase/context/AuthContext";
import Sidebar from "./Components/Sidebar";
import "./index.css"
import {Navbar} from "react-bootstrap";
import signOutImg from "./images/BG.png";
import {auth} from "../../Services/Firebase/firebaseSetup";
import Responses from "./Components/Responses";

export default function Dashboard(){
    const user = useContext(AuthContext);
    const [title, setTitle] = useState<String>("Talk to your bot")
    let match = useRouteMatch();
    const history = useHistory();

    const signOut = async () => {
        await auth.signOut();
    };

    return <>
            {!user && <Redirect push to="/login"/>}
            <Navbar bg="primary" variant="dark">
                <div className="brand">
                    <Navbar.Brand href="#home" >Qarga</Navbar.Brand>
                    <img className="sign-out" src = {signOutImg} onClick={signOut}/>
                </div>
            </Navbar>
            <div className="content-1">
                <Sidebar changeTitle = {(str: string) => {setTitle(str); history.push(`/dashboard/${str}`);}}/>
                <div className="content-2">
                    <h2 className="title">
                        {title}
                    </h2>
                    <Switch>
                        <Route path={`${match.path}/NLU Data`}>
                            <NluData/>
                        </Route>
                        <Route path={`${match.path}/Responses`}>
                            <Responses/>
                        </Route>
                        <Route path={`${match.path}`}>
                            <div/>
                        </Route>
                    </Switch>
                </div>
            </div>

        </>;
}