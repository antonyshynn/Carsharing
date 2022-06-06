import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css', '../home/home.component.css']
})
export class AboutUsComponent implements OnInit {
  isAdmin = false;
  constructor() { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:create'))
      this.isAdmin = true;
  }

}
