import mod from "./compiled.cjs";
import { CompiledModule } from "../types";
import { Demangler } from "../wrapper";

export const makeDemangler = async (wasmFilePath = undefined, maxSize = 1 << 11) => new Demangler(
    maxSize,
    await mod(wasmFilePath) as CompiledModule,
);
