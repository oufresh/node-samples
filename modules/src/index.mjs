// index.mjs
//import { foo } from './foo.mjs';
import { createService } from "./service/service.mjs";
import { generateAsync } from "./worker/generator.mjs";

//console.log(foo()); // Hello foo!
/** ***********************/

console.log("Start worker!");
async function test() {
    const nums = await generateAsync();
    console.log(nums);
}
test();
const myService = createService();
if (myService.isSecret('My best guess')) {
    console.log("That's it!");
  }
/************************ */