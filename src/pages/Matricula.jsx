import { useMemo } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import { cursos } from "../data/cursos.js";

const esquema = Yup.object({
  nombre: Yup.string().trim().min(3, "Escribe al menos 3 letras").required("El nombre es obligatorio"),
  email: Yup.string().email("Correo no válido").required("El correo es obligatorio"),
  dni: Yup.string().matches(/^\d{8}$/, "El DNI tiene 8 dígitos").required("El DNI es obligatorio"),
  telefono: Yup.string()
    .matches(/^9\d{8}$/, "Celular de 9 dígitos que empiece con 9")
    .required("El celular es obligatorio"),
  curso: Yup.string()
    .oneOf(cursos.map((curso) => curso.id), "Elige un curso válido")
    .required("Elige un curso"),
  turno: Yup.string().oneOf(["Mañana", "Tarde", "Noche"]).required("Elige un turno"),
  acepta: Yup.boolean().oneOf([true], "Debes aceptar los términos"),
});

export default function Matricula() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cursoInicial = searchParams.get("curso") ?? "";
  const initialValues = useMemo(
    () => ({
      nombre: "",
      email: "",
      dni: "",
      telefono: "",
      curso: cursos.some((curso) => curso.id === cursoInicial) ? cursoInicial : "",
      turno: "",
      acepta: false,
    }),
    [cursoInicial],
  );

  return (
    <section className="formulario-pagina">
      <div className="encabezado-pagina">
        <span className="sobrelinea">Da el siguiente paso</span>
        <h1>Formulario de matrícula</h1>
        <p>Completa tus datos para reservar tu lugar.</p>
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={esquema}
        onSubmit={(valores) => navigate("/matricula/exito", { state: valores })}
      >
        {({ isSubmitting }) => (
          <Form className="tarjeta formulario">
            <div className="campos-dos">
              <label className="campo">
                Nombre completo
                <Field name="nombre" type="text" autoComplete="name" placeholder="Tu nombre" />
                <ErrorMessage className="error" component="span" name="nombre" />
              </label>
              <label className="campo">
                Correo electrónico
                <Field name="email" type="email" autoComplete="email" placeholder="tu@correo.com" />
                <ErrorMessage className="error" component="span" name="email" />
              </label>
              <label className="campo">
                DNI
                <Field name="dni" type="text" inputMode="numeric" maxLength="8" placeholder="8 dígitos" />
                <ErrorMessage className="error" component="span" name="dni" />
              </label>
              <label className="campo">
                Celular
                <Field name="telefono" type="tel" inputMode="numeric" maxLength="9" placeholder="9 dígitos" />
                <ErrorMessage className="error" component="span" name="telefono" />
              </label>
              <label className="campo">
                Curso
                <Field as="select" name="curso">
                  <option value="">Elige un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                  ))}
                </Field>
                <ErrorMessage className="error" component="span" name="curso" />
              </label>
              <fieldset className="campo campo-turno">
                <legend>Turno</legend>
                <div className="opciones-turno">
                  {["Mañana", "Tarde", "Noche"].map((turno) => (
                    <label className="opcion-radio" key={turno}>
                      <Field type="radio" name="turno" value={turno} />
                      {turno}
                    </label>
                  ))}
                </div>
                <ErrorMessage className="error" component="span" name="turno" />
              </fieldset>
            </div>
            <label className="opcion-check">
              <Field type="checkbox" name="acepta" />
              Acepto los términos de matrícula.
            </label>
            <ErrorMessage className="error error-check" component="span" name="acepta" />
            <button className="boton boton-principal boton-enviar" disabled={isSubmitting} type="submit">
              Enviar matrícula
            </button>
            <p className="nota-formulario">¿Tienes dudas? <Link to="/contacto">Contáctanos</Link></p>
          </Form>
        )}
      </Formik>
    </section>
  );
}
