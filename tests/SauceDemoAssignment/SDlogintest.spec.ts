import {test, expect, type Page} from "@playwright/test";
import { SDloginpage } from "./SDloginpage";
import { Homepage } from "./SDhomepage";
test.use({ launchOptions: { slowMo: 800 } });

test ("validlogin",async({page}) => {

 const login=new SDloginpage(page);
 const assert=new Homepage (page);

 await login.open ();
 await login.userlogin();

  await expect (assert.pageTitle).toHaveText("Products");


});