import mod from "./compiled.cjs";
import { Demangler } from "../wrapper";

export const demangler = new Demangler((globalThis as any).DEMANGLER_MAX_SIZE as any ?? (1 << 14), mod);
