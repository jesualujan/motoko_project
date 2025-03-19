import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/Crud_backend"; // Ajusta la ruta según tu proyecto
import canisterIds from "../../../.dfx/local/";   // Archivo generado automáticamente

// Configura el agente con la dirección de tu servidor local
const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

// Obtén el ID de tu canister local
const canisterId = canisterIds.motoko_project.local;

// Crea un actor para interactuar con el backend
export const backendActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
