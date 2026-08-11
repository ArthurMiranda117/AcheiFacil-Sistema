import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarRetirada() {
    const { id } = useParams();
    const navigate = useNavigate();
    
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
        fetch("/api/editarRetirada/" + id)
            .then((res) => res.json())
            .then((data) => setInputs(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/atualizarRetirada/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs),
            });
            const data = await response.json();

            if (response.ok) {
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
            } else {
                setMensagemApi(data.message || "Erro ao atualizar.");
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
                <h1>Editar Retirada</h1>
                <form onSubmit={handleSubmit}>
                    <label>ID Item: </label>
                    <input type="number" name="item_ID" value={inputs.item_ID}
                        onChange={handleChange} placeholder="Digite o ID do item" required />
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
                    <button type="submit" className="BT">Alterar</button>
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