import React, {useState} from "react";
import "../index.css";

export default function Register({onRegister}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return;
        onRegister?.(form);
        setForm({name: "", email: "", role: "", password: ""});
    };

    return (
        <div className="container">
            <div className="card center-card login-card">
                <h2 style={{margin: 0, color: "var(--accent)"}}>Cadastro</h2>
                <p style={{margin: 6, color: "var(--muted)"}}>
                    Preencha seus dados para criar acesso ao portal
                </p>

                <form className="form" onSubmit={submit} style={{width: "100%", maxWidth: 420}}>
                    <label>Nome completo</label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="Seu nome"
                    />

                    <label>Email corporativo</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="nome@empresa.com"
                    />

                    <label>Diretoria</label>
                    <select
                        value={form.role}
                        onChange={(e) => setForm({...form, role: e.target.value})}
                    >
                        <option value="">Selecione</option>
                        <option value="presidencia">Presidência</option>
                        <option value="vp">VP</option>
                        <option value="adm_fin">ADM Financeiro</option>
                        <option value="projetos">Projetos</option>
                        <option value="marketing">Marketing</option>
                        <option value="comercial">Comercial</option>
                    </select>

                    <label>Senha</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        placeholder="Crie uma senha"
                    />

                    <div style={{display: "flex", gap: 8, marginTop: 12}}>
                        <button className="btn-primary" type="submit">
                            Concluir cadastro
                        </button>
                        <button type="button" className="btn-ghost" onClick={onRegister}>
                            Voltar ao login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
