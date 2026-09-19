import{expect, type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"

export class Gocheckout extends PRbase {
checkoutButton = this.page.getByRole("button", { name: "Checkout" });

    async gocheckout () {
        await this.checkoutButton.click();

    }
}