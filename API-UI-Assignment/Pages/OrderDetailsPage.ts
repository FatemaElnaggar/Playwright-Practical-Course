
import { type Page } from "@playwright/test";

export class OrderDetailsPage {
    constructor(private page: Page) {}

    getOrderId() {
        return this.page.locator(".col-text.-main");
    }
}

