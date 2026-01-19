import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList.jsx";
import Finance from "./components/Financeiro.jsx";

export default function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("login");
    const [leads, setLeads] = useState([]);

    function handleLogin(name) {
        setUser({ name });
        setPage("home");
    }

    function handleLogout() {
        setUser(null);
        setPage("login");
    }

    function addLead(lead) {
        setLeads((s) => [...s, { id: Date.now(), ...lead }]);
        setPage("control");
    }

    return (
        <div className="app-root">
            {user && <Navbar user={user} onNavigate={setPage} onLogout={handleLogout} />}
            <main className="container">
                {!user && page === "login" && <Login onLogin={handleLogin} />}
                {user && page === "home" && <Home onNavigate={setPage} />}
                {user && page === "cadastro" && <LeadForm onAdd={addLead} onCancel={() => setPage("home")} />}
                {user && page === "control" && <LeadList leads={leads} />}
                {user && page === "finance" && <Finance leads={leads} />}
            </main>
            <footer className="footer">© animus · Empresa Júnior de Advocacia</footer>
        </div>
    );
}
