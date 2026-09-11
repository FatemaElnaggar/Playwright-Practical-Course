import { type Page } from "@playwright/test";

export class SDbasepage {
    constructor (readonly page:Page){}

    async open () {
        await this.page.goto("https://www.saucedemo.com/");
    }
}
