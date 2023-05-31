import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hasToken: boolean = false;
  hasValidToken: any;
  authToken: string | undefined;
  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('AuthToken')?.toString();
    if (this.authToken != null || undefined) {
      this.hasToken = true;
    } else {
      this.router.navigate(['/login']);
    }
    if (this.hasToken) {
      this.data.CheckToken(this.authToken).subscribe((result) => {
        let tokenValid: any = result.tokenValid;
        this.hasValidToken = tokenValid;
        if (!this.hasValidToken) this.router.navigate(['/login']);
      });
    }
  }

  Logout(): void {
    localStorage.removeItem('AuthToken');
    window.location.reload();
  }
}
