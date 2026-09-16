import {type Page} from "@playwright/test"


export class SLbasepage {
  constructor (readonly page:Page) {} 

  async openSL () {
    await this.page.goto("https://rahulshettyacademy.com/angularpractice/");
  }
}