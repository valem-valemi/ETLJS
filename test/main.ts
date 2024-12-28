// export function add(a: number, b: number): number {
//   return a + b;
// }

import Task from "../lib/task.ts";
import {python} from "../mod.ts";

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }


// let mess = 'Hello world',
// colorFG = '\u001b[38;2;255;82;197;48;2;155;106;0m',
// resetFG = '\u001b[J';
// console.log(colorFG + mess + resetFG);

// const command = new Deno.Command("python.exe", {
//   // args: [
//   //  ".\\main.ps1"
//   // ],
//   stdin:"piped",
//   stdout:"piped"
// });

// const process = command.spawn();

// const result = await process.output();
// console.log(new TextDecoder().decode(result.stdout));

await python(`
print('Hola, Mundo!')
print('Hola, Mundo2!')
`);

// Task("hola").cwd()

