import "./Matricula.css";
import { useMemo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import cursos  from "../data/cursos.js";

const esquemaMatricula = Yup.object().shape({
  nombre: Yup.string().trim().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingresa un correo electrónico válido")
    .required("El correo es obligatorio"),
  dni: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos")
    .required("El DNI es obligatorio"),
  telefono: Yup.string()
    .matches(/^\d{9}$/, "El celular debe tener exactamente 9 dígitos")
    .required("El celular es obligatorio"),
  curso: Yup.string().required("Elige un curso"),
  turno: Yup.string().required("Selecciona un turno"),
  terminos: Yup.boolean().oneOf(
    [true],
    "Debes aceptar los términos para continuar"
  ),
});

export default function Matricula() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cursoParam = searchParams.get("curso") || "";

  const initialValues = useMemo(
    () => ({
      nombre: "",
      email: "",
      dni: "",
      telefono: "",
      curso: cursoParam,
      turno: "Mañana",
      terminos: false,
    }),
    [cursoParam]
  );

  const handleSubmit = (valores) => {
    navigate("/matricula/exito", { state: valores });
  };

  return (
    <section className="formulario-pagina">
      <div className="tarjeta formulario">
        <div className="encabezado-pagina">
          <span className="sobrelinea">Da el siguiente paso</span>
          <h1>Formulario de matrícula</h1>
          <p>Completa tus datos para reservar tu lugar.</p>
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={esquemaMatricula}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="campos-dos">
                <div className="campo">
                  <label htmlFor="nombre">Nombre completo</label>
                  <Field
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                  />
                  <ErrorMessage name="nombre" component="span" className="error" />
                </div>

                <div className="campo">
                  <label htmlFor="email">Correo electrónico</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                  />
                  <ErrorMessage name="email" component="span" className="error" />
                </div>

                <div className="campo">
                  <label htmlFor="dni">DNI</label>
                  <Field
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="8 dígitos"
                  />
                  <ErrorMessage name="dni" component="span" className="error" />
                </div>

                <div className="campo">
                  <label htmlFor="telefono">Celular</label>
                  <Field
                    id="telefono"
                    name="telefono"
                    type="text"
                    placeholder="9 dígitos"
                  />
                  <ErrorMessage name="telefono" component="span" className="error" />
                </div>

                <div className="campo">
                  <label htmlFor="curso">Curso</label>
                  <Field id="curso" name="curso" as="select">
                    <option value="">Elige un curso</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre || c.titulo}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="curso" component="span" className="error" />
                </div>

                <div className="campo-turno">
                  <label>Turno</label>
                  <div className="opciones-turno">
                    <label className="opcion-radio">
                      <Field type="radio" name="turno" value="Mañana" />
                      Mañana
                    </label>
                    <label className="opcion-radio">
                      <Field type="radio" name="turno" value="Tarde" />
                      Tarde
                    </label>
                    <label className="opcion-radio">
                      <Field type="radio" name="turno" value="Noche" />
                      Noche
                    </label>
                  </div>
                  <ErrorMessage name="turno" component="span" className="error" />
                </div>
              </div>

              <div className="campo" style={{ marginTop: "1.25rem" }}>
                <label className="opcion-check">
                  <Field type="checkbox" name="terminos" />
                  Acepto los términos de matrícula.
                </label>
                <ErrorMessage name="terminos" component="span" className="error" />
              </div>

              <button
                type="submit"
                className="boton boton-principal boton-enviar"
                disabled={isSubmitting}
              >
                Enviar matrícula
              </button>

              <p className="nota-formulario" style={{ marginTop: "1rem", textAlign: "center" }}>
                ¿Tienes dudas? <Link to="/contacto">Contáctanos</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}