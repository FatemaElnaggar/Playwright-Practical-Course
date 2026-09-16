import { type Page } from "@playwright/test";
import { SLbasepage } from "./SLbasepage";

export class SLproductpage extends SLbasepage {
      readonly checkout = this.page.locator("a.nav-link.btn-primary");

     async shop () {
         await this.page.getByRole("link", {name: "Shop"} ).waitFor();
         await this.page.locator(".card.h-100").filter({hasText: "iphone X"}).getByRole("button", {name : "Add"}).waitFor();
         await this.page.locator(".card.h-100").filter({hasText: "Blackberry"}).getByRole("button", {name : "Add"}).waitFor();
         
    }

    async addtocart () {
      await this.page.getByRole("link", {name: "Shop"} ).click();
      await this.page.locator(".card.h-100").filter({hasText: "iphone X"}).getByRole("button", {name : "Add"}).click();
      await this.page.locator(".card.h-100").filter({hasText: "Blackberry"}).getByRole("button", {name : "Add"}).click(); 
        
    }
}