set -xe
tmpfile=$(mktemp)
echo '/* eslint-disable */' > $tmpfile
emcc \
    empty.cpp \
    -o src/wasm/compiled.js \
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
cat $tmpfile src/wasm/compiled.js > src/wasm/compiled.tmp.js
mv src/wasm/compiled.tmp.js src/wasm/compiled.js

emcc \
    empty.cpp \
    -o src/js/compiled.js \
    -Oz \
    -flto \
    -s 'EXPORTED_FUNCTIONS=["___cxa_demangle", "_malloc", "_free"]' \
    -s FILESYSTEM=0 \
    -s 'EXPORTED_RUNTIME_METHODS=["stringToUTF8", "UTF8ToString", "HEAP32"]' \
    -s WASM=0 \
    -s STACK_SIZE=65536 \
    -s INITIAL_MEMORY=1048576

cat $tmpfile src/js/compiled.js > src/js/compiled.tmp.js
mv src/js/compiled.tmp.js src/js/compiled.js
