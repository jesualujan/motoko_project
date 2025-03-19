import React, {useState} from 'react';
import { backendActor } from "../../agent";
import './styles.scss'


const UpdatedPerson = () => {
    const [searchName, setSearchName] = useState(""); // Para buscar por nombre
    const [persona, setPersona] = useState(null); // Persona encontrada
    const [newName, setNewName] = useState("");
    const [newProfileImage, setNewProfileImage] = useState("");

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!persona) {
      alert("Debes buscar y seleccionar una persona antes de actualizar.");
      return;
    }

    try {
      const success = await backendActor.updatePersona(persona.id, newName, newProfileImage);
      if (success) {
        alert("Persona actualizada exitosamente.");
        setPersona(null); // Reinicia el formulario
        setNewName("");
        setNewProfileImage("");
      } else {
        alert("Error al actualizar la persona.");
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
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {persona && (
        <form onSubmit={handleUpdate}>
          <h3>Persona encontrada: {persona.name}</h3>
          <input
            type="text"
            placeholder="Nuevo nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nueva URL de imagen de perfil"
            value={newProfileImage}
            onChange={(e) => setNewProfileImage(e.target.value)}
          />
          <button type="submit">Actualizar Persona</button>
        </form>
      )}
    </>
  )
}

export default UpdatedPerson