import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  gender: string = '';
  age: number = 0;
  result: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['gender'] && params['age']) {
        this.gender = params['gender'];
        this.age = params['age'];
      } else {
        this.result = params['result'] || 'No hay resultados disponibles.';
      }
    });
  }

  goToTab1() {
    this.router.navigate(['/tab1']);
  }

}
