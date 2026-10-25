import { Route, Routes } from "react-router";
import Contacto from "./pages/Contacto.jsx";
import CursoDetalle from "./pages/CursoDetalle.jsx";
import Cursos from "./pages/Cursos.jsx";
import Inicio from "./pages/Inicio.jsx";
import Layout from "./components/Layout.jsx";
import Matricula from "./pages/Matricula.jsx";
import MatriculaExito from "./pages/MatriculaExito.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="cursos/:id" element={<CursoDetalle />} />
        <Route path="matricula" element={<Matricula />} />
        <Route path="matricula/exito" element={<MatriculaExito />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
