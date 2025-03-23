import React, { useState } from "react";
import { backendActor } from "../../agent";
import { FaRegTrashAlt } from "react-icons/fa";
import './styles.scss';

const PersonasList = () => {
  const [personas, setPersonas] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  // Función para obtener la lista de personas desde el backend
  const fetchPersonas = async () => {
    try {
      const personasData = await backendActor.getPersonas(); // Llama al backend
      setPersonas(personasData); // Actualiza el estado con la lista de personas
      setMostrarLista(true); // Muestra la lista
    } catch (error) {
      console.error("Error al obtener la lista de personas:", error);
      alert("Hubo un error al obtener la lista. Revisa la consola.");
    }
  };

  // Función para ordenar las personas por su ID
  const getPersonsById = () => {
    const personasOrdenadas = [...personas].sort(([keyA], [keyB]) => {
      return parseInt(keyA) - parseInt(keyB); // Comparar numéricamente los IDs
    });
    setPersonas(personasOrdenadas); // Actualizar el estado con la lista ordenada
  };

  // Función para eliminar una persona
  const deletePersona = async (id) => {
    try {
      const success = await backendActor.deletePersona(id); // Llama al backend para eliminar la persona
      if (success) {
        setPersonas(personas.filter(([key]) => key !== id)); // Actualiza el estado local eliminando la persona
        alert(`Persona con ID ${id} eliminada exitosamente.`);
      } else {
        alert(`No se pudo eliminar la persona con ID ${id}.`);
      }
    } catch (error) {
      console.error("Error al eliminar la persona:", error);
      alert("Hubo un error al intentar eliminar la persona. Revisa la consola.");
    }
  };

  return (
    <>
      <h2>Lista de Personas</h2>
      <button onClick={getPersonsById} className="btn btn-outline-secondary">
        Ordenar por ID
      </button>
      <button onClick={fetchPersonas} className="btn btn-outline-primary">
        Mostrar Personas
      </button>
      {mostrarLista && (
        <table
          className="table table-striped-columns"
          border="2"
          style={{ marginTop: "10px", width: "100%", textAlign: "center" }}
        >
          <thead>
            <tr className="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Foto de Perfil</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map(([key, persona]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{persona.name}</td>
                <td>{persona.lastName}</td>
                <td>{persona.city}</td>
                <td>
                  <a
                    href={persona.profileImage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {persona.profileImage}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => deletePersona(key)}
                    className="btn btn-danger"
                  >
                    Eliminar
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PersonasList;
