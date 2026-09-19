import{type Page} from"@playwright/test"
import { PRbase } from "./PRbasepage"


 export class PRhome extends PRbase {

     regbutton = this.page.getByRole("link", { name: "Register" });


    async openhome () {
       await this.open();
       await this.regbutton.click();
    }
    
}