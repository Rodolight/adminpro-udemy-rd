import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

  @Input() leyenda: 'Leyenda';
   // Doughnut
  @Input() doughnutChartLabels: Label[] = [];
  @Input()  doughnutChartData: MultiDataSet = [];
  @Input() doughnutChartType: ChartType;


  constructor() { }

  ngOnInit() {
  }

}
