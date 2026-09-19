import{expect, type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"

export class Checkform extends PRbase {
creditCard = this.page.locator('input[value="4542 9931 9292 2293"]');
expiryMonth = this.page.locator(".field.small")
    .filter({ hasText: "Expiry Date" })
    .locator("select")
    .nth(0);

expiryYear = this.page.locator(".field.small")
    .filter({ hasText: "Expiry Date" })
    .locator("select")
    .nth(1);

cvvcode = this.page.locator(".field.small")
    .filter({ hasText: "CVV Code" })
    .locator("input");

    nameoncard = this.page.locator(".field")
    .filter({ hasText: "Name on Card" })
    .locator("input");

    coupon = this.page.locator('[name="coupon"]');
    applycoupon = this.page.getByRole("button", { name: "Apply Coupon" });

    email = this.page.locator('label[type="text"]');
    
    

    async fillcheckout (email:string) {
        await expect (this.creditCard).not.toBeEmpty();
        await this.expiryMonth.selectOption("05");
        await this.expiryYear.selectOption("30");
        await this.cvvcode.fill("511");
        await this.nameoncard.fill("fatma ahmad");
        await this.coupon.fill("10%");
        await this.applycoupon.click();
        await expect(this.email).toContainText(email);
        
    }
}