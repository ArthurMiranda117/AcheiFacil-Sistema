import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ModalAviso from "../../assets/js/ModalAviso";
import ModalConfirmacao from "../../assets/js/ModalConfirmacao";
import { format } from "date-fns";

export default function Retiradas() {
    const [listaRetirada, setListaRetirada] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        try {
            const resposta = await fetch("/api/listaRetirada");
            const texto = await resposta.text();
            const dados = JSON.parse(texto);

            if (Array.isArray(dados)) {
                setListaRetirada(dados);
            } else if (dados && Array.isArray(dados.retirada)) {
                setListaRetirada(dados.retirada);
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

    const abriConfirmacao = (id) => {
        setIdDeletar(id);
        setModalConfirmacao(true);
    };

    const confirmaExclusao = async () => {
        try {
            const resposta = await fetch("/api/excluiRetirada/" + idDeletar, {
                method: "DELETE",
            });
            const data = await resposta.json();

            if (resposta.ok) {
                setListaRetirada(
                    listaRetirada.filter((item) => item.ID_retirada !== idDeletar)
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
                    <h1>Listagem de Retiradas</h1>
                    <button onClick={() => navigate("/CadastroRetirada")}>
                        + Novo Cadastro
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan="2">Item ID</th>
                                <th rowSpan="2">Nome </th>
                                <th rowSpan="2">CPF</th>
                                <th rowSpan="2">Data</th>
                                <th rowSpan="2">Atendente</th>
                                <th colSpan="2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaRetirada.length > 0 ? (
                                listaRetirada.map((res) => (
                                    <tr key={res.ID_retirada}>
                                        <td>{res.item_ID}</td>
                                        <td>{res.nome_retirada}</td>
                                        <td>{res.cpf_retirada}</td>
                                        <td>{format(res.data_retirada, "dd/MM/yyyy")}</td>
                                        <td>{res.atendente}</td>
                                        <td>
                                            <button onClick={() => navigate("/EditarRetirada/" + res.ID_retirada)}>
                                                Editar
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => abriConfirmacao(res.ID_retirada)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Nenhuma retirada encontrada.</td>
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