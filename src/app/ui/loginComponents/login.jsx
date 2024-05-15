"use client"

import React, { useState } from "react";
import FormLogin from "./cardLogin";
import useUserStore from '../../../../store/authStore'; // Importa el store que hemos creado
import { fetchLogin } from "@/app/lib/data";

const Login = ({ router }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setUser, user, role, token, setToken, setRole } = useUserStore();

    console.log("User", user);
    console.log("Role", role);
    console.log("Token", token);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const loginResponse = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await loginResponse.json();

            if (loginResponse.ok) {
                setUser(data.user);
                setToken(data.message);
                setRole(data.roles);
                router.push('/dashboard');
            } else {
                throw new Error(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar iniciar sesión.');
        }
    }

    return (
        <FormLogin handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} />
    );
}

export default Login;
