set -ex
rm -rf dist
# esbuild --bundle src/js/index.ts --external:fs --platform=node --format=esm --outfile=dist/js/index.mjs
esbuild --bundle src/js/index.ts --external:fs --platform=node --format=cjs --outfile=js/index.js
esbuild --bundle src/wasm/index.ts --external:fs --platform=node --format=cjs --outfile=wasm/index.js
# cp dist/js/index.js dist/js/index.cjs
cp src/wasm/compiled.wasm wasm/compiled.wasm
cp src/wasm/compiled.wasm.map wasm/compiled.wasm.map

# copy type definitions
cp ./index.d.ts wasm/index.d.ts
cp ./index.d.ts js/index.d.ts
