import React from "react";
import "../index.css";

export default function NavBar({user, onNavigate, onLogout}) {
    return (
        <header className="navbar">
            <div className="nav-left">
                <strong>animus</strong>
            </div>
            <nav className="nav-links">
                <button onClick={() => onNavigate("home")} className="nav-btn">Diretórias</button>
                <button onClick={() => onNavigate("control")} className="nav-btn">Controle</button>
                <button onClick={() => onNavigate("financeiro")} className="nav-btn">Financeiro</button>
            </nav>
            <div className="nav-right">
                <span className="muted">Olá, {user?.name}</span>
                <button className="btn-ghost" onClick={onLogout}>Sair</button>
            </div>
        </header>
    );
}