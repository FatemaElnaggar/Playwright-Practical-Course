import {type Page} from "@playwright/test"

export class CheckoutPage {
    constructor (private page:Page){}


    private get checkoutbutton (){
    return this.page.getByRole("button", { name: "Checkout" });
    }
    async ClickCheckout (){
    await this.checkoutbutton.click();
    }


}