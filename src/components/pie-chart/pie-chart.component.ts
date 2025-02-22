import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataModel } from '../../models/data.model';
import { pieChartConfig } from './pie-chart.config';
import { ChartDataFilterComponent } from '../chart-data-filter/chart-data-filter.component';
import { FilterDataModel } from '../../models/filter-data.model';
import { FilterDataService } from '../../services/filter-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'asp-pie-chart',
  templateUrl: './pie-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChartDataFilterComponent,
  ],
  styleUrl: './pie-chart.component.less',
})
export class PieChartComponent implements OnInit, OnChanges {

  constructor(private filterDataService: FilterDataService) {  }

  @Input() data: DataModel[] = [];

  private filters: FilterDataModel = { isSort: false, lessThan: null, moreThan: null };
  private filteredData: DataModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.init();
    }
  }

  changedFilters(filters: FilterDataModel): void {
    this.filters = filters;

    this.init();
  }

  private init(): void {
    this.filteredData = this.filterDataService.updateFilteredData(this.data, this.filters);

    this.createPieChart();
  }

  private createPieChart(): void {

    const width = pieChartConfig.width;
    const radius = pieChartConfig.radius;

    const arc = d3.arc()
      .innerRadius(radius * pieChartConfig.innerRadius)
      .outerRadius(radius * pieChartConfig.outerRadius - 1);

    const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      // @ts-ignore
      .value((d: DataModel) => d.value);

    const color = d3.scaleOrdinal()
      .domain(this.filteredData.map(d => d.category))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.filteredData.length).reverse());

    d3.select('.pie-chart__container').select('svg').remove();

    const svg = d3.select('.pie-chart__container').append('svg')
      .attr("width", width)
      .attr("height", width)
      .attr("viewBox", [-width / 2, -width / 2, width, width])
      .attr("style", "max-width: 100%; height: auto;");

    svg.append("g")
      .selectAll()
      // @ts-ignore
      .data(pie(this.filteredData))
      .join("path")
      // @ts-ignore
      .attr("fill", d => color(d.data.category))
      // @ts-ignore
      .attr("d", arc)
      .append("title")
      // @ts-ignore
      .text(d => `${d.data.category}: ${d.data.value.toLocaleString()}`);
  }
}
