export type Pointer<_T> = number;

export type NullablePointer<T> = Pointer<T> | 0;

export interface CompiledModule {
    UTF8ToString(str: Pointer<string>, maxBytesToRead?: number, ignoreNull?: boolean): string;
    stringToUTF8(str: string, outPtr: Pointer<string>, maxBytesToWrite: number): void;
    _malloc(size: number): Pointer<any>;
    _free(ptr: Pointer<any>): void;
    ___cxa_demangle(
        mangledName: Pointer<string>,
        outputBuffer: NullablePointer<string>,
        outputBufferSize: NullablePointer<number>,
        status: Pointer<number>
    ): Pointer<string>;
    HEAP32: Int32Array;
}
