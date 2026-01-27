import React, {useEffect, useMemo, useState} from "react";
import Navbar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import LeadForm from "./components/LeadForm.jsx";
import LeadList from "./components/LeadList.jsx";
import Financeiro from "./components/Financeiro.jsx";
import Dashboard from "./components/DashBoard.jsx";
import Board from "./components/Board.jsx";
import "./App.css";

const SECTORS = [
    {id: "marketing", label: "Marketing"},
    {id: "presidencia", label: "Presidência"},
    {id: "vp", label: "VP"},
    {id: "adm_fin", label: "ADM Financeiro"},
    {id: "projetos", label: "Projetos"},
    {id: "comercial", label: "Comercial"},
];

const STORAGE_KEY = "animus_leads_v1";

export default function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("login");

    const [leads, setLeads] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    });

    const [activeSector, setActiveSector] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    }, [leads]);

    function handleLogin(userObj) {
        setUser(userObj);
        setPage("home");
    }

    function handleRegister() {
        setPage("login");
    }

    function handleLogout() {
        setUser(null);
        setActiveSector(null);
        setPage("login");
    }

    function handleNavigate(target) {
        const map = {
            controle: "control",
            financeiro: "finance",
            finance: "finance",
            cadastro: "cadastro",
            register: "register",
            home: "home",
        };

        setPage(map[target] || target);
    }

    function openSector(sectorId) {
        setActiveSector(sectorId); // <- SEMPRE ID (ex: "marketing")
        setPage("board");
    }

    function addLead(lead) {
        // Normaliza: sempre salva com ID do setor
        const sectorId = activeSector || lead.sector || "geral";

        const newLead = {
            id: crypto?.randomUUID?.() ?? Date.now().toString(),
            ...lead,
            sector: sectorId,
            column: lead.column || "novo",
            value: Number(lead.value || 0),
        };

        setLeads((prev) => [...prev, newLead]);
        setActiveSector(sectorId);
        setPage("board");
    }

    const activeSectorObj = useMemo(
        () => SECTORS.find((s) => s.id === activeSector),
        [activeSector]
    );

    const sectorTitle = activeSectorObj?.label || (activeSector ? activeSector : "Quadro");

    const leadsForActiveSector = useMemo(() => {
        if (!activeSector) return [];
        return leads.filter((l) => l.sector === activeSector);
    }, [leads, activeSector]);

    return (
        <div className="app-root">
            {user && <Navbar user={user} onNavigate={handleNavigate} onLogout={handleLogout}/>}

            <main className="container">
                {!user && page === "login" && (
                    <Login onLogin={handleLogin} onRegister={() => setPage("register")}/>
                )}

                {!user && page === "register" && <Register onRegister={handleRegister}/>}

                {user && page === "home" && <Dashboard onOpenSector={openSector}/>}

                {user && page === "board" && (
                    <Board
                        sectorId={activeSector || "geral"}
                        sectorTitle={sectorTitle}
                        initialLeads={leadsForActiveSector}
                        onBack={() => setPage("home")}
                        onChange={(changed) => {
                            // remove só os leads do setor ativo e repõe com o que veio do board
                            const others = leads.filter((l) => l.sector !== activeSector);
                            setLeads([...others, ...changed]);
                        }}
                        sectors={SECTORS}
                    />
                )}

                {user && page === "cadastro" && (
                    <LeadForm
                        onAdd={addLead}
                        onCancel={() => setPage(activeSector ? "board" : "home")}
                    />
                )}

                {user && page === "control" && (
                    <div className="page">
                        <h2>Controle</h2>
                        <LeadList leads={leads}/>
                    </div>
                )}

                {user && page === "finance" && <Financeiro leads={leads}/>}
            </main>

            <footer className="footer">© animus · Empresa Júnior de Advocacia</footer>
        </div>
    );
}
