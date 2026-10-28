import { Link, Navigate, useLocation } from "react-router";
import cursos from "../data/cursos.js";

export default function MatriculaExito() {
  const location = useLocation();
  const valores = location.state;

  if (!valores) return <Navigate to="/matricula" replace />;

  const curso = cursos.find((item) => item.id === valores.curso);

  return (
    <section className="formulario-pagina">
      <div className="tarjeta formulario">
        <div className="encabezado-pagina" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2rem", color: "#16a34a" }}>✓</div>
          <span className="sobrelinea">Matrícula confirmada</span>
          <h1>¡Gracias, {valores.nombre}!</h1>
          <p>Hemos recibido tus datos correctamente para el proceso de matrícula.</p>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "1rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem", textAlign: "left" }}>
            Resumen de tu registro
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Postulante:</strong>
              <span>{valores.nombre}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>DNI:</strong>
              <span>{valores.dni}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Correo:</strong>
              <span>{valores.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Celular:</strong>
              <span>{valores.telefono}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Curso seleccionado:</strong>
              <span>{curso?.nombre || valores.curso}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Turno elegido:</strong>
              <span>{valores.turno}</span>
            </div>
          </div>
        </div>

        <p className="nota-formulario" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Enviaremos toda la información detallada a <strong>{valores.email}</strong>.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link className="boton boton-principal" to="/cursos">
            Volver a Cursos
          </Link>
          <Link className="boton" to="/" style={{ background: "var(--code-bg)", color: "var(--text-h)" }}>
            Ir al Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}