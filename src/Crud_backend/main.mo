import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
  // Actualizamos la estructura Persona para incluir los nuevos atributos.
  type Persona = {
    name: Text;         // Nombre de la persona.
    lastName: Text;     // Apellido de la persona.
    city: Text;         // Ciudad de residencia.
    profileImage: Text; // URL de la foto de perfil de la persona.
  };

  var personaId: Nat = 0;  // Inicializamos el contador de identificadores de personas.

  // Creamos un HashMap para almacenar las personas.
  let personas = HashMap.HashMap<Text, Persona>(0, Text.equal, Text.hash);

  // Función privada para generar un ID único para cada persona.
  private func generatePersonaId() : Text {
    personaId += 1;  // Incrementamos el contador de IDs.
    return Nat.toText(personaId);  // Convertimos el ID a texto para usarlo como clave.
  };

  // Función pública para registrar una nueva persona.
  public func createPersona(name: Text, lastName: Text, city: Text, profileImage: Text) {
    let persona: Persona = { name; lastName; city; profileImage };  // Creamos un objeto Persona con los nuevos atributos.
    let key = generatePersonaId();  // Generamos un ID único para la persona.
    personas.put(key, persona);  // Almacenamos la persona en el HashMap.
    Debug.print("Persona successfully created with ID: " # key);  // Imprimimos un mensaje de éxito con el ID de la persona.
  };

  // Función query para consultar una persona específica por su ID.
  public query func getPersona(key: Text) : async ?Persona {
    return personas.get(key);  // Devolvemos la persona con el ID proporcionado.
  };

  // Función query para obtener todas las personas registradas.
  public query func getPersonas(): async [(Text, Persona)] {
    let personaIter: Iter.Iter<(Text, Persona)> = personas.entries();  // Obtenemos un iterador de todas las entradas del HashMap.
    return Iter.toArray(personaIter);  // Convertimos el iterador en un array de tuplas (ID, Persona).
  };

  // Función para actualizar los datos de una persona.
  public func updatePersona(key: Text, newName: Text, newLastName: Text, newCity: Text, newProfileImage: Text) : async Bool {
    let persona: ?Persona = personas.get(key);  // Buscamos la persona con el ID proporcionado.

    switch (persona) {
      case (null) {
        Debug.print("Cannot find persona.");  // Imprimimos un mensaje de error.
        return false;  // Retornamos falso porque no se encontró la persona.
      };
      case (?_currentPersona) {
        // Creamos una nueva persona con los nuevos datos.
        let updatedPersona: Persona = {
          name = newName;
          lastName = newLastName;
          city = newCity;
          profileImage = newProfileImage;
        };
        personas.put(key, updatedPersona);  // Reemplazamos los datos de la persona en el HashMap.
        Debug.print("Persona updated successfully.");  // Imprimimos un mensaje de éxito.
        return true;  // Retornamos verdadero porque la persona fue actualizada.
      };
    };
  };

  // Función para eliminar una persona por su ID.
  public func deletePersona(key: Text) : async Bool {
    let persona: ?Persona = personas.get(key);  // Buscamos la persona con el ID proporcionado.

    switch (persona) {
      case (null) {
        Debug.print("Cannot find persona.");  // Imprimimos un mensaje de error.
        return false;  // Retornamos falso porque no se pudo encontrar la persona.
      };
      case (_) {
        ignore personas.remove(key);  // Eliminamos la persona del HashMap.
        Debug.print("Persona deleted successfully.");  // Imprimimos un mensaje de éxito.
        return true;  // Retornamos verdadero porque la persona fue eliminada.
      };
    };
  };
};
