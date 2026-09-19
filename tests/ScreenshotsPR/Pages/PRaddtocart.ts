import{expect, type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"

export class Addtocart extends PRbase {
    zaracoat = this.page.locator(".card")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add To Cart" });

    carticon = this.page.getByRole("button", { name: " Cart" });


    async additem () {
        await this.zaracoat.click();
        await expect (this.carticon).toContainText("1");
        await this.carticon.click();

    }
}