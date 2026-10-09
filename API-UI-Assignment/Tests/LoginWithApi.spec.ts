import { test, expect } from "@playwright/test";
import { AuthApi } from "../API/AuthApi";
import fs from "fs";
import path from "path";

const jsonPath = path.join(
    process.cwd(),
    "API-UI-Assignment",
    "Test-Data",
    "TestData.json"
);

const testData = JSON.parse(
    fs.readFileSync(jsonPath, "utf-8")
);

test("Invalid Login1 - Wrong Username", async () => {
    const authApi = await AuthApi.createRequest();

    const response = await authApi.login({
        userEmail: testData.invalidLogins[0].username,
        userPassword: testData.invalidLogins[0].password
    });

    expect(response.ok()).toBeFalsy();

    await authApi.dispose();
});

test("Invalid Login2 - Wrong Password", async () => {
    const authApi = await AuthApi.createRequest();

    const response = await authApi.login({
        userEmail: testData.invalidLogins[1].username,
        userPassword: testData.invalidLogins[1].password
    });

    expect(response.ok()).toBeFalsy();

    await authApi.dispose();
});

test("Valid Login - Get Token", async () => {
    const authApi = await AuthApi.createRequest();

    const response = await authApi.login({
        userEmail: testData.validLogin.username,
        userPassword: testData.validLogin.password
    });

    expect(
        response.ok(),
        `login failed for ${testData.validLogin.username}`
    ).toBeTruthy();

    const responseBody = await response.json();

    expect(
        responseBody.token,
        "login response missing token"
    ).toBeTruthy();

    await authApi.dispose();
});