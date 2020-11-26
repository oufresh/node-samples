// index.mjs
//import { foo } from './foo.mjs';
import { generateAsync } from "./worker/generator.mjs";

//console.log(foo()); // Hello foo!
/** ***********************/

console.log("Start worker!");
async function test() {
    const nums = await generateAsync();
    console.log(nums);
}
test();
/************************ */