import React from "react";
import auth from "../../firebase/Firebase";
import { Form, Input, Button, Card } from "antd";

const Login = ({ setSession }) => {
    const [form] = Form.useForm();
    const onSubmit = async (values) => {
        console.log("onSubmit:", values);
        try {
            const { username, password } = values;
            const resp = await auth.signInWithEmailAndPassword(
                username,
                password
            );
            const { user } = resp;
            console.log("user :", user);
            setSession({
                isLogin: true,
                currentUser: user,
            });
        } catch (error) {
            alert(error.message);
            setSession({
                isLogin: false,
                currentUser: null,
                errorMessage: error.message,
            });
        }
    };

    const onSignup = () => {
        form.validateFields().then(async (values) => {
            console.log("onSignup:", values);
            try {
                const { username, password } = values;
                const resp = await auth.createUserWithEmailAndPassword(
                    username,
                    password
                );
                const { user } = resp;
                console.log("user :", user);
                setSession({
                    isLogin: true,
                    currentUser: user,
                });
            } catch (error) {
                alert(error.message);
                setSession({
                    isLogin: false,
                    currentUser: null,
                    errorMessage: error.message,
                });
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="form">
            <Card style={{ width: 1000 }}>
                <h1>React Login Form With Firebase</h1>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        &nbsp;
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={onSignup}
                        >
                            Signup
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
