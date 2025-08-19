import { CompiledModule, Pointer } from "./types";

export class Demangler {
    private status: Pointer<number>;
    private buf: Pointer<string>;

    constructor(private MAX_SIZE: number, private m: CompiledModule) {
        this.status = this.m._malloc(4);
        this.buf = this.m._malloc(MAX_SIZE);
    }

    public demangle(str: string): string | null {
        this.m.stringToUTF8(str, this.buf, this.MAX_SIZE);

        const ret = this.m.___cxa_demangle(this.buf, 0, 0, this.status);
        let result: string | null = null;

        if (this.m.HEAP32[this.status >> 2] === 0 && ret) {
            result = this.m.UTF8ToString(ret);
            this.m._free(ret);
        }
        return result;
    }
}
