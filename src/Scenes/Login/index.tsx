
import React, {useContext, useEffect, useRef} from "react";
import { Button, Col, Container, Form, Navbar } from "react-bootstrap";
import { AuthContext } from "../../Services/Firebase/context/AuthContext";
import backgrnd from "./Images/image.jpg"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "../../Services/Firebase/firebaseSetup";
import { Redirect, useHistory} from "react-router-dom";



export default function Login(){
    const user = useContext(AuthContext);
    const history = useHistory();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const createAccount = async () => {
        try {
          await auth.createUserWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
          );
        } catch (error) {
          console.error(error);
        }
    };
      
    const signIn = async () => {
        try {
            await auth.signInWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            );
            history.push("\dashboard");
        } catch (error) {
            console.error(error);
        }
    };
    
    const signOut = async () => {
        await auth.signOut();
    };

    useEffect(() => {
        if(user){
            history.goBack();
        }
    },[user]);

    return (<>
                <div className="background" style={{backgroundImage: `url(${backgrnd})` }}>
                <div className="login-panel"> 
                    <h1>Login</h1>
                    <hr/>
                    <Container style={{ maxWidth: "1000px" }} fluid>
                        <Form className="mt-6">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef} type="email" placeholder="email" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" placeholder="password" />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                            <Button onClick={signIn} type="button" block>
                                Sign In
                            </Button>
                            </Col>
                        </Form.Row>
                        </Form>
                    </Container>
                </div>
        </div>
    </> )
}