import {type Page} from "@playwright/test"


export class DashboardPage{
constructor (private readonly page:Page){}


private  productcard (name:string) {
    return this.page.locator(".card")
    .filter({ hasText: name })
}

    
async AddProduct (name:string){
    await this.productcard(name).getByRole("button", { name: "Add To Cart" }).click();
}


 get carticon () {
    return this.page.getByRole("button", { name:" Cart"});
}

async ClickOnCart () {
    await this.carticon.click();
}

get cartcount() {
    return this.carticon.locator("label");
}
}