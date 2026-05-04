import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConverter',
  standalone: true
})
export class UnitConverterPipe implements PipeTransform {

  transform(value: number, unit: string): string {

    if (!value || !unit) return '';

    const u = unit.toLowerCase();

    if (u === 'g') {
      return `${(value * 0.0353).toFixed(1)} oz`;
    }

    if (u === 'ml') {
      return `${(value / 240).toFixed(2)} cups`;
    }

    return `${value} ${unit}`;
  }
}
