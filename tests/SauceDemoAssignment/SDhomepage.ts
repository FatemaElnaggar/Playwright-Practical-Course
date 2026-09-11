import { type Page, type Locator } from "@playwright/test";
import { SDbasepage } from "./SDbasepage";

export class Homepage extends SDbasepage {

    readonly pageTitle : Locator;

    constructor (page: Page) {
    super(page);

    this.pageTitle=page.locator('[data-test="title"]');
    }


    

}