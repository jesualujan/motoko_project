import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor {
  // Definimos la estructura de una persona.
  // Una persona tiene un nombre y una foto de perfil (URL de la imagen).
  type Persona = {
    name: Text;    // Nombre de la persona
    profileImage: Text;  // URL de la foto de perfil de la persona.
  };

  var personaId: Nat = 0;  // Inicializamos el contador de identificadores de personas (de tipo Nat, que es un número natural).
  
  // Creamos un HashMap para almacenar las personas.
  // La clave es el ID de la persona (de tipo Text), y el valor es la estructura Persona.
  let personas = HashMap.HashMap<Text, Persona>(0, Text.equal, Text.hash);

  // Función privada para generar un ID único para cada persona.
  private func generatePersonaId() : Text {
    personaId += 1;  // Incrementamos el contador de IDs.
    return Nat.toText(personaId);  // Convertimos el ID a texto para usarlo como clave.
  };

  // Función pública para registrar una nueva persona.
  public func createPersona(name: Text, profileImage: Text) {
    let persona: Persona = { name; profileImage };  // Creamos un objeto persona con el nombre y la foto de perfil.
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

  // Función para actualizar los datos de una persona (nombre o foto de perfil).
  public func updatePersona(key: Text, newName: Text, newProfileImage: Text) : async Bool {
    let persona: ?Persona = personas.get(key);  // Buscamos la persona con el ID proporcionado.

    switch (persona) {
      case (null) {  // Si no encontramos la persona.
        Debug.print("Cannot find persona.");  // Imprimimos un mensaje de error.
        return false;  // Retornamos falso porque no se encontró la persona.
      };
         case (?_currentPersona) {  // Si encontramos la persona.
          // Creamos una nueva persona con los nuevos datos.
          let updatedPersona: Persona = {
        name = newName;
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

    switch(persona) {
      case (null) {  // Si no encontramos la persona.
        Debug.print("Cannot find persona.");  // Imprimimos un mensaje de error.
        return false;  // Retornamos falso porque no se pudo encontrar la persona.
      };
      case (_) {  // Si encontramos la persona.
        ignore personas.remove(key);  // Eliminamos la persona del HashMap.
        Debug.print("Persona deleted successfully.");  // Imprimimos un mensaje de éxito.
        return true;  // Retornamos verdadero porque la persona fue eliminada.
      };
    };
  };
};