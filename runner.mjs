import { WASI } from 'wasi';
import { argv, env } from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';

const wasi = new WASI({
  args: argv,
  env,
});

const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await readFile(new URL('./test-program/target/wasm32-wasi/debug/test-program-final.wasm', import.meta.url)),
);
const instance = await WebAssembly.instantiate(wasm, importObject);

try {
    wasi.start(instance);
} catch(err) {
    const image = new Uint8Array(instance.exports.memory.buffer);
    writeFile("coredump." + Date.now(), image);
}
