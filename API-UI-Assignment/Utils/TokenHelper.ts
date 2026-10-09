import { type Page} from "@playwright/test";

export class TokenHelper {
    async inject (page:Page, token:string): Promise<void> {
    await page.addInitScript((value)=> {
    window.localStorage.setItem("token", value);
    },token)

    }
}