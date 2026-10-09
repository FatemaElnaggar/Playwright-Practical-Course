import {type Page, expect} from "@playwright/test"

export class CartPage {
    constructor (private page:Page){}


    private get checkoutbutton (){
    return this.page.getByRole("button", { name: "Checkout" });
    }

    async ClickCheckout (){
    await this.checkoutbutton.click();
    }

    async VerifyProductIsVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
}

}