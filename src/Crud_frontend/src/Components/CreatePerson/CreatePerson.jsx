import React, { useState } from 'react';
import { backendActor } from "../../agent";
import { FaArrowRightLong } from "react-icons/fa6";
import './styles.scss';

const CreatePerson = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llama al backend con los nuevos campos.
      await backendActor.createPersona(name, lastName, city, profileImage);
      setName("");
      setLastName("");
      setCity("");
      setProfileImage("");
      alert("Persona creada exitosamente!");
    } catch (error) {
      console.error("Error al crear la persona:", error);
      alert("Hubo un error al crear la persona. Revisa la consola.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de la imagen de perfil"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        <button type="submit" className="btn btn-outline-success">Enviar <FaArrowRightLong /> </button>
      </form>
    </>
  );
};

export default CreatePerson;
