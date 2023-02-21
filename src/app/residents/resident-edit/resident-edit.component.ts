import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { Client } from 'app/models/client'
import { ClientService } from 'app/shared/services/client.service'
import { FormTypes } from 'app/models/form-types'
import { DateUtils } from 'app/shared/utils/date-utils'
import { formatDate } from '@angular/common'

@Component({
  selector: 'app-resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.css']
})
export class ResidentEditComponent implements OnInit {

  resident: Client

  formType: FormTypes = FormTypes.Edit

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  private getResident(): Observable<Client> {
    return this.route.data
      .pipe(map((data: { resident: Client }) => data.resident))
  }

  ngOnInit() {
    this.getResident().subscribe(resident => {
      this.resident = resident
    })
  }

  saveResident(eventData) {
    eventData.resident.dateOfBirth = eventData.resident.dateOfBirth
      ? formatDate(eventData.resident.dateOfBirth, 'MM.dd.yyyy hh:mm:ss', 'ru')
      : null
    eventData.resident.id = this.resident.id
    eventData.resident.photoUrl = this.resident.photoUrl
    this.clientService.updateClient(eventData.resident).subscribe(
      (data) => {
        this.router.navigate(['/residents'])
      },
      (err) => {
        eventData.errorCallback(err)
      }
    )
  }
}
