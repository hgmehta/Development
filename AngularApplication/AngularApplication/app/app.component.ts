import { Component } from "@angular/core"
@Component({
    selector: "user-app",
    template: `   
              <div class='container'>
                <router-outlet> </router-outlet>
              </div>            `
})
export class AppComponent { }