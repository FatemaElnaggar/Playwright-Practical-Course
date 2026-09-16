import {test, expect, type Page} from "@playwright/test"
import { SLbasepage } from "./SLbasepage"
import { SLregister } from "./SLregisterpage"
import { SLproductpage } from "./SLproductpage"
test.use({ launchOptions: { slowMo: 800 } });


test ("checkoutcount", async ({page})=> {
const Reg = new SLregister(page);
const product = new SLproductpage (page);

await Reg.openSL();
await Reg.submit();
await product.addtocart();

await expect (product.checkout).toContainText("2");
console.log ("checkoutdone");


});