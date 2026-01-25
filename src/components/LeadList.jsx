import React from "react";

export default function LeadList({leads = [], sector}) {
    if (!leads.length) return <div className="card"><p style={{margin: 0}}>Nenhum lead
        cadastrado{sector ? ` neste setor (${sector})` : ""}.</p></div>;
    return (
        <div className="list">
            {leads.map(l => (
                <div key={l.id} className="lead-row card"
                     style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 10}}>
                    <div>
                        <div style={{fontWeight: 700}}>{l.name}</div>
                        <div style={{
                            color: "var(--muted)",
                            fontSize: 13
                        }}>{l.service || "—"} · {l.status} · {l.payment || "—"}</div>
                    </div>
                    <div style={{fontWeight: 800}}>R$ {(Number(l.value) || 0).toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
}