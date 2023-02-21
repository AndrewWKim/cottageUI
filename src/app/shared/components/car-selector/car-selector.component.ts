import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Car } from 'app/models/car';
import * as _ from 'lodash';
import { CustomValidators } from 'app/shared/validation/validators.module';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.css']
})
export class CarSelectorComponent implements OnChanges {

  @Input() cars: Car[];
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();

  carForm: FormGroup;
  submitted: boolean;

  public readonly CAR_BRAND_FORM_KEY = 'brand';
  public readonly CAR_MODEL_FORM_KEY = 'model';
  public readonly CAR_LICENSE_PLATE = 'carLicensePlate';

  public displayedColumns = ['brand', 'model', 'carLicensePlate', 'action'];

  public addButtonDisabled = false;

  dataSource: Car[] = [];

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder) {
    this.submitted = false;
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentCars: SimpleChange = changes.cars;
    this.dataSource = [...currentCars.currentValue];
  }

  submit() {
    this.submitted = true;
    if (this.carForm.invalid) {
      return;
    }
    const car = { ...this.carForm.value };

    this.onSubmit.emit({ car: car });
    setTimeout(() =>
      this.formGroupDirective.resetForm(), 0)

    this.dataSource = [...this.cars];
  }

  remove(car: Car) {
    this.onRemove.emit({ car: car });
    this.dataSource = [...this.cars];
  }

  private createForm() {
    this.carForm = this.fb.group({
      [this.CAR_BRAND_FORM_KEY]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
      [this.CAR_MODEL_FORM_KEY]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
      [this.CAR_LICENSE_PLATE]: this.fb.control('', [CustomValidators.requiredNoWhitespace()]),
    });
  }
}