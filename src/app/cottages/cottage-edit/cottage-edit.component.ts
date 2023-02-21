import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CottageService } from 'app/shared/services/cottage.service';

@Component({
  selector: 'app-cottage-edit',
  templateUrl: './cottage-edit.component.html',
  styleUrls: ['./cottage-edit.component.css']
})
export class CottageEditComponent implements OnInit {

  constructor(
    private cottageService: CottageService,
    private router: Router) {
  }

  ngOnInit() {
  }

  saveCottage(eventData) {
    this.cottageService.updateCottage(eventData.cottage).subscribe(
      (data) => {
        this.router.navigate(['/cottages']);
      },
      (err) => {
        eventData.errorCallback(err);
      }
    );
  }
}
