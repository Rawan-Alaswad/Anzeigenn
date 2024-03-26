import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Anzeigen } from '../shared/anzeigen';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  Anzeigen: Anzeigen[] = [];
  anzeige!: Anzeigen[];
  deleted = false;
  newAnzeige: Anzeigen = {
 
    _id: '',
    titel: '',
    preis: 0,
    zustand:''
  };

  constructor(private bs: BackendService, private router: Router) { }


  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
          {
            next: (response) => {
                  this.anzeige = response;
                  console.log(this.anzeige);
                  return this.anzeige;
                },
            error: (err) => console.log(err),
            complete: () => console.log('getAll() completed')
          })
        }
        create(): void {
          this.bs.create(this.newAnzeige).subscribe(
            {
              next: (response) => {
                console.log('response : ', response);
                this.newAnzeige = {
                  _id: '',
                  titel: '',
                  preis: 0,
                  zustand:'',
               
                };
                this.reload(false);
              },
              error: (err) => console.log(err),
              complete: () => console.log('create() completed')
            });}

            delete( id: string): void {
              this.bs.delete(id).subscribe(
                {
                  next: (response: any) => {
                    console.log('response : ', response);
                    if(response.status == 204){
                            console.log(response.status);
                            this.reload(true);
                          } else {
                            console.log(response.status);
                            console.log(response.error);
                            this.reload(false);
                          }
                  },
                  error: (err) => console.log(err),
                  complete: () => console.log('delete() completed')
              });
            }
          
            reload(deleted: boolean)
            {
              this.deleted = deleted;
              this.readAll();
              this.router.navigateByUrl('');
            }
          }