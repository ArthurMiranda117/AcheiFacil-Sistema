import React, { useState, useEffect } from "react";
import ModalAviso from "../../assets/js/ModalAviso";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarItem() {
    const { id } = useParams();
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

    useEffect(() => {
        fetch("/api/editarItem/" + id)
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
            const response = await fetch("/api/atualizarItem/" + id, {
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
                <h1>Editar Item</h1>
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
                    <button type="submit" className="BT">Alterar</button>
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