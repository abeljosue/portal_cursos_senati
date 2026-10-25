import { Link } from "react-router";

function CursoCard({ curso, esFavorito = false, onToggleFavorito }) {
  const { id, nombre, area, descripcion, horas, modalidad } = curso;

  return (
    <article className="curso-card">
      <header>
        <p>{area}</p>
        <h2>
          <Link to={`/cursos/${id}`}>{nombre}</Link>
        </h2>
      </header>

      <p>{descripcion}</p>

      <dl>
        <div>
          <dt>Horas</dt>
          <dd>{horas}</dd>
        </div>
        <div>
          <dt>Modalidad</dt>
          <dd>{modalidad}</dd>
        </div>
      </dl>

      <div>
        <Link to={`/cursos/${id}`}>Ver detalle</Link>

        {onToggleFavorito && (
          <button
            type="button"
            aria-pressed={esFavorito}
            aria-label={`${esFavorito ? "Quitar" : "Agregar"} ${nombre} ${
              esFavorito ? "de favoritos" : "a favoritos"
            }`}
            onClick={() => onToggleFavorito(id)}
          >
            {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        )}
      </div>
    </article>
  );
}

export default CursoCard;
