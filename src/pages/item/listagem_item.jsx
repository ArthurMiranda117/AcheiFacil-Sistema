import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalAviso from "../../assets/js/ModalAviso";
import ModalConfirmacao from "../../assets/js/ModalConfirmacao";
import { format } from "date-fns";

export default function Itens() {
    const [listaItem, setListaItem] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        try {
            const resposta = await fetch("/api/listaItem");
            const texto = await resposta.text();
            const dados = JSON.parse(texto);

            if (Array.isArray(dados)) {
                setListaItem(dados);
            } else if (dados && Array.isArray(dados.itens)) {
                setListaItem(dados.itens);
            } else {
                console.error("Formato inesperado:", dados);
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.key]);

    const [modalAviso, setModalAviso] = useState(false);
    const [mensagemApi, setMensagemApi] = useState("");
    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [idDeletar, setIdDeletar] = useState(null);
    const dataFormatada = format(new Date(), "dd/MM/yyyy");

    const abriConfirmacao = (id) => {
        setIdDeletar(id);
        setModalConfirmacao(true);
    };

    const confirmaExclusao = async () => {
        try {
            const resposta = await fetch("/api/excluiItem/" + idDeletar, {
                method: "DELETE",
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setListaItem(
                    listaItem.filter((item) => item.ID_itens !== idDeletar)
                );
                setMensagemApi(data.message || "Ação concluída!");
                setModalAviso(true);
            } else {
                setMensagemApi(data.message || "Ação não realizada.");
                setModalAviso(true);
            }
        } catch (error) {
            console.error("Erro: ", error);
            setMensagemApi("Erro ao conectar com o servidor.");
            setModalAviso(true);
        } finally {
            setModalConfirmacao(false);
            setIdDeletar(null);
        }
    };

    return (
        <>
        <title>AcheiFacil</title>
            <section id="body">
                <div className="tabela">
                    <h1>Listagem de Achados</h1>
                    <button onClick={() => navigate("/CadastroItem")}>
                        + Novo Cadastro
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan="2">Categoria</th>
                                <th rowSpan="2">Descrição</th>
                                <th rowSpan="2">Cor</th>
                                <th rowSpan="2">Data</th>
                                <th rowSpan="2">Local</th>
                                <th rowSpan="2">Status</th>
                                <th colSpan="2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaItem.length > 0 ? (
                                listaItem.map((res) => (
                                    <tr key={res.ID_itens}>
                                        <td>{res.categoria}</td>
                                        <td>{res.descricao}</td>
                                        <td>{res.cor_item}</td>
                                        <td>{format(res.data_achado, "dd/MM/yyyy")}</td>
                                        <td>{res.local_achado}</td>
                                        <td>{res.status}</td>
                                        <td>
                                            <button onClick={() => navigate("/EditarItem/" + res.ID_itens)} alt='EDITAR'>
                                                Editar
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => abriConfirmacao(res.ID_itens)} alt='EXCLUIR'>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Nenhum item encontrado.</td>
                                    
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <ModalAviso
                isOpen={modalAviso}
                onClose={() => setModalAviso(false)}
                message={mensagemApi}
            />
            <ModalConfirmacao
                isOpen={modalConfirmacao}
                onClose={() => setModalConfirmacao(false)}
                onConfirm={confirmaExclusao}
            />
        </>
    );
}