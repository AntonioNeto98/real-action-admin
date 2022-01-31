import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Eventos from "./screens/Eventos";
import NovoEvento from "./screens/NovoEvento";
import Home from './screens/Home';
import NovoProduto from "./screens/NovoProduto";
import Produtos from './screens/Produtos';
import EditarProduto from "./screens/EditarProduto";

export default () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/produtos" exact element={<Produtos />} />
          <Route path="/produtos/novo" exact element={<NovoProduto />} />
          <Route path="/produtos/editar=:id" exact element={<EditarProduto />} />
          <Route path="/eventos" exact element={<Eventos />} />
          <Route path="/eventos/novo" exact element={<NovoEvento />} />
        </Routes>
      </Router>
    </div>
  );
}