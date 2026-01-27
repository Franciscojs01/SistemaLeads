import React from "react";
import "../index.css";

const SECTORS = [
    {id: "marketing", title: "Marketing", desc: "Campanhas, leads e conversão"},
    {id: "presidencia", title: "Presidência", desc: "Visão estratégica"},
    {id: "projetos", title: "Projetos", desc: "Demandas e entregas"},
    {id: "gestao_pessoas", title: "Gestão de Pessoas", desc: "Pessoas e recrutamento"},
    {id: "financeiro", title: "Financeiro", desc: "Receitas e pagamentos"}
];

export default function Dashboard({onOpenSector}) {
    return (
        <div className="container">
            <div className="card">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <h2 style={{margin: 0}}>Diretórias</h2>
                        <p style={{margin: 6, color: "var(--muted)"}}>Escolha um setor para abrir o quadro estilo
                            Kanban</p>
                    </div>
                </div>

                <div className="sectors">
                    {SECTORS.map(s => (
                        <div key={s.id} className="sector-card" onClick={() => onOpenSector(s.id)}>
                            <h3 className="sector-title">{s.title}</h3>
                            <p className="sector-sub">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
