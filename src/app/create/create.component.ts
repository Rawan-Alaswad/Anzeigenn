import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Anzeigen } from '../shared/anzeigen';
import { HttpClient } from '@angular/common/http';


const ERROR_MESSAGE = 'Please fill out the field "Titel".';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  _id: string = '';
  Anzeigen!: Anzeigen ;
  form = new FormGroup({
    titelControl : new FormControl<string>('', Validators.required),
    preisControl: new FormControl<number>(0,Validators.required),
    zustandControl: new FormControl<string>('' , Validators.required),
    
  });
  
  ERROR_MESSAGE = ERROR_MESSAGE;

  // EIGENSCHAFTEN HINZUFÜGEN showCategoryWarning 
  showTitel: boolean = false;
  

  constructor(
    private bs: BackendService,
    private location: Location,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
  ) { }

  ngOnInit(): void { }

     // HINZUFÜGEN  onBlurCategory METHODe
  onBlurCategory(): void {
    this.showTitel = this.form.get('titelControl')?.invalid ?? false;
    }
  create(): void {
    const values = this.form.value;
    if (this.form.get('titelControl')?.invalid) {
      this.showTitel = true;
      return;
      }
    const newAnzeige: Anzeigen = {

     _id: '',
      titel: values.titelControl! as string,
     
      preis: values.preisControl! as number,
      zustand: values.zustandControl! as string,
   
    };
    try {
      this.bs.create(newAnzeige).subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
          this.ngZone.run(() => this.router.navigateByUrl('/table'));
        },
        error: (err) => {
          console.log(err);
     
          alert(err.error.message || err.message);
        },
        complete: () =>
          console.log('Neuer Eintrag wurde in der Datenbank gespeichert')
      });
    } catch (error) {
      console.log(error);
      if (values.titelControl === '') {
        alert(ERROR_MESSAGE);
      }
    }
  }  

  cancel(): void {
    this.location.back();
  }
  
}

