import React from "react";
import "../index.css";

const SECTORS = [
    {id: "marketing", title: "Marketing", desc: "Leads quentes, mornos e serviços"},
    {id: "presidencia", title: "Presidência", desc: "Controle de demandas e parceiros"},
    {id: "vp", title: "VP", desc: "Gestão de pessoas e estratégias"},
    {id: "adm_fin", title: "ADM Financeiro", desc: "Fluxo financeiro e orçamento"},
    {id: "projetos", title: "Projetos", desc: "Demandas organizadas por cliente"},
    {id: "comercial", title: "Comercial", desc: "Pipeline comercial e oportunidades"},
];

export default function Dashboard({onOpenSector}) {
    return (
        <div className="container">
            <div className="card">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <h2 style={{margin: 0}}>Diretorias</h2>
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
