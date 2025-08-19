declare class Demangler {
    private MAX_SIZE;
    private m;
    private status;
    private buf;
    constructor(MAX_SIZE: any, m: any);
    demangle(str: string): string | null;
}

/**
 * @param maxSize the max size of string that the demangler can handle. Defaults to 1 << 11
 */
export function makeDemangler(maxSize?: number): Promise<Demangler>;
