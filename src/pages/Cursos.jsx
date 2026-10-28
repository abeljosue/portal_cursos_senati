import "./Cursos.css";
import { useState } from "react";
import { useSearchParams } from "react-router";
import cursos from "../data/cursos";
import CursoCard from "../components/CursoCard";

function Cursos() {
  // Permite leer y modificar parámetros de la URL, como ?q=react.
  const [searchParams, setSearchParams] = useSearchParams();

  // Guarda el área seleccionada en el filtro.
  const [areaSeleccionada, setAreaSeleccionada] = useState("");

  // Guarda los IDs de los cursos marcados como favoritos.
  const [favoritos, setFavoritos] = useState([]);

  const [filtroHoras, setFiltroHoras] = useState("");

  // Obtiene el texto de búsqueda desde la URL.
  // Si no existe el parámetro q, utiliza una cadena vacía.
  const busqueda = searchParams.get("q") || "";

  // Obtiene las áreas sin repetirlas para llenar el selector.
  const areas = [...new Set(cursos.map((curso) => curso.area))];


  // Filtra los cursos según el texto de búsqueda y el área elegida.
  const cursosFiltrados = cursos.filter((curso) => {
    
    const texto = busqueda.toLowerCase().trim();// Convierte a minúsculas

    // Busca coincidencias en el nombre o la descripción del curso.
    const coincideBusqueda = curso.nombre.toLowerCase().includes(texto) || curso.descripcion.toLowerCase().includes(texto);

    // Si no se seleccionó un área, muestra cursos de todas las áreas.
    const coincideArea = areaSeleccionada === "" || curso.area === areaSeleccionada;

    const horas = Number(curso.horas);

    const coincideHoras =
      filtroHoras === "" ||
      (filtroHoras === "cortos" && horas <= 20) ||
      (filtroHoras === "medios" && horas > 20 && horas <= 50) ||
      (filtroHoras === "largos" && horas > 50);

    return coincideBusqueda && coincideArea && coincideHoras;
  });

  // Actualiza el parámetro q cuando se envía el formulario.
  function buscar(event) {
    event.preventDefault();

    const datos = new FormData(event.currentTarget);
    const q = datos.get("q").toString().trim();

    // Si hay texto, lo guarda en la URL; si no, limpia los parámetros.
    if (q) {
      setSearchParams({ q });
    } else {
      setSearchParams({});
    }
  }

  // Agrega o quita un curso de la lista de favoritos.
  function toggleFavorito(id) {
    setFavoritos((anteriores) => anteriores.includes(id) ? anteriores.filter((favorito) => favorito !== id) : [...anteriores, id]
    );
  }

  return (
    <main className="cursos-page">
      <h1>Catálogo de cursos</h1>
      <p>Encuentra el curso que mejor se adapte a tus intereses.</p>

      {/* Formulario de búsqueda */}
      <form onSubmit={buscar}>
        <label htmlFor="q">Buscar curso</label>
        <input id="q" name="q" type="search" placeholder="Escribe el nombre o descripción..." defaultValue={busqueda}/>
        <button type="submit">Buscar</button>
      </form>

      {/* Para filtrar los cursos por área */}
      <div>
        <label htmlFor="area">Filtrar por área</label>
        <select id="area" value={areaSeleccionada}onChange={(event) => setAreaSeleccionada(event.target.value)}>
          <option value="">Todas las áreas</option>

          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-horas">
        <label htmlFor="horas">Filtrar por duración</label>
        <select
          id="horas"
          value={filtroHoras}
          onChange={(event) => setFiltroHoras(event.target.value)}
        >
          <option value="">Todas las duraciones</option>
          <option value="cortos">Hasta 20 horas</option>
          <option value="medios">De 21 a 50 horas</option>
          <option value="largos">Más de 50 horas</option>
        </select>
      </div>

      {/* Muestra cuántos cursos coinciden con los filtros */}
      <p>Cursos encontrados: {cursosFiltrados.length}</p>

      {/* Muestra cuántos cursos se han marcado como favoritos */}
      <p>Favoritos seleccionados: {favoritos.length}</p>

      {/* Si hay resultados, muestra una tarjeta por cada curso */}
      {cursosFiltrados.length > 0 ? (
        <section className="cursos-lista">
          {cursosFiltrados.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              esFavorito={favoritos.includes(curso.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </section>
      ) : (
        <p>No se encontraron cursos con esos criterios.</p>
      )}
    </main>
  );
}

export default Cursos;