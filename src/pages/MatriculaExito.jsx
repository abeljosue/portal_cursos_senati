import "./MatriculaExito.css";
import { Link, Navigate, useLocation } from "react-router";
import cursos from "../data/cursos.js";

export default function MatriculaExito() {
  const location = useLocation();
  const valores = location.state;

  if (!valores) return <Navigate to="/matricula" replace />;

  const curso = cursos.find((item) => item.id === valores.curso);
  const fechaRegistro = new Date(valores.fechaRegistro);
  const fechaFormateada = new Intl.DateTimeFormat("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(fechaRegistro);

  return (
    <section className="formulario-pagina matricula-exito-pagina">
      <div className="tarjeta formulario matricula-exito">
        <div className="encabezado-pagina exito-encabezado">
          <div className="exito-icono" aria-hidden="true">✓</div>
          <span className="sobrelinea">Registro completado</span>
          <h1>¡Matrícula registrada correctamente!</h1>
          <p>Hemos recibido tus datos para el proceso de matrícula.</p>
        </div>

        <div className="resumen-matricula">
          <h2 className="resumen-titulo">Detalle de matrícula</h2>

          <div className="resumen-datos">
            <div className="resumen-fila">
              <strong>Código de registro:</strong>
              <span>{valores.codigoRegistro}</span>
            </div>
            <div className="resumen-fila">
              <strong>Estado:</strong>
              <span><span className="estado-matricula">Registrada</span></span>
            </div>
            <div className="resumen-fila">
              <strong>Estudiante:</strong>
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
              <strong>Curso:</strong>
              <span>{curso?.nombre || valores.curso}</span>
            </div>
            <div className="resumen-fila">
              <strong>Turno:</strong>
              <span>{valores.turno}</span>
            </div>
            <div className="resumen-fila">
              <strong>Fecha de registro:</strong>
              <span>{fechaFormateada}</span>
            </div>
          </div>
        </div>

        <p className="nota-formulario exito-nota">
          Comprobante de registro
        </p>

        <div className="exito-acciones">
          <button
            className="boton boton-principal"
            type="button"
            onClick={() => window.print()}
          >
            Descargar constancia PDF
          </button>
          <Link className="boton boton-principal" to="/cursos">
            Ir al Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}