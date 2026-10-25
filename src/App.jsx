import { useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import CursoCard from "./components/CursoCard.jsx";
import Layout from "./components/Layout.jsx";
import cursos from "./data/cursos.js";

function Inicio() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>Portal de Cursos</h1>
      <p>Encuentra el curso técnico que necesitas y matricúlate en línea.</p>
      <button type="button" onClick={() => navigate("/cursos")}>
        Ver cursos
      </button>
    </section>
  );
}

function Cursos() {
  const [favoritos, setFavoritos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const consulta = searchParams.get("q") ?? "";
  const cursosFiltrados = cursos.filter((curso) => {
    const texto = `${curso.nombre} ${curso.area} ${curso.descripcion}`.toLowerCase();
    return texto.includes(consulta.toLowerCase());
  });

  const buscar = (event) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const texto = datos.get("q").trim();
    setSearchParams(texto ? { q: texto } : {});
  };

  const alternarFavorito = (id) => {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favoritoId) => favoritoId !== id)
        : [...actuales, id],
    );
  };

  return (
    <section>
      <h1>Catálogo de cursos</h1>

      <p aria-live="polite">Favoritos: {favoritos.length}</p>

      <form onSubmit={buscar}>
        <label htmlFor="buscar-curso">Buscar curso</label>{" "}
        <input
          id="buscar-curso"
          name="q"
          type="search"
          defaultValue={consulta}
        />{" "}
        <button type="submit">Buscar</button>
      </form>

      <div>
        {cursosFiltrados.map((curso) => (
          <CursoCard
            key={curso.id}
            curso={curso}
            esFavorito={favoritos.includes(curso.id)}
            onToggleFavorito={alternarFavorito}
          />
        ))}
      </div>

      {cursosFiltrados.length === 0 && <p>No encontramos cursos.</p>}
    </section>
  );
}

function CursoDetalle() {
  const { id } = useParams();
  const curso = cursos.find((item) => item.id === id);

  if (!curso) {
    return (
      <section>
        <h1>Curso no encontrado</h1>
        <Link to="/cursos">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <article>
      <h1>{curso.nombre}</h1>
      <p>{curso.descripcion}</p>
      <p>
        <strong>Área:</strong> {curso.area}
      </p>
      <p>
        <strong>Horas:</strong> {curso.horas}
      </p>
      <p>
        <strong>Modalidad:</strong> {curso.modalidad}
      </p>
      <h2>Temario</h2>
      <ul>
        {curso.temario.map((tema) => (
          <li key={tema}>{tema}</li>
        ))}
      </ul>
      <Link to={`/matricula?curso=${curso.id}`}>Matricularme</Link>
    </article>
  );
}

function Matricula() {
  const [searchParams] = useSearchParams();
  const cursoSeleccionado = cursos.find(
    (curso) => curso.id === searchParams.get("curso"),
  );

  return (
    <section>
      <h1>Formulario de matrícula</h1>
      <p>La validación con Formik y Yup se implementará en la siguiente fase.</p>
      {cursoSeleccionado && <p>Curso seleccionado: {cursoSeleccionado.nombre}</p>}
    </section>
  );
}

function MatriculaExito() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/matricula" replace />;
  }

  return (
    <section>
      <h1>Matrícula enviada</h1>
      <p>Tu solicitud de matrícula fue registrada correctamente.</p>
      <Link to="/cursos">Volver al catálogo</Link>
    </section>
  );
}

function Contacto() {
  return (
    <section>
      <h1>Contacto</h1>
      <p>El formulario de contacto se implementará en la siguiente fase.</p>
    </section>
  );
}

function NoEncontrada() {
  const location = useLocation();

  return (
    <section>
      <h1>Página no encontrada</h1>
      <p>La ruta {location.pathname} no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

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
