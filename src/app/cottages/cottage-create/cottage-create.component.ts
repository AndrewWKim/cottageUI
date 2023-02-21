import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CottageService } from 'app/shared/services/cottage.service';

@Component({
  selector: 'app-cottage-create',
  templateUrl: './cottage-create.component.html',
  styleUrls: ['./cottage-create.component.css']
})
export class CottageCreateComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private cottageService: CottageService,
    private router: Router) {
  }

  saveCottage(eventData) {
    this.cottageService.createCottage(eventData.cottage).subscribe(
      (data) => {
        this.router.navigate(['/cottages']);
      },
      (err) => {
        eventData.errorCallback(err);
      }
    );
  }
}
