import React from 'react';
import { backendActor } from "../../agent";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FaArrowRightLong } from "react-icons/fa6";
import './styles.scss';

const CreatePerson = () => {
// Definir el esquema de validación con yup
const schemaUserValidation = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  city: yup.string().required("La ciudad es obligatoria"),
  profileImage: yup
    .string()
    .url("Debes ingresar una URL válida")
    .required("La URL de la imagen es obligatoria"),
});
    // REACTT HOOK FORM SE ENCARGA DE LOS ESTADOS Y VALIDACIONES
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [city, setCity] = useState("");
  // const [profileImage, setProfileImage] = useState("");

  // Configuración de react-hook-form con yup
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaUserValidation), // Usar yup para validar
  });
// Manejo del envío del formulario
const onSubmit = async (data) => {
  try {
    // Llama al backend con los datos validados
    const response = await backendActor.createPersona(
      data.name,
      data.lastName,
      data.city,
      data.profileImage
    );
    // Manejo de respuesta del backend
    if (response === false) {
      alert(
        `Error: El usuario con nombre "${data.name}" y apellido "${data.lastName}" ya fue registrado anteriormente.`
      );
      return;
    }
    reset(); // Reiniciar el formulario tras el éxito
    alert("Persona creada exitosamente!");
  } catch (error) {
    console.error("Error al crear la persona:", error);
    alert("Hubo un error inesperado al crear la persona. Revisa la consola.");
  }
};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          {...register("name")} // Registra el campo para validar
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>} {/* Muestra el mensaje de error si no se cumple la validación */}
        <input
          type="text"
          placeholder="Apellido"
          onChange={(e) => setLastName(e.target.value)}
          {...register("lastName")}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        <input
          type="text"
          placeholder="Ciudad"
          onChange={(e) => setCity(e.target.value)}
          {...register("city")} 
        />
        {errors.city && <p className="error-message">{errors.city.message}</p>}
        <input
          type="text"
          placeholder="URL de la imagen de perfil"
          onChange={(e) => setProfileImage(e.target.value)}
          {...register("profileImage")}
        />
        {errors.profileImage && <p className="error-message">{errors.profileImage.message}</p>}
        <button type="submit" className="btn btn-outline-success">Enviar <FaArrowRightLong /> </button>
      </form>
    </>
  );
};

export default CreatePerson;