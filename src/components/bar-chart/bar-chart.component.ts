import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataModel } from '../../models/data.model';
import { barChartConfig } from './bar-chart.config';
import { FilterDataService } from '../../services/filter-data.service';
import { FilesFacade } from '../../store/files';
import * as d3 from 'd3';

@Component({
  selector: 'asp-bar-chart',
  templateUrl: './bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './bar-chart.component.less',
})
export class BarChartComponent implements OnInit, OnChanges {

  constructor(
    private filesFacade: FilesFacade,
    private filterDataService: FilterDataService,
  ) {  }

  @Input() data: DataModel[] = [];

  private filteredData: DataModel[] = [];

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.init();
    }
  }

  private init(): void {
    this.filesFacade.current$.subscribe(item => {
      if (item) {
        this.filteredData = this.filterDataService.updateFilteredData(this.data, item.filters);
      }

      this.createBarChart();
    });
  }

  private createBarChart(): void {
    const width = barChartConfig.width;
    const height = barChartConfig.height;

    const rate = Math.round(height / (
      [...this.filteredData].sort((a, b) => b.value - a.value)?.[0]?.value || height));
    const barWidth = (Math.max(1, Math.round(width / this.filteredData.length)));
    const barWidthRate = barChartConfig.barWidthRate;

    const color = d3.scaleOrdinal()
      .domain(this.filteredData.map(d => d.category))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.filteredData.length).reverse());


    d3.select('.bar-chart__container').select('svg').remove();

    const svg = d3.select('.bar-chart__container').append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('rect')
      .data(this.filteredData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * barWidth)
      .attr('y', d => height - d.value * rate)
      .attr('width', barWidth * barWidthRate)
      // @ts-ignore
      .attr('height', d => d.value * rate)
      // @ts-ignore
      .attr("fill", d => color(d.category))
      .append("title")
      // @ts-ignore
      .text(d => `${d.category}: ${d.value.toLocaleString()}`);
  }
}
