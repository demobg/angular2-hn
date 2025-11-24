import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CalculatorResponse {
    result: number;
    operation: string;
    message: string;
}

@Injectable()
export class CalculatorService {
    private apiUrl = 'http://localhost:8989/bank-api/calculator';

    constructor(private http: HttpClient) {}

    calculate(operand1: number, operand2: number, operation: string): Observable<CalculatorResponse> {
        const params = new HttpParams()
            .set('operand1', operand1.toString())
            .set('operand2', operand2.toString());

        return this.http.get<CalculatorResponse>(`${this.apiUrl}/${operation}`, { params });
    }
}
