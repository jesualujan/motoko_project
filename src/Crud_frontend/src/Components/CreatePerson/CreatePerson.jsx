import React, {useState} from 'react';
import { backendActor } from "../../agent";
import './styles.scss'


const CreatePerson = () => {
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await backendActor.createPersona(name, profileImage);
        setName("");
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
        placeholder="URL de la imagen de perfil"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
      />
      <button type="submit" class="btn btn-outline-success">Crear Persona</button>
    </form>
    </>
  
  );
};

export default CreatePerson;
