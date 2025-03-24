import React, { useState } from "react";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import './styles.css'
import { requestMethods } from "../../utils/enums/request.methods";
import { request } from "../../utils/remote/axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        setError("");
        try {
            const route = isRegister ? "/guest/register" : "/guest/login";
            const body = isRegister ? formData : {
                email: formData.email,
                password: formData.password
            };

            const response = await request({
                method: requestMethods.POST,
                route,
                body
            });

            if (response.error) {
                console.log(response.message);
                setError(response.error);
                console.log(error); 
            }

            if (response.authorisation?.token) {
                localStorage.setItem("bearer_token", response.authorisation.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                navigate("/");
            }
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
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
