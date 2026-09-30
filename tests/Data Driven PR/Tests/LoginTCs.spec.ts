import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
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



test (`invalid login ${loginData.negativeLogin.username} ${loginData.negativeLogin.password}`, async({page}) => {
const login = new LoginPage(page);
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await login.filluseremail(loginData.negativeLogin.username);
await login.filluserpassword(loginData.negativeLogin.password);
await login.userclicklogin();
await expect (page.getByText("Incorrect email or password")).toBeVisible();
await page.screenshot({
    path: "tests/Data Driven PR/Screenshots/Negative Login.png" });

});


test (`valid login ${loginData.validLogin.username} ${loginData.validLogin.password}`, async({page}) => {
const login = new LoginPage(page);
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await login.filluseremail(loginData.validLogin.username);
await login.filluserpassword(loginData.validLogin.password);
await login.userclicklogin();
await expect (page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
await page.screenshot({
    path: "tests/Data Driven PR/Screenshots/Valid Login.png" });

});