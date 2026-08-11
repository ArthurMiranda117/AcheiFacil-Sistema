import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function CadastroRetirada() {
    const navigate = useNavigate();
    const [listaItens, setListaItens] = useState([]);
    const [inputs, setInputs] = useState({
        item_ID: "",
        nome_retirada: "",
        cpf_retirada: "",
        data_retirada: "",
        atendente: "",
    });
    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");

    useEffect(() => {
        fetch("/api/listaItem")
            .then((res) => res.json())
            .then((dados) => {
                if (Array.isArray(dados)) {
                    setListaItens(dados.filter((item) => item.status !== "retirado"));
                }
            })
            .catch((error) => console.error("Erro ao carregar itens:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resposta = await fetch("/api/cadastroRetirada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
                setInputs({ item_ID: "", nome_retirada: "", cpf_retirada: "", data_retirada: "", atendente: "" });
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
                <h1>Cadastro de Retirada</h1>
                <br /><br />
                <form onSubmit={handleSubmit}>
                    <label>Item: </label>
                    <select name="item_ID" value={inputs.item_ID} onChange={handleChange} required>
                        <option value="">Selecione um item</option>
                        {listaItens.map((item) => (
                            <option key={item.ID_itens} value={item.ID_itens}>
                                {item.categoria} - {item.descricao}
                            </option>
                        ))}
                    </select>
                    <br /><br />
                    <label>Nome: </label>
                    <input type="text" name="nome_retirada" value={inputs.nome_retirada}
                        onChange={handleChange} placeholder="Digite o nome" required />
                    <br /><br />
                    <label>CPF: </label>
                    <input type="text" name="cpf_retirada" value={inputs.cpf_retirada}
                        onChange={handleChange} placeholder="Digite o CPF" required />
                    <br /><br />
                    <label>Data: </label>
                    <input type="date" name="data_retirada" value={inputs.data_retirada}
                        onChange={handleChange} required />
                    <br /><br />
                    <label>Atendente: </label>
                    <input type="text" name="atendente" value={inputs.atendente}
                        onChange={handleChange} placeholder="Digite o nome do atendente" required />
                    <br /><br />
                    <button type="submit" className="BT">Enviar</button>
                    <button type="button" className="BT" style={{ marginLeft: "16px" }} onClick={() => navigate("/Retiradas")}>
                        Cancelar
                    </button>
                </form>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => {
                    setModalAviso(false);
                    navigate("/Retiradas");
                }}
                message={mensagemApi}
            />
        </>
    );
}