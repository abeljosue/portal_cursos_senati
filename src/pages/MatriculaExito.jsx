import "./MatriculaExito.css";
import { Link, Navigate, useLocation } from "react-router";
import cursos from "../data/cursos.js";

export default function MatriculaExito() {
  const location = useLocation();
  const valores = location.state;

  if (!valores) return <Navigate to="/matricula" replace />;

  const curso = cursos.find((item) => item.id === valores.curso);

  return (
    <section className="formulario-pagina matricula-exito-pagina">
      <div className="tarjeta formulario matricula-exito">
        <div className="encabezado-pagina exito-encabezado">
          <div className="exito-icono" aria-hidden="true">✓</div>
          <span className="sobrelinea">Matrícula confirmada</span>
          <h1>¡Gracias, {valores.nombre}!</h1>
          <p>Hemos recibido tus datos correctamente para el proceso de matrícula.</p>
        </div>

        <div className="resumen-matricula">
          <h2 className="resumen-titulo">Resumen de tu registro</h2>

          <div className="resumen-datos">
            <div className="resumen-fila">
              <strong>Postulante:</strong>
              <span>{valores.nombre}</span>
            </div>
            <div className="resumen-fila">
              <strong>DNI:</strong>
              <span>{valores.dni}</span>
            </div>
            <div className="resumen-fila">
              <strong>Correo:</strong>
              <span>{valores.email}</span>
            </div>
            <div className="resumen-fila">
              <strong>Celular:</strong>
              <span>{valores.telefono}</span>
            </div>
            <div className="resumen-fila">
              <strong>Curso seleccionado:</strong>
              <span>{curso?.nombre || valores.curso}</span>
            </div>
            <div className="resumen-fila">
              <strong>Turno elegido:</strong>
              <span>{valores.turno}</span>
            </div>
          </div>
        </div>

        <p className="nota-formulario exito-nota">
          Enviaremos toda la información detallada a <strong>{valores.email}</strong>.
        </p>

        <div className="exito-acciones">
          <Link className="boton boton-principal" to="/cursos">
            Volver a Cursos
          </Link>
          <Link className="boton boton-secundario" to="/">
            Ir al Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}