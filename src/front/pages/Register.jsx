import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/backendServices";

export const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            alert("All fields are required");
            return;
        }
        register(user, navigate);
    };

    return (
        <div className="text-center mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};