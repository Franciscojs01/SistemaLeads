import React, { useState } from "react";

export default function Login({ onLogin }) {
    const [name, setName] = useState("");

    function submit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        onLogin(name.trim());
    }

    return (
        <div className="card center-card">
            <h2>Bem-vindo à <span className="accent">animus</span></h2>
            <form onSubmit={submit} className="form">
                <label>Nome</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
                <label>Senha (simulada)</label>
                <input type="password" placeholder="senha" />
                <button className="btn-primary" type="submit">Entrar</button>
            </form>
        </div>
    );
}
