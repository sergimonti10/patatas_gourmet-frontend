import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import FormLogin from "./cardLogin";
import useUserStore from '../../../../store/authStore';
import { fetchLogin } from "../../../services/data";
import { AUTH_BASE_URL } from "@/services/links";

const Login = ({ router }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setUser, setToken, setRole } = useUserStore();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const loginResponse = await fetch(`${AUTH_BASE_URL}login`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
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
                setToken(data.auth_token);
                setRole(data.roles);
                toast.success(data.message);
                router.push('/dashboard');
            } else {
                throw new Error(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Ha ocurrido un error al intentar iniciar sesión.');
            toast.error(error.message || 'Ha ocurrido un error al intentar iniciar sesión.');
        }
    }

    return (
        <FormLogin handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} />
    );
}

export default Login;
