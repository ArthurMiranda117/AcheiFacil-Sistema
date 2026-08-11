import React, { useState } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function CadastroItem() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        categoria: "",
        descricao: "",
        cor_item: "",
        data_achado: "",
        local_achado: "",
    });
    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch("/api/cadastroItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
                setInputs({ categoria: "", descricao: "", cor_item: "", data_achado: "", local_achado: "" });
            } else {
                setMensagemApi(data.message || "Erro ao cadastrar.");
                setModalAviso(true);
            }
        } catch (error) {
            console.error("Erro:", error);
            setMensagemApi("Erro ao conectar com o servidor.");
            setModalAviso(true);
        }
    };

    return (
        <>
        <title>AcheiFacil</title>
            <section id="body">
                <h1>Cadastro de Item</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <label>Categoria: </label>
                    <input type="text" name="categoria" value={inputs.categoria}
                        onChange={handleChange} placeholder="Digite a categoria" required />
                    <br /><br />
                    <label>Descrição: </label>
                    <input type="text" name="descricao" value={inputs.descricao}
                        onChange={handleChange} placeholder="Digite a descrição" required />
                    <br /><br />
                    <label>Cor: </label>
                    <input type="text" name="cor_item" value={inputs.cor_item}
                        onChange={handleChange} placeholder="Digite a cor" required />
                    <br /><br />
                    <label>Data: </label>
                    <input type="date" name="data_achado" value={inputs.data_achado}
                        onChange={handleChange} required />
                    <br /><br />
                    <label>Local: </label>
                    <input type="text" name="local_achado" value={inputs.local_achado}
                        onChange={handleChange} placeholder="Digite o local" required />
                    <br /><br />
                    <button type="submit" className="BT">Enviar</button>
                    <button type="button" className="BT" style={{ marginLeft: "16px" }} onClick={() => navigate("/Itens")}>
                        Cancelar
                    </button>
                </form>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => {
                    setModalAviso(false);
                    navigate("/Itens");
                }}
                message={mensagemApi}
            />
        </>
    );
}