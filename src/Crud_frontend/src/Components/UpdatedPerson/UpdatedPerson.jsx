import React, { useState } from 'react';
import { backendActor } from "../../agent";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './styles.scss';

const UpdatedPerson = () => {
  const [searchName, setSearchName] = useState(""); // Para buscar por nombre
  const [persona, setPersona] = useState(null); // Persona encontrada
 
  // Esquema de validación con yup
  const schemaUpdatedValidation = yup.object().shape({
    newName: yup.string().required("El nuevo nombre es obligatorio"),
    newLastName: yup.string().required("El nuevo apellido es obligatorio"),
    newCity: yup.string().required("La nueva ciudad es obligatoria"),
    newProfileImage: yup
      .string()
      .url("Debes ingresar una URL válida")
      .required("La URL de la imagen es obligatoria"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schemaUpdatedValidation), // Usar yup para validar
  });

  // Funcion para buscar una persona por nombre   
  const handleSearch = async () => {
    try {
      const personas = await backendActor.getPersonas(); // Obtén todas las personas
      const foundPersona = personas.find(([_, p]) => p.name === searchName); // Busca por nombre
      if (foundPersona) {
        setPersona({ id: foundPersona[0], ...foundPersona[1] }); // Guarda el resultado
        alert("Persona encontrada.");
      } else {
        alert("No se encontró ninguna persona con ese nombre.");
        setPersona(null);
      }
    } catch (error) {
      console.error("Error al buscar la persona:", error);
      alert("Hubo un error al buscar la persona. Revisa la consola.");
    }
  };

  // Función para actualizar la información de la persona
  const handleUpdate = async (data) => {
    if (!persona) {
      alert("Debes buscar y seleccionar una persona antes de actualizar.");
      return;
    }
    try {
      const success = await backendActor.updatePersona(
        persona.id,
        data.newName,
        data.newLastName,
        data.newCity,
        data.newProfileImage
      );
      if (success === true) {
        alert("Persona actualizada exitosamente.");
        setPersona(null); // Reinicia el estado de la persona
        reset(); // Reinicia el formulario
      } else if (success === false) {
        alert(
           `Error: El usuario con el nombre "${data.newName}" y el apellido "${data.newLastName}" ya existe. No se puede actualizar.`
        );
        return;
      }
    } catch (error) {
      console.error("Error al actualizar la persona:", error);
      alert("Hubo un error al actualizar la persona. Revisa la consola.");
    }
  };

  return (
    <>
      <h2>Actualizar Persona</h2>
      {/* Buscador */}
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar <IoSearchSharp /> </button>
      </div>

      {persona && (
        <form onSubmit={handleSubmit(handleUpdate)}>
          <h3>Persona encontrada: {persona.name}</h3>
          <input
           type="text"
           placeholder="Nuevo nombre"
           {...register("newName")} // Registrar el campo
          />
          {errors.newName && (
              <p className="error-message">{errors.newName.message}</p>
            )}
          <input
           type="text"
           placeholder="Nuevo apellido"
           {...register("newLastName")}
          />
          {errors.newLastName && (
              <p className="error-message">{errors.newLastName.message}</p>
            )}
          <input
            type="text"
            placeholder="Nueva ciudad"
            onChange={(e) => setNewCity(e.target.value)}
            {...register("newCity")}
          />
          {errors.newCity && (
              <p className="error-message">{errors.newCity.message}</p>
            )}
          <input
            type="text"
            placeholder="Nueva URL de imagen de perfil"
            onChange={(e) => setNewProfileImage(e.target.value)}
            {...register("newProfileImage")}
          />
          {errors.newProfileImage && (
              <p className="error-message">{errors.newProfileImage.message}</p>
            )}
          <button type="submit">Enviar <FaArrowRightLong /> </button>
        </form>
      )}
    </>
  );
};

export default UpdatedPerson;
