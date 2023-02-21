import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/shared/services/client.service';
import { FormTypes } from 'app/models/form-types';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-resident-create',
  templateUrl: './resident-create.component.html',
  styleUrls: ['./resident-create.component.css']
})
export class ResidentCreateComponent implements OnInit {

  formType: FormTypes = FormTypes.Create

  constructor(
    private clientService: ClientService,
    private router: Router) {
  }

  ngOnInit() {
  }

  saveResident(eventData) {
    eventData.resident.dateOfBirth = eventData.resident.dateOfBirth
      ? formatDate(eventData.resident.dateOfBirth, 'MM.dd.yyyy hh:mm:ss', 'ru')
      : null
    this.clientService.createClient(eventData.resident).subscribe(
      (data) => {
        this.router.navigate(['/residents']);
      },
      (err) => {
        eventData.errorCallback(err);
      }
    );
  }
}
