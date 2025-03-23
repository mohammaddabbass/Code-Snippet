import React, { useState } from "react";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import './styles.css'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = () => {
        if (isRegister) {
            console.log("Register Data:", formData);
        } else {
            console.log("Login Data:", formData);
        }
    };

    return (
        <div className="auth-page flex column justify-center align-center">
            <Form
                onClick={handleSubmit}
                buttonText={isRegister ? "Sign Up" : "Login"}
                toggleText={isRegister ? "Already have an account? Login" : "Don't have an account? Sign up"}
                onToggle={() => setIsRegister(!isRegister)}
            >
                {isRegister && (
                    <FormGroup
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />
                )}
                <FormGroup
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                />
                <FormGroup
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                />
            </Form>
        </div>
    );
};

export default AuthPage;
