import{type Page} from"@playwright/test"

export class PRbase {

   constructor (readonly page: Page) {}
   
   async open (){
    await this.page.goto("https://rahulshettyacademy.com/client");
   }

}