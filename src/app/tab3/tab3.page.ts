import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  capturedImage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.capturedImage = paramMap.get('image') || '';
    });
  }

  cancel() {
    this.router.navigate(['/tab1']);
  }

  sendToServer() {
    const headers = { 'Content-Type': 'application/json' };
    this.http.post('http://localhost:5000/predict', { image: this.capturedImage }, { headers }).subscribe(
      (response: any) => {
        if (response.gender && response.age) {
          // Redirige a Tab4 con la predicción (enviando un objeto con gender y age)
          this.router.navigate(['/tab4'], { 
            queryParams: { gender: response.gender, age: response.age } 
          });
        } else {
          this.router.navigate(['/tab4'], { queryParams: { result: 'Predicción fallida.' } });
        }
      },
      (error) => {
        console.error('Error al enviar la imagen al servidor:', error);
        this.router.navigate(['/tab4'], { queryParams: { result: 'Algo salió mal. ¡Intenta de nuevo!' } });
      }
    );
  }
}
