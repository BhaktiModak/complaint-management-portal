import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login({setUser}) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8081/api/users/login",
                form
            );

            const user = res.data;
            //console.log("LOGIN RESPONSE:", res.data);

            localStorage.setItem("user", JSON.stringify(user));
            setUser(user)

            
             //console.log("USER SET:", user);

            alert(`Welcome ${user.name}`);

            if (user.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            alert(
                err.response?.data?.message
                    ? `Login failed: ${err.response.data.message}`
                    : "Login failed"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-container">
            <h2>Login</h2>

            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />

            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />

            <button type="submit">Login</button>

            <p>
                Don't have an account? <Link to="/">Register</Link>
            </p>
        </form>
    );
}

export default Login;
