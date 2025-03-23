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

  // Función para generar un ID único para cada persona.
  func generatePersonaId() : Text {
    personaId += 1;  // Incrementamos el contador de IDs.
    return Nat.toText(personaId);  // Convertimos el ID a texto para usarlo como clave.
  };

  // Función para validar si un usuario con el mismo name y lastName ya está registrado.
  func isUserRegistered(name: Text, lastName: Text) : Bool {
    let personaIter: Iter.Iter<(Text, Persona)> = personas.entries();  // Obtenemos todas las entradas del HashMap.
    for ((_, persona) in personaIter) {
      if (persona.name == name and persona.lastName == lastName) {
        return true;  // El usuario ya existe.
      }
    };
    return false;  // El usuario no existe.
  };

  // Función pública para registrar una nueva persona con validación.
  public func createPersona(name: Text, lastName: Text, city: Text, profileImage: Text) : async Bool {
    // Validar si el usuario ya está registrado.
    if (isUserRegistered(name, lastName)) {
        Debug.print("Error: Usuario con nombre '" # name # "' y apellido '" # lastName # "' ya registrado."); //Mensaje de error
        return false;  // Devuelve falso si el usuario ya existe.
    };

     // Crear y almacenar la nueva persona.
    let persona: Persona = { name; lastName; city; profileImage };  // Creamos la estructura Persona.
    let key = generatePersonaId();  // Generamos un ID único.
    personas.put(key, persona);  // Almacenamos la nueva persona en el HashMap.
    Debug.print("Persona creada exitosamente con ID: " # key);  // Mensaje de éxito.
    return true;  // Devuelve verdadero si la creación fue exitosa.
  };

  // Función query para consultar una persona específica por su ID.
  public query func getPersona(key: Text) : async ?Persona {
    return personas.get(key);  // Devolvemos la persona con el ID proporcionado.
  };

  // Función query para obtener todas las personas registradas.
  public query func getPersonas(): async [(Text, Persona)] {
    let personaIter: Iter.Iter<(Text, Persona)> = personas.entries();  // Obtenemos todas las entradas del HashMap.
    return Iter.toArray(personaIter);  // Convertimos el iterador en un array.
  };

  // Función para actualizar los datos de una persona.
  public func updatePersona(key: Text, newName: Text, newLastName: Text, newCity: Text, newProfileImage: Text) : async Bool {
    let persona: ?Persona = personas.get(key);  // Buscamos la persona con el ID proporcionado.

    switch (persona) {
      case (null) {
        Debug.print("Cannot find persona.");  // Mensaje de error.
        return false;  // Retornamos falso porque no se encontró la persona.
      };
      case (?_currentPersona) {
        // Creamos una nueva estructura con los datos actualizados.
        let updatedPersona: Persona = {
          name = newName;
          lastName = newLastName;
          city = newCity;
          profileImage = newProfileImage;
        };
        personas.put(key, updatedPersona);  // Actualizamos los datos en el HashMap.
        Debug.print("Persona actualizada exitosamente.");  // Mensaje de éxito.
        return true;  // Retornamos verdadero porque la persona fue actualizada.
      };
    };
  };

  // Función para eliminar una persona por su ID.
  public func deletePersona(key: Text) : async Bool {
    let persona: ?Persona = personas.get(key);  // Buscamos la persona con el ID proporcionado.

    switch (persona) {
      case (null) {
        Debug.print("Cannot find persona.");  // Mensaje de error.
        return false;  // Retornamos falso porque no se pudo encontrar la persona.
      };
      case (_) {
        ignore personas.remove(key);  // Eliminamos la persona del HashMap.
        Debug.print("Persona eliminada exitosamente.");  // Mensaje de éxito.
        return true;  // Retornamos verdadero porque la persona fue eliminada.
      };
    };
  };
};
