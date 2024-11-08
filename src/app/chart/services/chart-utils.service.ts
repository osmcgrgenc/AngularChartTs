import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChartUtilsService {
  private readonly timeUnit: { [key: string]: number } = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  getDefaultColors(): string[] {
    return ['orange', 'limegreen', 'steelblue', 'red', 'yellow'];
  }

  calculateLimits(data: [number, number][]): { min: number; max: number } {
    const values = data.map(point => point[1]);
    return {
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }

  formatTimeValue(value: number, unit: string): string {
    const date = new Date(value);
    switch (unit) {
      case 's':
        return date.toLocaleTimeString();
      case 'm':
      case 'h':
        return `${date.getHours()}:${date.getMinutes()}`;
      case 'd':
        return date.toLocaleDateString();
      default:
        return value.toString();
    }
  }
} 