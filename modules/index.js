// index.mjs
//import { foo } from './foo.mjs';
import { createService } from "./src/service/service.js";
import { generateAsync } from "./src/worker/generator.js";

//console.log(foo()); // Hello foo!
/** ***********************/


async function test() {
  try {
  console.log("Start worker!");
    const nums = await generateAsync();
    console.log(nums);
  } catch(e) {
  console.error(e);
}
}
console.log("Starting 1 async...");
test();
console.log("Starting 2 async...");
test();
const myService = createService();
if (myService.isSecret('My best guess')) {
    console.log("That's it!");
  }
/************************ */
