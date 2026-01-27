import React, { useState } from "react";
import "../index.css";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nameFromEmail = (e) => {
        try {
            return e.split("@")[0];
        } catch {
            return e;
        }
    };

    const submit = (e) => {
        e?.preventDefault();
        if (!email.trim() || !password.trim()) return;
        // envie um objeto de usuário para o App
        onLogin({ name: nameFromEmail(email), email });
    };

    return (
        <div className="container">
            <div className="card center-card login-card">
                <h2 style={{ margin: 0, color: "var(--accent)" }}>Entrar</h2>
                <p style={{ margin: 6, color: "var(--muted)" }}>Use seu email e senha para acessar</p>

                <form className="form" onSubmit={submit} style={{ width: "100%", maxWidth: 420 }}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@exemplo.com" />

                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="senha" />

                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button className="btn-primary" type="submit">Entrar</button>
                        <button type="button" className="btn-ghost" onClick={() => { setEmail(""); setPassword(""); }}>Limpar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
