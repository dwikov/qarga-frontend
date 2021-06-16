import { useState, FunctionComponent, useEffect, useRef, useContext} from "react"
import { Navbar, Modal, Form, Button} from "react-bootstrap"
import Sidebar from "./Components/Sidebar/index"
import "./index.css"
import addImg from "./images/Vector.png"
import signOutImg from "./images/BG.png"
import { auth } from "../../Services/Firebase/firebaseSetup";
import { Redirect } from "react-router"
import { AuthContext } from "../../Services/Firebase/context/AuthContext";

export default function Dashboard(){
    const [title, setTitle] = useState<String>("Talk to your bot")
    const [data, setData] = useState<[string, string][]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const sentenceRef = useRef<HTMLInputElement>(null)
    const intentRef = useRef<HTMLSelectElement>(null)
    const user = useContext(AuthContext);

    useEffect(() => {
        if(!user)return;
        let serverUrl = "http://127.0.0.1:5000/get-nlu-data";
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.uid
            })
        }).then(res => res.json())
        .then((result) => {
            setData(result);
        }).catch(e => {
            console.log(e);
        })
    }
    , [user])

    const save = () => {
        if(!intentRef || !intentRef.current || !sentenceRef || !sentenceRef.current || !user)return;
        let serverUrl = "http://127.0.0.1:5000/add-nlu-data";
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: user.uid,
                sentence: sentenceRef.current.value,
                intent: intentRef.current.value
            })
        })
        .then(res => res.json())
        .then((result) => {
                if(!intentRef || !intentRef.current || !sentenceRef || !sentenceRef.current || !user)return;
                if(data){
                    setData([
                        ...data,
                        [sentenceRef.current.value,
                            intentRef.current.value]
                    ])
                }
                console.log(result);
            })
        .catch(e => {
            console.log(e);
        })
    }

    const signOut = async () => {
        await auth.signOut();
    };

    return <>
        {!user && <Redirect to="login"/>}
        <Modal show={modalOpen} onHide={ () => setModalOpen(false)}>
            <Modal.Header>
                <h3>Edit sentence</h3>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control ref={sentenceRef} type="text" placeholder="Sentence" />
                    <div className="select">
                        <Form.Control ref={intentRef} as="select">
                            <option>greet</option>
                            <option>mood_happy</option>
                            <option>goodbye</option>
                        </Form.Control>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {save();setModalOpen(false);}}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        <Navbar bg="primary" variant="dark">
            <div className="brand">
                <Navbar.Brand href="#home" >Qarga</Navbar.Brand>
                <img className="sign-out" src = {signOutImg} onClick={signOut}/>
            </div>
        </Navbar>
        <div className="content-1">
            <Sidebar changeTitle = {(str: string) => {setTitle(str)}}/>
            <div className="content-2">
                <h2 className="title"> 
                    {title}
                </h2>
                <div className="content-3">
                    <div className="top">
                        <div className="search">Seach bar here</div>
                        <div className="img-container">
                            <img className="addImg" src={addImg} onClick={() => setModalOpen(true)}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="container">
                        <div className="a"> Sentence</div>
                        <div className="b"> Intent</div>
                        <Data data={data}/>
                    </div>
                </div>
            </div>
        </div>
        
    </>
}

interface Idata{
    data: [string, string][]
}

const Data: FunctionComponent<Idata> = ({data} : Idata) => {
    return <> {
        data.map((item, index) => {
            const divStyle = {
                gridColumn: 1, 
                gridRow: index+2,
            }
            return <div style={divStyle}>{item[0]}</div>
        })}{
        data.map((item, index) => {
            const divStyle = {
                gridColumn: 2, 
                gridRow: index+2,
            }
            return <div style={divStyle}>{item[1]}</div>
        })
    }</>
}