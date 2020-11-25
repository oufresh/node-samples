// index.mjs
//import { foo } from './foo.mjs';
import { generate } from "./worker/generator.mjs";

//console.log(foo()); // Hello foo!
/** ***********************/

console.log("Start worker!");
generate();
/************************ */