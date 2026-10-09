import {test, expect, type Page} from "@playwright/test"
import { RegisterPage } from "../Pages/Register"
import { LoginPage } from "../Pages/Login"
import { ProductsPage } from "../Pages/Products"
import { CheckoutPage } from "../Pages/Checkout"
import { CheckoutForm } from "../Pages/Cart"


test ("Placeordertest", async({page})=> {
const Register = new RegisterPage(page);
const Login = new LoginPage(page);
const Product = new ProductsPage(page);
const Checkout= new CheckoutPage(page);
const Checkoutform = new CheckoutForm(page);
const email = `fatema${Date.now()}@live.com`;
const password = "Test@12345";

await Register.OpenWebsite();
await Register.fillfirstname();
await Register.filllastname();
await Register.fillemail(email);
await Register.fillphone();
await Register.SelectOccupation.selectOption({ value: "3: Engineer" });
await Register.SelectGender.click();
await Register.SetPassword.fill(password);
await Register.confirmpassword.fill(password);
await Register.checkagebox();
await Register.clickregister();
await Register.clicklogin();


await Login.filluseremail(email);
await Login.filluserpassword(password);
await Login.userclicklogin();

await Product.AddProduct("ZARA COAT 3");
await Product.ClickOnCart();
await expect(Product.cartcount).toHaveText("1");

await Checkout.ClickCheckout();

await Checkoutform.SelectMonth("05");
await Checkoutform.SelectYear("31");
await Checkoutform.FillCvv("123");
await Checkoutform.FillNameOnCard("Fatema El Naggar");
await Checkoutform.Fillcoupon("fatma30");
await Checkoutform.ApplyCouponButton();
//await Checkoutform.SelectCountry("Egy", "Egypt");
await Checkoutform.SelectCountry("Egyp");
await Checkoutform.PlaceOrderButton();

await expect(
    page.getByText("Thankyou for the order.", { exact: true })
).toBeVisible();

await page.screenshot({
    path: "tests/AutoSuggestPR/ScreenShots/after-place-order.png",
    fullPage: true
});
});