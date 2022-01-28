import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/login/Login";
import auth from "./firebase/Firebase";
import { Form, Button } from "antd";

function App() {
    const [session, setSession] = useState({
        isLogin: false,
        currentUser: null,
        errorMessage: null,
    });
    useEffect(() => {
        const handleAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setSession({
                    isLogin: true,
                    currentUser: user,
                    errorMessage: null,
                });
            }
        });
        return () => {
            handleAuth();
        };
    }, []);

    const signOut = () => {
        auth.signOut().then((resp) => {
            setSession({
                isLogin: false,
                currentUser: null,
            });
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="App">
            {session.isLogin ? (
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <p>
                        Hello ! &nbsp;
                        {session.currentUser && session.currentUser.email}
                    </p>
                    <Form
                        name="basic"
                        onFinish={signOut}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Logout
                            </Button>
                        </Form.Item>
                    </Form>
                </header>
            ) : (
                <Login setSession={setSession} />
            )}
        </div>
    );
}

export default App;
