set -xe
tmpfile=$(mktemp)
echo '/* eslint-disable */' > $tmpfile
emcc \
    empty.cpp \
    -o src/wasm/compiled.cjs \
    -Oz \
    -flto \
    -s 'EXPORTED_FUNCTIONS=["___cxa_demangle", "_malloc", "_free"]' \
    -s FILESYSTEM=0 \
    -s MODULARIZE \
    -s 'EXPORTED_RUNTIME_METHODS=["stringToUTF8", "UTF8ToString", "HEAP32"]' \
    -s WASM=1 \
    -gsource-map=inline \
    -s STACK_SIZE=65536 \
    -s INITIAL_MEMORY=1048576
cat $tmpfile src/wasm/compiled.cjs > src/wasm/compiled.tmp.cjs
mv src/wasm/compiled.tmp.cjs src/wasm/compiled.cjs

tempPatchOutput=$(mktemp)
patchfile=./wasmFilePath.patch
patch src/wasm/compiled.cjs $patchfile -o $tempPatchOutput
mv $tempPatchOutput src/wasm/compiled.cjs

emcc \
    empty.cpp \
    -o src/js/compiled.cjs \
    -Oz \
    -flto \
    -s 'EXPORTED_FUNCTIONS=["___cxa_demangle", "_malloc", "_free"]' \
    -s FILESYSTEM=0 \
    -s 'EXPORTED_RUNTIME_METHODS=["stringToUTF8", "UTF8ToString", "HEAP32"]' \
    -s WASM=0 \
    -s MODULARIZE \
    -s STACK_SIZE=65536 \
    -s INITIAL_MEMORY=1048576

cat $tmpfile src/js/compiled.cjs > src/js/compiled.tmp.cjs
mv src/js/compiled.tmp.cjs src/js/compiled.cjs
