import React from "react";
import "../index.css";

const SECTORS = [
    { id: "marketing", title: "Marketing", desc: "Atração e qualificação de leads (topo de funil)." },
    { id: "comercial", title: "Comercial Jurídico", desc: "Pipeline de propostas e contratos (advocacia)." },
    { id: "presidencia", title: "Presidência", desc: "Demandas estratégicas e parcerias." },
    { id: "projetos", title: "Projetos", desc: "Demandas por cliente e entregas." },
    { id: "gestao_pessoas", title: "Gestão de Pessoas", desc: "1:1, onboarding, feedbacks e desenvolvimento." },
    { id: "gestao_estrategias", title: "Gestão de Estratégias", desc: "OKRs, iniciativas e metas." },
    { id: "adm_fin", title: "ADM Financeiro", desc: "Pagamentos e recebimentos (previsto, em aberto, pago, atrasado)." },
];

export default function Dashboard({ onOpenSector }) {
    return (
        <div className="container">
            <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <h2 style={{ margin: 0 }}>Diretorias</h2>
                        <p style={{ margin: 6, color: "var(--muted)" }}>
                            Escolha um setor para abrir o quadro estilo Kanban
                        </p>
                    </div>
                </div>

                <div className="sectors">
                    {SECTORS.map((s) => (
                        <div
                            key={s.id}
                            className="sector-card"
                            onClick={() => onOpenSector(s.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && onOpenSector(s.id)}
                        >
                            <h3 className="sector-title">{s.title}</h3>
                            <p className="sector-sub">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
