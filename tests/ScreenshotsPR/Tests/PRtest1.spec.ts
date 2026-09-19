import {test, expect, type Page} from "@playwright/test"
import { PRhome } from "../Pages/PRhomepage";
import { Registerpage } from "../Pages/PRregisterpage";
import { Loginpage } from "../Pages/PRloginpage";
import { Addtocart } from "../Pages/PRaddtocart";
import { Gocheckout } from "../Pages/PRgocheckout";
import { Checkform } from "../Pages/PRcheckform";
test.use({ launchOptions: { slowMo: 800 } });



test("Register, Login, Add to Cart and Checkout", async ({ page }) => {

    const home = new PRhome(page);
    const register = new Registerpage(page);
    const login = new Loginpage(page);
    const cart = new Addtocart(page);
    const checkout = new Gocheckout(page);
    const checkform = new Checkform(page);

    const email = `fatema${Date.now()}@live.com`;
    const password = "Test@12345";

    await home.openhome();

    await home.regbutton.click();

    await register.regfilling(email, password);

    await login.userlogin(email, password);

    await cart.additem();

    await checkout.gocheckout();

    await checkform.fillcheckout(email);

});