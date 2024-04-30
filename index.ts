import RootService from "./src/root.service";
import dotenv from "dotenv";

dotenv.config();

const lets = new RootService();
lets.go();