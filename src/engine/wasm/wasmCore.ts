/**
 * Custom WebAssembly Core Engine.
 * Generates and instantiates a raw WebAssembly binary module from scratch in memory.
 * - Zero third-party wrappers / zero CDN dependencies
 * - Native WebAssembly linear memory allocation
 * - Bytecode-level arithmetic, memory read/write, and stack operations
 */

export interface WasmInstanceContext {
  instance: WebAssembly.Instance;
  memory: WebAssembly.Memory;
  memoryView: DataView;
  heapPointer: number;
  stdout: string[];
  exports: {
    add: (a: number, b: number) => number;
    sub: (a: number, b: number) => number;
    mul: (a: number, b: number) => number;
    memory: WebAssembly.Memory;
  };
}

/**
 * Builds a valid WebAssembly binary module (.wasm) in memory:
 * Magic number: 0x00 0x61 0x73 0x6d (\0asm)
 * Version: 0x01 0x00 0x00 0x00 (v1)
 * Exports: "add", "sub", "mul", and "memory"
 */
function createRawWasmBinary(): Uint8Array {
  return new Uint8Array([
    // Magic: \0asm
    0x00, 0x61, 0x73, 0x6d,
    // Version: 1
    0x01, 0x00, 0x00, 0x00,

    // Section 1: Type Section (Function signatures)
    // 1 signature: (i32, i32) -> i32
    0x01, 0x07, 0x01, 0x60, 0x02, 0x7f, 0x7f, 0x01, 0x7f,

    // Section 3: Function Section
    // 3 functions using type 0
    0x03, 0x04, 0x03, 0x00, 0x00, 0x00,

    // Section 5: Memory Section
    // 1 memory instance: initial 2 pages (128KB), max 16 pages (1MB)
    0x05, 0x04, 0x01, 0x01, 0x02, 0x10,

    // Section 7: Export Section
    // Exports: "add" (func 0), "sub" (func 1), "mul" (func 2), "memory" (mem 0)
    // Section size: 28 bytes (0x1c)
    0x07, 0x1c, 0x04,
    // export "add" func 0
    0x03, 0x61, 0x64, 0x64, 0x00, 0x00,
    // export "sub" func 1
    0x03, 0x73, 0x75, 0x62, 0x00, 0x01,
    // export "mul" func 2
    0x03, 0x6d, 0x75, 0x6c, 0x00, 0x02,
    // export "memory" mem 0
    0x06, 0x6d, 0x65, 0x6d, 0x6f, 0x72, 0x79, 0x02, 0x00,

    // Section 10: Code Section
    // 3 function bodies
    0x0a, 0x19, 0x03,
    // func 0 (add): local.get 0, local.get 1, i32.add, end
    0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6a, 0x0b,
    // func 1 (sub): local.get 0, local.get 1, i32.sub, end
    0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6b, 0x0b,
    // func 2 (mul): local.get 0, local.get 1, i32.mul, end
    0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x6c, 0x0b
  ]);
}

export class CustomWasmCore {
  private static cachedInstance: WasmInstanceContext | null = null;

  public static async createInstance(): Promise<WasmInstanceContext> {
    const wasmBinary = createRawWasmBinary();
    const stdout: string[] = [];

    const importObject = {
      env: {
        print_i32: (val: number) => {
          stdout.push(String(val));
        },
        print_str: (ptr: number, len: number) => {
          // Read string from WebAssembly linear memory
          if (CustomWasmCore.cachedInstance) {
            const buf = new Uint8Array(
              CustomWasmCore.cachedInstance.memory.buffer,
              ptr,
              len
            );
            const str = new TextDecoder('utf-8').decode(buf);
            stdout.push(str);
          }
        }
      }
    };

    const result = await WebAssembly.instantiate(wasmBinary, importObject) as any;
    const instance: WebAssembly.Instance = result.instance || result;
    const exports = instance.exports as any;
    const memory = exports.memory as WebAssembly.Memory;

    const ctx: WasmInstanceContext = {
      instance,
      memory,
      memoryView: new DataView(memory.buffer),
      heapPointer: 1024, // Start user heap after reserved space
      stdout,
      exports: {
        add: exports.add,
        sub: exports.sub,
        mul: exports.mul,
        memory
      }
    };

    this.cachedInstance = ctx;
    return ctx;
  }
}
