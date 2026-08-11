import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <title>AcheiFacil</title>
            <center>
                <p></p>
                <form>
                <center>
                <img src="imagens/AcheiFacilW.png" alt="Logo do Site" className='imagem' width="300" height="200" />
                <h3>Gerenciador de Achados & Perdidos</h3>
                <h6>Entre na listagem de Achados ↓</h6>
                <button onClick={() => navigate("/Itens")}>
                    ENTRAR
                </button>
                </center>
                </form>
                <p></p>
            </center>
        </>
    );
}