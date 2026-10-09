import {type Page} from "@playwright/test"

export class CheckoutPage {
    constructor (private page:Page) {}

    private get creditCard() {
    return this.page.locator('input.input.txt').first();

}
    async fillCreditcardNumber(cardnumber:string) {
     await this.creditCard.fill(cardnumber);
    }
    

    private get expiryMonth() {
    return this.page.locator("select.input.ddl").nth(0);
   }
   async SelectMonth (monthvalue:string){
    await this.expiryMonth.selectOption({label : monthvalue});
   }



   private get expiryYear() {
    return this.page.locator("select.input.ddl").nth(1);
   }
  async SelectYear (yearvalue:string){
    await this.expiryYear.selectOption({label : yearvalue});
   }



   private get cvvcode () {
    return this.page.locator(".field.small")
    .filter({ hasText: "CVV Code" })
    .locator("input");
   }
   async FillCvv (codevalue:string){
    await this.cvvcode.fill(codevalue);
   }


   private get nameoncard () {
    return this.page.locator(".field")
    .filter({ hasText: "Name on Card" })
    .locator("input");
   }
   async FillNameOnCard (nameoncard:string){
    await this.nameoncard.fill(nameoncard);
   }


   private get couponfield (){
    return this.page.locator('[name="coupon"]');
   }
   async Fillcoupon (couponvalue:string) {
    await this.couponfield.fill(couponvalue);
   }



   private get applycouponbutton (){
    return this.page.getByRole("button", { name: "Apply Coupon" });
   }
   async ApplyCouponButton () {
    await this.applycouponbutton.click();
   }
   

   get shippingemail() {
    return this.page.locator(".user__name input[type='text']");
   }



   private get shippingcountry (){
    return this.page.getByPlaceholder("Select Country");
   }
   

async SelectCountry(fullname: string) {
    await this.shippingcountry.click();
    await this.shippingcountry.pressSequentially(fullname, { delay: 500 });
    await this.shippingcountry.press("ArrowDown");
    await this.shippingcountry.press("Enter");
}
   
   private get placeorderbutton() {
    return this.page.locator("a.btnn.action__submit");
}
   async PlaceOrderButton (){
    await this.placeorderbutton.click();
   }


private get orderIds() {
    return this.page.locator("td.em-spacer-1 label");
}
// to handle that website make ID for each product
async GetOrderIds(): Promise<string[]> {
    const allIds = await this.orderIds.allInnerTexts();

    return allIds
        .slice(1)
        .map(id => id.replace(/\|/g, "").trim());
}

   
}