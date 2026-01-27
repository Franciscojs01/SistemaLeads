import React, { useEffect, useMemo, useState } from "react";
import "../index.css";

const statusColor = (s) =>
    s === "quente"
        ? "rgba(255,88,88,0.12)"
        : s === "morno"
            ? "rgba(255,186,59,0.12)"
            : "rgba(102,126,234,0.08)";

const DEFAULT_COLUMNS = [
    { id: "novo", title: "Novo" },
    { id: "em_progresso", title: "Em Progresso" },
    { id: "concluido", title: "Concluído" },
];

// Config central: labels + visibilidade + colunas por setor
const SECTOR_CONFIG = {
    marketing: {
        title: "Marketing",
        description: "Atração e qualificação de leads (topo de funil).",
        nameLabel: "Lead/Empresa",
        serviceLabel: "Área/Serviço de interesse",
        paymentLabel: "Origem do lead",
        showStatus: true,     // quente/morno/frio
        showValue: false,     // marketing geralmente não precisa valor
        columns: DEFAULT_COLUMNS,
    },

    comercial: {
        title: "Comercial Jurídico",
        description: "Pipeline de fechamento de contratos (advocacia).",
        nameLabel: "Cliente / Caso",
        serviceLabel: "Área do direito",
        paymentLabel: "Próximo passo / Observação",
        showStatus: false,    // NÃO é quente/morno/frio
        showValue: true,      // estimativa de honorários/contrato faz sentido
        columns: [
            { id: "primeiro_contato", title: "1º Contato" },
            { id: "triagem", title: "Triagem" },
            { id: "analise", title: "Análise do Caso" },
            { id: "proposta", title: "Proposta Enviada" },
            { id: "negociacao", title: "Negociação" },
            { id: "contrato", title: "Contrato Assinado" },
            { id: "perdido", title: "Perdido/Arquivado" },
        ],
    },

    presidencia: {
        title: "Presidência",
        description: "Demandas estratégicas, parcerias e decisões.",
        nameLabel: "Demanda estratégica",
        serviceLabel: "Parceiro / Frente",
        paymentLabel: "Tipo / Contexto",
        showStatus: false,
        showValue: false,
        columns: [
            { id: "entrada", title: "Entrada" },
            { id: "em_analise", title: "Em análise" },
            { id: "em_execucao", title: "Em execução" },
            { id: "concluido", title: "Concluído" },
        ],
    },

    projetos: {
        title: "Projetos",
        description: "Entregas e demandas por cliente (sem status/valor).",
        nameLabel: "Demanda do projeto",
        serviceLabel: "Cliente",
        paymentLabel: "Escopo/entrega",
        showStatus: false,
        showValue: false,
        columns: [
            { id: "planejamento", title: "Planejamento" },
            { id: "andamento", title: "Em andamento" },
            { id: "revisao", title: "Em revisão" },
            { id: "finalizado", title: "Finalizado" },
        ],
    },

    gestao_pessoas: {
        title: "Gestão de Pessoas",
        description: "1:1, onboarding, desempenho, trilhas e feedbacks.",
        nameLabel: "Pessoa / Tema",
        serviceLabel: "Categoria (1:1, onboarding, feedback...)",
        paymentLabel: "Responsável / Observação",
        showStatus: false,
        showValue: false,
        columns: [
            { id: "backlog", title: "Backlog" },
            { id: "agendado", title: "Agendado" },
            { id: "em_andamento", title: "Em andamento" },
            { id: "concluido", title: "Concluído" },
        ],
    },

    gestao_estrategias: {
        title: "Gestão de Estratégias",
        description: "OKRs, iniciativas, parcerias e metas (sem status/valor).",
        nameLabel: "Iniciativa",
        serviceLabel: "Objetivo",
        paymentLabel: "Impacto/Observação",
        showStatus: false,
        showValue: false,
        columns: [
            { id: "ideias", title: "Ideias" },
            { id: "analise", title: "Análise" },
            { id: "aprovado", title: "Aprovado" },
            { id: "execucao", title: "Em execução" },
            { id: "concluido", title: "Concluído" },
        ],
    },

    adm_fin: {
        title: "ADM Financeiro",
        description: "Pagamentos, recebimentos e controle de fluxo.",
        nameLabel: "Movimentação",
        serviceLabel: "Categoria financeira",
        paymentLabel: "Forma de pagamento",
        showStatus: false,
        showValue: true,
        columns: [
            { id: "previsto", title: "Previsto" },
            { id: "em_aberto", title: "Em aberto" },
            { id: "pago", title: "Pago" },
            { id: "atrasado", title: "Atrasado" },
        ],
    },

    geral: {
        title: "Quadro",
        description: "Acompanhe as atividades do setor.",
        nameLabel: "Título",
        serviceLabel: "Categoria",
        paymentLabel: "Detalhe",
        showStatus: false,
        showValue: false,
        columns: DEFAULT_COLUMNS,
    },
};

export default function Board({
                                  sectorId = "geral",
                                  sectorTitle = "Quadro",
                                  initialLeads = [],
                                  onBack,
                                  onChange,
                                  sectors = [],
                              }) {
    const sectorConfig = SECTOR_CONFIG[sectorId] || SECTOR_CONFIG.geral;

    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [columns, setColumns] = useState(sectorConfig.columns || DEFAULT_COLUMNS);
    const [newColName, setNewColName] = useState("");

    const [form, setForm] = useState({
        name: "",
        status: "quente",
        service: "",
        payment: "",
        value: "",
        column: (sectorConfig.columns?.[0]?.id || "novo"),
    });

    // quando trocar de setor, troca colunas e ajusta "column" default
    useEffect(() => {
        setColumns(sectorConfig.columns || DEFAULT_COLUMNS);
        setForm((prev) => ({
            ...prev,
            column: (sectorConfig.columns?.[0]?.id || "novo"),
            value: "",
            status: "quente",
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectorId]);

    // sincroniza os cards do setor vindo do App
    useEffect(() => {
        const normalized = (initialLeads || []).map((l) => ({
            ...l,
            sector: l.sector ?? sectorId,
            column: l.column || (sectorConfig.columns?.[0]?.id || "novo"),
            value: Number(l.value || 0),
        }));
        setLeads(normalized);
    }, [initialLeads, sectorId, sectorConfig.columns]);

    const commit = (updater) => {
        setLeads((prev) => {
            const next = typeof updater === "function" ? updater(prev) : updater;
            onChange?.(next);
            return next;
        });
    };

    const totalValue = useMemo(() => {
        if (!sectorConfig.showValue) return 0;
        return leads.reduce((s, l) => s + (Number(l.value) || 0), 0);
    }, [leads, sectorConfig.showValue]);

    const statusTotals = useMemo(() => {
        if (!sectorConfig.showStatus) return null;
        return leads.reduce(
            (acc, lead) => {
                const key = lead.status || "frio";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            },
            { quente: 0, morno: 0, frio: 0 }
        );
    }, [leads, sectorConfig.showStatus]);

    const addItem = (e) => {
        e?.preventDefault();
        if (!form.name.trim()) return;

        const newItem = {
            id:
                (globalThis.crypto && crypto.randomUUID && crypto.randomUUID()) ||
                `${Date.now()}_${Math.random().toString(16).slice(2)}`,
            name: form.name.trim(),
            status: sectorConfig.showStatus ? form.status : undefined,
            service: form.service,
            payment: form.payment,
            value: sectorConfig.showValue ? Number(form.value || 0) : 0,
            column: form.column || (columns[0]?.id || "novo"),
            sector: sectorId,
        };

        commit((prev) => [newItem, ...prev]);

        setForm({
            name: "",
            status: "quente",
            service: "",
            payment: "",
            value: "",
            column: (columns[0]?.id || "novo"),
        });
        setShowForm(false);
    };

    const moveTo = (id, columnId) => {
        commit((prev) => prev.map((l) => (l.id === id ? { ...l, column: columnId } : l)));
    };

    const changeSector = (id, newSectorId) => {
        commit((prev) => prev.map((l) => (l.id === id ? { ...l, sector: newSectorId } : l)));
    };

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
        setColumns((prev) => [...prev, { id, title: name }]);
        setNewColName("");
    };

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                    <button className="btn-ghost" onClick={onBack}>← Voltar</button>
                    <h2 style={{ margin: "6px 0 0 8px" }}>{sectorTitle}</h2>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>Quadro — contexto: {sectorId}</div>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {sectorConfig.showValue && <div className="total-badge">Total: R$ {totalValue.toFixed(2)}</div>}
                    <button className="btn-primary" onClick={() => setShowForm((s) => !s)}>
                        {showForm ? "Fechar" : "Adicionar"}
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginBottom: 12, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{sectorConfig.title}</h3>
                        <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>{sectorConfig.description}</p>
                    </div>

                    {sectorConfig.showStatus && statusTotals && (
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <div className="total-badge">Quentes: {statusTotals.quente}</div>
                            <div className="total-badge">Mornos: {statusTotals.morno}</div>
                            <div className="total-badge">Frios: {statusTotals.frio}</div>
                        </div>
                    )}
                </div>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: 12 }}>
                    <form className="form" onSubmit={addItem}>
                        <label>{sectorConfig.nameLabel}</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

                        {sectorConfig.showStatus && (
                            <>
                                <label>Status</label>
                                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                    <option value="quente">Quente</option>
                                    <option value="morno">Morno</option>
                                    <option value="frio">Frio</option>
                                </select>
                            </>
                        )}

                        <label>{sectorConfig.serviceLabel}</label>
                        <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />

                        <label>{sectorConfig.paymentLabel}</label>
                        <input value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })} />

                        {sectorConfig.showValue && (
                            <>
                                <label>Valor (R$)</label>
                                <input
                                    value={form.value}
                                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                                    type="number"
                                    step="0.01"
                                />
                            </>
                        )}

                        <label>Coluna</label>
                        <select value={form.column} onChange={(e) => setForm({ ...form, column: e.target.value })}>
                            {columns.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>

                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                            <button className="btn-primary" type="submit">Adicionar</button>
                            <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input placeholder="Nova coluna" value={newColName} onChange={(e) => setNewColName(e.target.value)} />
                    <button className="btn-primary" onClick={addColumn} type="button">Adicionar Coluna</button>
                </div>
            </div>

            <div className="board">
                {columns.map((col) => {
                    const items = leads.filter((l) => l.column === col.id);
                    const colTotal = sectorConfig.showValue
                        ? items.reduce((s, l) => s + (Number(l.value) || 0), 0)
                        : 0;

                    return (
                        <div
                            key={col.id}
                            className="column card"
                            onDragOver={onDragOver}
                            onDrop={(e) => onDropTo(e, col.id)}
                            style={{ padding: 12, minHeight: 200 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <h3 style={{ margin: 0 }}>{col.title}</h3>
                                <div style={{ textAlign: "right", fontSize: 12, color: "var(--muted)" }}>
                                    <div>{items.length} {items.length === 1 ? "item" : "itens"}</div>
                                    {sectorConfig.showValue && <div>R$ {colTotal.toFixed(2)}</div>}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                                        <div style={{ flex: 1, marginRight: 8 }}>
                                            <div style={{ fontWeight: 700 }}>{l.name}</div>

                                            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
                                                {l.service || "—"}
                                                {sectorConfig.showStatus && l.status && (
                                                    <>
                                                        {" "}·{" "}
                                                        <span
                                                            style={{
                                                                background: statusColor(l.status),
                                                                padding: "2px 8px",
                                                                borderRadius: 999,
                                                                fontWeight: 600,
                                                            }}
                                                        >
                              {l.status}
                            </span>
                                                    </>
                                                )}
                                                {" "}· {l.payment || "—"}
                                            </div>

                                            <div style={{ marginTop: 8 }}>
                                                <label style={{ fontSize: 12, color: "var(--muted)" }}>Mover para setor</label>
                                                <div>
                                                    <select value={l.sector || sectorId} onChange={(e) => changeSector(l.id, e.target.value)}>
                                                        <option value={sectorId}>{sectorTitle}</option>
                                                        {sectors.map((s) => (
                                                            <option key={s.id} value={s.id}>{s.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: "right", minWidth: 120 }}>
                                            {sectorConfig.showValue && (
                                                <div style={{ fontWeight: 800 }}>R$ {(Number(l.value) || 0).toFixed(2)}</div>
                                            )}

                                            <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                                                <button
                                                    className="btn-ghost"
                                                    type="button"
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
                                                    type="button"
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
                                    <div style={{ color: "var(--muted)", fontSize: 13 }}>Nenhum item nesta coluna</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
