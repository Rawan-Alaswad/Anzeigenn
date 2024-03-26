import { Location } from '@angular/common';
import { Anzeigen } from '../shared/anzeigen';
import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';

const ERROR_MESSAGE = 'Bitte füllen Sie das Feld aus".';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string = '';
  anzeige!: Anzeigen;
  form = new FormGroup({
  
    titelControl: new FormControl( '', [Validators.required]),
    preisControl: new FormControl(0, [Validators.required]),
    zustandControl: new FormControl('', [Validators.required]),
  });

  ERROR_MESSAGE = ERROR_MESSAGE;
  
//EIGENSCHAFT HINZUFÜGEN showTitelWarning 
  showTitelWarning: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }

  readOne(id: string): void {
    this.bs.getOne(id).subscribe({
      next: (response) => {
        this.anzeige = response;
        console.log('anzeigen', this.anzeige);
        this.form.patchValue({
          titelControl: this.anzeige?.titel,
          preisControl: this.anzeige?.preis,
          zustandControl: this.anzeige?.zustand,
        });
      },
      error: (err) => console.log(err),
      complete: () => console.log('getOne() completed'),
    });
  }

  //  HINZUFÜGEN onBlurTitel METHODe
  onBlurTitel(): void {
    this.showTitelWarning = this.form.get('titelControl')?.invalid ?? false;
  }

  update(): void {
    if (this.form.valid) {
      const values = this.form.value;
      const update: Anzeigen = {
        _id: this.id,
    
        titel: values.titelControl ?? '', 
        preis: values.preisControl ?? 0, 
        zustand: values.zustandControl ?? '', 
      };
  
      this.bs.update(this.id, update).subscribe({
        next: (response) => {
          console.log(response._id)
          console.log('Update erfolgreich:', response);

          this.router.navigateByUrl('/table');
        },
        error: (err) => {
         
          console.error('Fehler beim Update:', err);
        },
        complete: () => console.log('update() completed')
      });
    } else {
      console.log('Formular ist nicht gültig. Bitte überprüfen Sie Ihre Eingaben.');
    }
  }

  cancel(): void {
    this.location.back();
  }
}
