import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductsPage } from "../Pages/ProductsPage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import fs from "fs";
import path from "path";

const jsonPath = path.join(
    process.cwd(),
    "tests",
    "Data Driven PR",
    "Test Data",
    "TestData.json"
);
console.log(jsonPath);
const loginData = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8")
);

test(`Complete Checkout`, async ({ page }) => {

    const login = new LoginPage(page);
    const AddProduct = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await login.filluseremail(loginData.validLogin.username);
    await login.filluserpassword(loginData.validLogin.password);
    await login.userclicklogin();

    await AddProduct.AddProduct(loginData.validProduct.productNames[0]);
    await AddProduct.ClickOnCart();
    await expect (page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/cart");

    await cart.ClickCheckout();
    
    await checkout.fillCreditcardNumber(loginData.checkout.cardNumber);
    await checkout.SelectMonth(loginData.checkout.expiryMonth);
    await checkout.SelectYear(loginData.checkout.expiryYear);
    await checkout.FillCvv(loginData.checkout.cvv);
    await checkout.FillNameOnCard(loginData.checkout.nameoncard);
    await checkout.Fillcoupon(loginData.checkout.coupon);
    await checkout.ApplyCouponButton();
    await expect(checkout.shippingemail).toHaveValue(loginData.validLogin.username);
    await checkout.SelectCountry(loginData.checkout.shippingCountry);
    await checkout.PlaceOrderButton();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    await page.screenshot({
    path: "tests/Data Driven PR/Screenshots/Complete Checkout.png"
});

});