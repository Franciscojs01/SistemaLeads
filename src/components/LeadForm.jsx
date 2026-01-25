import React, { useState } from "react";

export default function LeadForm({ onAdd, onCancel }) {
    const [form, setForm] = useState({ name: "", status: "quente", service: "", payment: "", value: "" });

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        onAdd({ ...form, value: Number(form.value || 0) });
        setForm({ name: "", status: "quente", service: "", payment: "", value: "" });
    };

    return (
        <div className="card">
            <form className="form" onSubmit={submit}>
                <label>Nome do Lead</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />

                <label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                    <option value="quente">Quente</option>
                    <option value="morno">Morno</option>
                    <option value="frio">Frio</option>
                </select>

                <label>Serviço</label>
                <input value={form.service} onChange={e=>setForm({...form,service:e.target.value})} />

                <label>Forma de Pagamento</label>
                <input value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})} />

                <label>Valor (R$)</label>
                <input type="number" step="0.01" value={form.value} onChange={e=>setForm({...form,value:e.target.value})} />

                <div style={{display:"flex",gap:8,marginTop:8}}>
                    <button className="btn-primary" type="submit">Adicionar</button>
                    <button type="button" className="btn-ghost" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}