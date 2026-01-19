import React from "react";

export default function Home({ onNavigate }) {
    return (
        <div className="grid">
            <div className="card">
                <h3>Cadastro de Leads</h3>
                <p>Cadastrar novos atendimentos e serviços solicitados.</p>
                <button className="btn-primary" onClick={() => onNavigate("cadastro")}>Ir para cadastro</button>
            </div>
            <div className="card">
                <h3>Controle de Leads</h3>
                <p>Visualizar e acompanhar todos os leads registrados.</p>
                <button onClick={() => onNavigate("control")}>Abrir controle</button>
            </div>
            <div className="card">
                <h3>Financeiro</h3>
                <p>Resumo financeiro por lead e total de serviços.</p>
                <button onClick={() => onNavigate("finance")}>Ver financeiro</button>
            </div>
        </div>
    );
}
