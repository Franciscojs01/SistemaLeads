import React, {useEffect, useMemo, useState} from "react";
import "../index.css";

const DEFAULT_COLUMNS = [
    {id: "novo", title: "Novo"},
    {id: "em_progresso", title: "Em Progresso"},
    {id: "concluido", title: "Concluído"},
];

const statusColor = (s) =>
    s === "quente"
        ? "rgba(255,88,88,0.12)"
        : s === "morno"
            ? "rgba(255,186,59,0.12)"
            : "rgba(102,126,234,0.08)";

export default function Board({
                                  sectorId = "geral",
                                  sectorTitle = "Quadro",
                                  initialLeads = [],
                                  onBack,
                                  onChange,
                                  sectors = [],
                              }) {
    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        status: "quente",
        service: "",
        payment: "",
        value: "",
        column: "novo",
    });

    const [columns, setColumns] = useState(DEFAULT_COLUMNS);
    const [newColName, setNewColName] = useState("");


    useEffect(() => {
        const normalized = (initialLeads || []).map((l) => ({
            ...l,
            sector: l.sector ?? sectorId,
            column: l.column || "novo",
            value: Number(l.value || 0),
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLeads(normalized);
    }, [initialLeads, sectorId]);


    const totalValue = useMemo(
        () => leads.reduce((s, l) => s + (Number(l.value) || 0), 0),
        [leads]
    );

    const addLead = (e) => {
        e?.preventDefault();
        if (!form.name.trim()) return;

        const newLead = {
            id: crypto?.randomUUID?.() ?? Date.now().toString(),
            name: form.name.trim(),
            status: form.status,
            service: form.service,
            payment: form.payment,
            value: Number(form.value || 0),
            column: form.column || "novo",
            sector: sectorId,
        };

        setLeads((prev) => [newLead, ...prev]);
        setForm({
            name: "",
            status: "quente",
            service: "",
            payment: "",
            value: "",
            column: "novo",
        });
        setShowForm(false);
    };

    const moveTo = (id, columnId) => {
        setLeads((prev) =>
            prev.map((l) => (l.id === id ? {...l, column: columnId} : l))
        );
    };

    const changeSector = (id, newSectorId) => {
        setLeads((prev) =>
            prev.map((l) => (l.id === id ? {...l, sector: newSectorId} : l))
        );
    };

    // Drag & drop
    const onDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
    };
    const onDragOver = (e) => e.preventDefault();
    const onDropTo = (e, columnId) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (!id) return;
        moveTo(id, columnId);
    };

    const addColumn = () => {
        const name = newColName.trim();
        if (!name) return;
        const id = name.toLowerCase().replace(/\s+/g, "_");
        if (columns.some((c) => c.id === id)) {
            setNewColName("");
            return;
        }
        setColumns((prev) => [...prev, {id, title: name}]);
        setNewColName("");
    };

    return (
        <div className="container">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                }}
            >
                <div>
                    <button className="btn-ghost" onClick={onBack}>
                        ← Voltar
                    </button>
                    <h2 style={{margin: "6px 0 0 8px"}}>{sectorTitle}</h2>
                    <div style={{color: "var(--muted)", fontSize: 13}}>
                        Quadro estilo Kanban — contexto: {sectorId}
                    </div>
                </div>

                <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                    <div className="total-badge">Total: R$ {totalValue.toFixed(2)}</div>
                    <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
                        {showForm ? "Fechar" : "Adicionar Lead"}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="card" style={{marginBottom: 12}}>
                    <form className="form" onSubmit={addLead}>
                        <label>Nome do Lead</label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                        />

                        <label>Status</label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({...form, status: e.target.value})}
                        >
                            <option value="quente">Quente</option>
                            <option value="morno">Morno</option>
                            <option value="frio">Frio</option>
                        </select>

                        <label>Serviço</label>
                        <input
                            value={form.service}
                            onChange={(e) => setForm({...form, service: e.target.value})}
                        />

                        <label>Forma de Pagamento</label>
                        <input
                            value={form.payment}
                            onChange={(e) => setForm({...form, payment: e.target.value})}
                        />

                        <label>Valor (R$)</label>
                        <input
                            value={form.value}
                            onChange={(e) => setForm({...form, value: e.target.value})}
                            type="number"
                            step="0.01"
                        />

                        <label>Coluna</label>
                        <select
                            value={form.column}
                            onChange={(e) => setForm({...form, column: e.target.value})}
                        >
                            {columns.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>

                        <div style={{display: "flex", gap: 8, marginTop: 8}}>
                            <button className="btn-primary" type="submit">
                                Adicionar
                            </button>
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={() => setShowForm(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{marginBottom: 12}}>
                <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                    <input
                        placeholder="Nova coluna"
                        value={newColName}
                        onChange={(e) => setNewColName(e.target.value)}
                    />
                    <button className="btn-primary" onClick={addColumn}>
                        Adicionar Coluna
                    </button>
                </div>
            </div>

            <div
                className="board"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                    gap: 12,
                }}
            >
                {columns.map((col) => {
                    const items = leads.filter((l) => l.column === col.id);
                    const colTotal = items.reduce((s, l) => s + (Number(l.value) || 0), 0);

                    return (
                        <div
                            key={col.id}
                            className="column card"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDropTo(e, col.id)}
                            style={{padding: 12, minHeight: 200}}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <h3 style={{margin: 0}}>{col.title}</h3>
                                <div style={{textAlign: "right", fontSize: 12, color: "var(--muted)"}}>
                                    <div>
                                        {items.length} {items.length === 1 ? "lead" : "leads"}
                                    </div>
                                    <div>R$ {colTotal.toFixed(2)}</div>
                                </div>
                            </div>

                            <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                {items.map((l) => (
                                    <div
                                        key={l.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, l.id)}
                                        className="lead-card"
                                        style={{
                                            padding: 10,
                                            borderRadius: 8,
                                            background: "#fff",
                                            boxShadow: "var(--shadow)",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <div style={{flex: 1, marginRight: 8}}>
                                            <div style={{fontWeight: 700}}>{l.name}</div>
                                            <div style={{color: "var(--muted)", fontSize: 13, marginTop: 6}}>
                                                {l.service || "—"} ·{" "}
                                                <span
                                                    style={{
                                                        background: statusColor(l.status),
                                                        padding: "2px 8px",
                                                        borderRadius: 999,
                                                        fontWeight: 600,
                                                    }}
                                                >
                          {l.status}
                        </span>{" "}
                                                · {l.payment || "—"}
                                            </div>

                                            <div style={{marginTop: 8}}>
                                                <label style={{fontSize: 12, color: "var(--muted)"}}>
                                                    Mover para setor
                                                </label>
                                                <div>
                                                    <select
                                                        value={l.sector || sectorId}
                                                        onChange={(e) => changeSector(l.id, e.target.value)}
                                                    >
                                                        <option value={sectorId}>{sectorTitle}</option>
                                                        {sectors.map((s) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{textAlign: "right", minWidth: 120}}>
                                            <div style={{fontWeight: 800}}>
                                                R$ {(Number(l.value) || 0).toFixed(2)}
                                            </div>

                                            <div style={{
                                                display: "flex",
                                                gap: 6,
                                                marginTop: 8,
                                                justifyContent: "flex-end"
                                            }}>
                                                <button
                                                    className="btn-ghost"
                                                    onClick={() => {
                                                        const idx = columns.findIndex((c) => c.id === l.column);
                                                        moveTo(l.id, columns[Math.max(0, idx - 1)].id);
                                                    }}
                                                    disabled={columns[0].id === l.column}
                                                >
                                                    ◀
                                                </button>

                                                <button
                                                    className="btn-ghost"
                                                    onClick={() => {
                                                        const idx = columns.findIndex((c) => c.id === l.column);
                                                        moveTo(l.id, columns[Math.min(columns.length - 1, idx + 1)].id);
                                                    }}
                                                    disabled={columns[columns.length - 1].id === l.column}
                                                >
                                                    ▶
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {items.length === 0 && (
                                    <div style={{color: "var(--muted)", fontSize: 13}}>
                                        Nenhum lead nesta coluna
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
