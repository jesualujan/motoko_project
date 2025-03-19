import React from "react";
import CreatePerson from "./Components/CreatePerson/CreatePerson";
import PersonasList from "./Components/PersonasList/PersonasList";
import UpdatedPerson from "./Components/UpdatedPerson/UpdatedPerson";


function App() {
 
  return (
    <>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <h1> Motoko Crud 🚀 </h1>
      <CreatePerson/>
      <PersonasList />
      <UpdatedPerson />
    </>
    
  );
}

export default App;
