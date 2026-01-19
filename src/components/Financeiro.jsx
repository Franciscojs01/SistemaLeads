import React from "react";

function sumServices(services = []) {
    return services.reduce((s, it) => s + (Number(it.price) || 0), 0);
}

export default function Finance({ leads }) {
    const totals = leads.map((l) => ({ id: l.id, name: l.name, total: sumServices(l.services) }));
    const grand = totals.reduce((s, t) => s + t.total, 0);

    return (
        <div>
            <div className="card">
                <h3>Financeiro</h3>
                {totals.length === 0 && <p>Nenhum lançamento.</p>}
                {totals.length > 0 && (
                    <table className="finance-table">
                        <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Valor total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {totals.map(t => (
                            <tr key={t.id}>
                                <td>{t.name}</td>
                                <td>R$ {t.total.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr className="grand">
                            <td>Total Geral</td>
                            <td>R$ {grand.toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
