import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/Crud_backend"; // Ajusta la ruta según tu proyecto

// Configura el agente con la dirección de tu servidor local
const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });
agent.fetchRootKey(); // Necesario en modo local

// Obtén el ID de tu canister local
const canisterId = "be2us-64aaa-aaaaa-qaabq-cai";

// Crea un actor para interactuar con el backend
export const backendActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
