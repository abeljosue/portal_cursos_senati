import "./CursoDetalle.css";
import { Link, useNavigate, useParams } from "react-router";
import cursos from "../data/cursos";

function CursoDetalle() {
  // Obtiene el parámetro :id de la ruta /cursos/:id.
  // Por ejemplo, en /cursos/2, id será el texto "2".
  const { id } = useParams();

  // Permite navegar mediante código, por ejemplo, para volver atrás.
  const navigate = useNavigate();

  // Busca el curso cuyo ID coincide con el parámetro de la URL.
  // La comparación es entre textos porque los IDs de cursos son strings.
  const curso = cursos.find((c) => c.id === id);

  // Si el ID no existe, muestra un mensaje en lugar de romper la pantalla.
  if (!curso) {
    return (
      <main>
        <h1>Curso no encontrado</h1>
        <p>El curso que buscas no existe.</p>

        <button type="button" onClick={() => navigate(-1)}>Volver</button>

        {/* Permite ir directamente al catálogo */}
        <p><Link to="/cursos">Ver todos los cursos</Link></p>
      </main>
    );
  }

  // Si el curso existe, muestra toda su información.
  return (
    <main>
      <button type="button" onClick={() => navigate(-1)}>Volver</button>

      <article className="curso-detalle">
        {/* Área y nombre del curso */}
        <p>{curso.area}</p>
        <h1>{curso.nombre}</h1>

        {/* Descripción del curso */}
        <p>{curso.descripcion}</p>

        {/* Duración y modalidad */}
        <dl>
          <div>
            <dt>Duración</dt>
            <dd>{curso.horas} horas</dd>
          </div>

          <div>
            <dt>Modalidad</dt>
            <dd>{curso.modalidad}</dd>
          </div>
        </dl>

        {/* Lista de temas que se estudiarán en el curso */}
        <section>
          <h2>Temario del curso</h2>

          <ul>
            {curso.temario.map((tema, indice) => (<li key={indice}>{tema}</li>))}
          </ul>
        </section>

        {/* Abre la matrícula enviando el ID del curso por la URL.
            Ejemplo: /matricula?curso=2 */}
        <button type="button" onClick={() => navigate(`/matricula?curso=${curso.id}`)}>Matricularme</button>

        <p><Link to="/cursos">Ver todos los cursos</Link></p>
      </article>
    </main>
  );
}

export default CursoDetalle;
