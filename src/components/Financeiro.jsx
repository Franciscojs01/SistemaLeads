import React from "react";

export default function Financeiro({leads = []}) {
    const total = leads.reduce((s, l) => s + (Number(l.value) || 0), 0);
    return (
        <div className="container">
            <div className="card">
                <h2>Financeiro</h2>
                <p style={{color: "var(--muted)"}}>Resumo financeiro dos leads</p>
                <div style={{marginTop: 12}}>
                    <div style={{fontSize: 18, fontWeight: 700}}>Total previsto: R$ {total.toFixed(2)}</div>
                    <div style={{marginTop: 8}}><em>Filtre por setor no quadro para análise mais detalhada.</em></div>
                </div>
            </div>
        </div>
    );
}