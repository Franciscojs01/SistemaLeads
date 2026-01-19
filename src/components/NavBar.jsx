import React from "react";

export default function Navbar({ user, onNavigate, onLogout }) {
    return (
        <header className="navbar">
            <div className="brand" onClick={() => onNavigate("home")}>
                <svg className="logo" viewBox="0 0 64 64" width="28" height="28" aria-hidden>
                    <g fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M32 8v8" />
                        <path d="M16 18h32" />
                        <path d="M20 22c0 8 6 12 12 12s12-4 12-12" />
                        <path d="M16 34h32" />
                    </g>
                </svg>
                <span className="brand-text">animus</span>
            </div>
            <nav className="nav-links">
                <button onClick={() => onNavigate("cadastro")}>Cadastro de Leads</button>
                <button onClick={() => onNavigate("control")}>Controle de Leads</button>
                <button onClick={() => onNavigate("finance")}>Financeiro</button>
                <button onClick={onLogout} className="btn-ghost">Sair</button>
            </nav>
        </header>
    );
}
