import React, { useState } from "react";
import { backendActor } from "../../agent";
import './styles.scss'

const PersonasList = () => {
    // Estado para almacenar la lista de personas
  const [personas, setPersonas] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false); // Controla si la lista debe mostrarse
 
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

      // Función para ordernar las personas por su ID
      const getPersonsById = () => {
        const personasOrdenadas = [...personas].sort(([keyA], [keyB]) => {
            return parseInt(keyA) - parseInt(keyB); // Comparar numéricamente los IDs
        });
        setPersonas(personasOrdenadas); // Actualizar el estado con la lista ordenada
      }

  return (
   <>
   <h2>Lista de Personas</h2>
   <button onClick={ getPersonsById} class="btn btn-outline-secondary"> Ordenar por ID</button>
   <button onClick={fetchPersonas} class="btn btn-outline-primary">Mostrar Personas</button> {/* Botón para obtener la lista */}
   {mostrarLista && (
        <table  class="table table-striped-columns" border="2" style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
        <thead>
          <tr class="table-secondary">
            <th scope="row">ID</th>
            <th scope="row">Nombre</th>
            <th scope="row">Foto de Perfil</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(([key, persona]) => (
            <tr key={key}>
              <td>ID: {key}</td>
              <td>Nombre: {persona.name}</td>
              <td>
                Foto de perfil:{" "}
                <a
                  href={persona.profileImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {persona.profileImage}
                </a>
              </td>
            </tr>
          ))}
          </tbody>
          </table>
      )}
   </>
  )
}

export default PersonasList