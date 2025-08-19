import mod from "./compiled.cjs";
import { CompiledModule } from "../types";
import { Demangler } from "../wrapper";

export const makeDemangler = async (maxSize = 1 << 14) => new Demangler(
    maxSize,
    await mod() as CompiledModule,
);
