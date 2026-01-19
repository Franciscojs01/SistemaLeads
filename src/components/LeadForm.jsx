import React, { useState } from "react";

const blankService = () => ({ name: "", price: "", payment: "" });

export default function LeadForm({ onAdd, onCancel }) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("quente");
    const [services, setServices] = useState([blankService()]);

    function updateService(idx, field, value) {
        setServices((s) => s.map((sv, i) => (i === idx ? { ...sv, [field]: value } : sv)));
    }

    function addService() {
        setServices((s) => [...s, blankService()]);
    }

    function removeService(idx) {
        setServices((s) => s.filter((_, i) => i !== idx));
    }

    function submit(e) {
        e.preventDefault();
        const cleanedServices = services
            .filter((s) => s.name.trim())
            .map((s) => ({ name: s.name.trim(), price: parseFloat(s.price) || 0, payment: s.payment }));
        onAdd({ name: name.trim(), status, services: cleanedServices });
    }

    return (
        <div className="card form-card">
            <h3>Novo Lead</h3>
            <form onSubmit={submit} className="form">
                <label>Nome do lead</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="quente">Quente</option>
                    <option value="morno">Morno</option>
                    <option value="frio">Frio</option>
                </select>

                <fieldset className="services">
                    <legend>Serviços</legend>
                    {services.map((s, idx) => (
                        <div key={idx} className="service-row">
                            <input placeholder="Serviço" value={s.name} onChange={(e) => updateService(idx, "name", e.target.value)} />
                            <input placeholder="Valor" value={s.price} onChange={(e) => updateService(idx, "price", e.target.value)} />
                            <input placeholder="Forma de pagamento" value={s.payment} onChange={(e) => updateService(idx, "payment", e.target.value)} />
                            <button type="button" className="btn-ghost" onClick={() => removeService(idx)}>Excluir</button>
                        </div>
                    ))}
                    <button type="button" onClick={addService}>Adicionar serviço</button>
                </fieldset>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">Salvar Lead</button>
                    <button type="button" className="btn-ghost" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}
