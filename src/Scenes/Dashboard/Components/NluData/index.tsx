import { useState, FunctionComponent, useEffect, useRef, useContext} from "react"
import {Navbar, Modal, Form, Button, FormControl} from "react-bootstrap"
import Sidebar from "../../Components/Sidebar/index"
import addImg from "../../images/Vector.png"
import signOutImg from "../../images/BG.png"
import { auth } from "../../../../Services/Firebase/firebaseSetup";
import { Redirect } from "react-router"
import { AuthContext } from "../../../../Services/Firebase/context/AuthContext";

export default function NluData(){
    const [data, setData] = useState<[string, string][]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [editing, setEditing] = useState<number | null>(null)
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

    const remove = (index: number) => {
        // TODO update server side
        if(data){
            setData([
                ...data.slice(0, index),
                ...data.slice(index+1)
            ])
        }
    }
    const openEditModal = (index: number) => {
        setEditing(index);
        setModalOpen(true);

    }
    const edit = () => {
        // TODO update server side
        if(!intentRef || !intentRef.current || !sentenceRef || !sentenceRef.current || !user)return;
        if(data && (editing || editing === 0)){
            setData([
                ...data.slice(0, editing),
                [sentenceRef.current.value, intentRef.current.value],
                ...data.slice(editing+1)
            ])
            setEditing(null);
        }
    }



    return <>
        {!user && <Redirect to="login"/>}
        <Modal show={modalOpen} onHide={ () => setModalOpen(false)}>
            <Modal.Header>
                <h3>Edit sentence</h3>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control ref={sentenceRef} type="text" placeholder="Sentence" defaultValue={(editing === 0 || editing)? data[editing][0]:""} />
                    <div className="select">
                        <Form.Control ref={intentRef} as="select" defaultValue={(editing === 0 || editing)? data[editing][1]:""}>
                            <option>greet</option>
                            <option>mood_happy</option>
                            <option>goodbye</option>
                        </Form.Control>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {setModalOpen(false);setEditing(null)}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    if(editing !== 0 && !editing)
                        save();
                    else edit();
                    setModalOpen(false);
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        <div className="content-3">
            <div className="top">
                <input type="text" className="search" placeholder="Seach here"/>
                <div className="img-container">
                    <img className="addImg" src={addImg} onClick={() => setModalOpen(true)}/>
                </div>
            </div>
            <hr/>
            <div className="container">
                <div className="a"> Sentence</div>
                <div className="b"> Intent</div>
                <Data data={data} remove={remove} edit={openEditModal}/>
            </div>
        </div>
    </>
}

interface Idata{
    data: [string, string][],
    remove: (index: number) => void,
    edit: (index:number) => void
}

const Data: FunctionComponent<Idata> = ({data, remove, edit} : Idata) => {

    return <> {
        data.map((item, index) => {
            const divStyle = {
                gridColumn: 1,
                gridRow: index+2,
            }
            return <div style={divStyle}>{item[0]}</div>
        })
    }
        {
            data.map((item, index) => {
                const divStyle = {
                    gridColumn: 2,
                    gridRow: index+2,
                }
                return <div style={divStyle}>{item[1]}</div>
            })
        }
        {
            data.map((item, index) => {
                const divStyle = {
                    gridColumn: 4,
                    gridRow: index+2,
                }
                return <div style={divStyle}>
                    <div onClick={() => remove(index)}>Delete</div>
                </div>
            })
        }
        {
            data.map((item, index) => {
                const divStyle = {
                    gridColumn: 6,
                    gridRow: index+2,
                }
                return <div style={divStyle} onClick={() => edit(index)}>Edit</div>
            })
        }
    </>
}