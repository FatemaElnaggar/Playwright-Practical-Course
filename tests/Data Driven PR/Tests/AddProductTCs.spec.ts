import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductsPage } from "../Pages/ProductsPage";
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

test(`Check invalidProduct ${loginData.invalidProduct.productName}`, async ({ page }) => {

    const login = new LoginPage(page);
    const AddProduct = new ProductsPage(page);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await login.filluseremail(loginData.validLogin.username);
    await login.filluserpassword(loginData.validLogin.password);
    await login.userclicklogin();

    const productName = loginData.invalidProduct.productName;
    const productFound = await AddProduct.isProductAvailable(productName);

    if (!productFound) {
        console.log(`Product "${productName}" is not available in the product list`);
    }

    expect(productFound).toBe(false);
});


test.only (`Add valid products`, async ({ page }) => {
    const login = new LoginPage(page);
    const AddProduct = new ProductsPage(page);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await login.filluseremail(loginData.validLogin.username);
    await login.filluserpassword(loginData.validLogin.password);
    await login.userclicklogin();

    for (const product of loginData.validProduct.productNames.slice(0, 2)) {
        await AddProduct.AddProduct(product);
    }

    await expect(AddProduct.cartcount).toHaveText("2");

    await AddProduct.carticon.screenshot({
    path: "tests/Data Driven PR/Screenshots/CorrectCartCount.png"
    });

});