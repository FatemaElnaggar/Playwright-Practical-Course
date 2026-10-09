import {test, expect} from "@playwright/test"
import { AuthApi } from "../API/AuthApi";
import { TokenHelper } from "../Utils/TokenHelper";
import { DashboardPage } from "../Pages/DashboardPage";
import { CartPage } from "../Pages/CartPage";
import { CheckoutPage } from "../Pages/CheckoutPage";
import { OrdersPage } from "../Pages/OrdersPage";
import { OrderDetailsPage } from "../Pages/OrderDetailsPage";
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

test("Complete Order Flow", async ({ page }) => {

    // Page Objects
    const authApi = await AuthApi.createRequest();
    const tokenHelper = new TokenHelper();
    const dashboard = new DashboardPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const orders = new OrdersPage(page);
    const orderDetails = new OrderDetailsPage(page);

    // API Login and get token
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

    const token = responseBody.token;

    await authApi.dispose();

    // Open Dashboard using token
    await tokenHelper.inject(page, token);

    await page.goto(
        "https://rahulshettyacademy.com/client/#/dashboard/dash"
    );

    // Add two products
    const products = testData.productsList.productNames;

    await dashboard.AddProduct(products[0]);
    await dashboard.AddProduct(products[1]);

    // Verify cart count
    await expect(dashboard.cartcount).toHaveText("2");
   
    await dashboard.carticon.screenshot({
    path: "API-UI-Assignment/Screenshots/CorrectCartCount.png"
});
 

    // Open Cart and verify products
    await dashboard.ClickOnCart();

    await expect(page).toHaveURL(
        "https://rahulshettyacademy.com/client/#/dashboard/cart"
    );

    await expect(page.getByText(products[0])).toBeVisible();
    await expect(page.getByText(products[1])).toBeVisible();

    // Checkout
    await cart.ClickCheckout();

    await checkout.fillCreditcardNumber(
        testData.checkout.cardNumber
    );

    await checkout.SelectMonth(
        testData.checkout.expiryMonth
    );

    await checkout.SelectYear(
        testData.checkout.expiryYear
    );

    await checkout.FillCvv(
        testData.checkout.cvv
    );

    await checkout.FillNameOnCard(
        testData.checkout.nameOnCard
    );

    await checkout.Fillcoupon(
        testData.checkout.coupon
    );

    await checkout.ApplyCouponButton();

    await expect(checkout.shippingemail).toHaveValue(
        testData.checkout.shippingEmail
    );

    await checkout.SelectCountry(
        testData.checkout.shippingCountry
    );

    await checkout.PlaceOrderButton();

    // Verify Thank You and get Order ID
    await expect(
        page.getByText("Thankyou for the order.")
    ).toBeVisible();
    await page.screenshot({
    path: path.join(process.cwd(), "API-UI-Assignment", "Screenshots", "ThankYou.png")
});

    const orderIds = await checkout.GetOrderIds();

    expect(orderIds).toHaveLength(2);

   console.log("Order IDs:", orderIds);

    // Open Orders list and verify all order IDs
    await orders.ClickOrdersTab();

   for (const orderId of orderIds) {
    await expect(
        orders.getOrderRow(orderId)
    ).toBeVisible();
}
//view one of them
await orders.ViewOrder(orderIds[0]);

await expect(
    orderDetails.getOrderId()
).toContainText(orderIds[0]);


    await page.screenshot({
    path: path.join(process.cwd(), "API-UI-Assignment", "Screenshots", "OrderDetails.png")
});

});
