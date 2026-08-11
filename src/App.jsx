import { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Itens from './pages/item/listagem_item';
import CadastroItem from './pages/item/cadastro_item';
import EditarItem from './pages/item/editar_item';
import Retiradas from './pages/retirada/listagem_retirada';
import CadastroRetirada from './pages/retirada/cadastro_retirada';
import EditarRetirada from './pages/retirada/editar_retirada';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <ul className="nav-links">
          <img src="imagens/AFW.png" alt="Logo do Site" className='imagem' width="100" height="30" /><p></p>
          <li><Link to="/Home" className="btn">Home</Link></li>
          <li><Link to="/Itens" className="btn">Achados</Link></li>
          <li><Link to="/Retiradas" className="btn">Retiradas</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Itens" element={<Itens />}/>
        <Route path="/CadastroItem" element={<CadastroItem />}/>
        <Route path="/EditarItem/:id" element={<EditarItem/>}/>
        <Route path="/Retiradas" element={<Retiradas />}/>
        <Route path="/CadastroRetirada" element={<CadastroRetirada />}/>
        <Route path="/EditarRetirada/:id" element={<EditarRetirada/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;