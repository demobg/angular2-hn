import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitTrackingService {
  private readonly STORAGE_KEY = 'itemVisits';

  constructor() {}

  getLastVisit(itemId: number): number | null {
    const visits = this.getStoredVisits();
    return visits.get(itemId) || null;
  }

  recordVisit(itemId: number): void {
    const visits = this.getStoredVisits();
    visits.set(itemId, Date.now());
    this.saveVisits(visits);
  }

  getStoredVisits(): Map<number, number> {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (!storedData) {
      return new Map<number, number>();
    }
    try {
      const parsed = JSON.parse(storedData);
      return new Map<number, number>(Object.entries(parsed).map(([key, value]) => [Number(key), value as number]));
    } catch (e) {
      return new Map<number, number>();
    }
  }

  private saveVisits(visits: Map<number, number>): void {
    const obj = Object.fromEntries(visits);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(obj));
  }
}
