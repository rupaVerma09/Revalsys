import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Revalsys';

  constructor(private auth:AuthServiceService) { }

  ngOnInit(): void {
   this.auth.setDb([ {userid : 'abc@media.com',password:'abc123','username':'tom'},
                     {userid : 'def@media.com',password:'def123','username':'dick'}]);
                    //  this.auth.logout();
  }
}
