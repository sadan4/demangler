declare class Demangler {
    private MAX_SIZE;
    private m;
    private status;
    private buf;
    constructor(MAX_SIZE: any, m: any);
    demangle(str: string): string | null;
}

export function makeDemangler(): Promise<Demangler>;