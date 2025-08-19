set -ex
rm -rf dist
# esbuild --bundle src/js/index.ts --external:fs --platform=node --format=esm --outfile=dist/js/index.mjs
esbuild --bundle src/js/index.ts --external:fs --platform=node --format=cjs --outfile=dist/js/index.js
esbuild --bundle src/wasm/index.ts --external:fs --platform=node --format=cjs --outfile=dist/wasm/index.js
# cp dist/js/index.js dist/js/index.cjs
cp src/wasm/compiled.wasm dist/wasm/compiled.wasm
cp src/wasm/compiled.wasm.map dist/wasm/compiled.wasm.map

# copy type definitions
cp ./index.d.ts dist/wasm/index.d.ts
cp ./index.d.ts dist/js/index.d.ts