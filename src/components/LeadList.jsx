import React from "react";

function sumServices(services = []) {
  return services.reduce((s, it) => s + (Number(it.price) || 0), 0);
}

export default function LeadList({ leads }) {
  if (!leads.length) return <div className="card">Nenhum lead cadastrado ainda.</div>;

  return (
    <div className="list">
      {leads.map((lead) => (
        <div className="card lead-card" key={lead.id}>
          <div className="lead-header">
            <h4>{lead.name}</h4>
            <span className={`status ${lead.status}`}>{lead.status}</span>
          </div>
          <div>
            <strong>Serviços</strong>
            <ul>
              {lead.services && lead.services.length ? lead.services.map((s, i) => (
                <li key={i}>{s.name} — R$ {Number(s.price || 0).toFixed(2)} — {s.payment}</li>
              )) : <li>—</li>}
            </ul>
          </div>
          <div className="lead-total">Total: R$ {sumServices(lead.services).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
