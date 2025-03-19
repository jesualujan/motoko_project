import React, { useEffect, useState } from "react";
import { backendActor } from "../../agent";

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
   <button onClick={ getPersonsById}>Ordenar por ID</button>
   <button onClick={fetchPersonas}>Mostrar Lista de Personas</button> {/* Botón para obtener la lista */}
   {mostrarLista && (
        <ul>
          {personas.map(([key, persona]) => (
            <li key={key}>
              <p>ID: {key}</p>
              <p>Nombre: {persona.name}</p>
              <p>
                Foto de perfil:{" "}
                <a
                  href={persona.profileImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {persona.profileImage}
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
   </>
  )
}

export default PersonasList