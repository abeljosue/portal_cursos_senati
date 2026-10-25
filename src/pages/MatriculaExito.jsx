import { Link, Navigate, useLocation } from "react-router";
import { cursos } from "../data/cursos.js";

export default function MatriculaExito() {
  const location = useLocation();
  const valores = location.state;

  if (!valores) return <Navigate to="/matricula" replace />;

  const curso = cursos.find((item) => item.id === valores.curso);

  return (
    <section className="confirmacion">
      <div className="confirmacion-icono" aria-hidden="true">✓</div>
      <span className="sobrelinea">Matrícula enviada</span>
      <h1>¡Gracias, {valores.nombre}!</h1>
      <p>Recibimos tu solicitud para el curso <strong>{curso?.nombre}</strong>, turno {valores.turno}.</p>
      <p>Enviaremos la información a {valores.email}.</p>
      <Link className="boton boton-principal" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
