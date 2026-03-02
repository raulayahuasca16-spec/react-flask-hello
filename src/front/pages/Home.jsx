import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../services/backendServices.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [user, setUser] = useState({
		email: "",
		password: "",
	})

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!user.email || !user.password) {
			alert("All fields are required")
		}
		login(user, navigate)
	}

	console.log(user)


	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input
						type="text"
						name="email" className="form-control" id="email"
						placeholder="Enter email"
						value={user.email}
						onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input
						type="password"
						name="password" className="form-control" id="password"
						placeholder="Enter password"
						value={user.password}
						onChange={handleChange} />
				</div>
				<button type="submit" className="btn btn-primary">Login</button>
			</form>
			<div className="mt-3">
				<p>
					¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
				</p>
			</div>

		</div>
	);
}; 