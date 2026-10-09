import { type Page } from "@playwright/test";

export class OrdersPage {
    constructor(private page: Page) {}

    private get ordersTab() {
        return this.page.getByRole("button", { name: "ORDERS" });
    }

    async ClickOrdersTab() {
        await this.ordersTab.click();
    }

     getOrderRow(orderId: string) {
        return this.page.locator("tr")
            .filter({ hasText: orderId });
    }

    async ViewOrder(orderId: string) {
        await this.getOrderRow(orderId)
            .getByRole("button", { name: "View" })
            .click();
    }
}