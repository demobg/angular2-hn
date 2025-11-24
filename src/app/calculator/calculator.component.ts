import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
    operand1: number = null;
    operand2: number = null;
    result: number = null;
    operation = '';
    message = '';
    loading = false;

    constructor(private calculatorService: CalculatorService) {}

    calculate(operation: string) {
        if (this.operand1 === null || this.operand2 === null) {
            this.message = 'Please enter both operands';
            return;
        }

        this.loading = true;
        this.operation = operation;

        this.calculatorService.calculate(this.operand1, this.operand2, operation).subscribe(
            response => {
                this.result = response.result;
                this.message = response.message;
                this.loading = false;
            },
            error => {
                this.message = 'Error: ' + (error.error?.message || 'Could not connect to server');
                this.loading = false;
            }
        );
    }

    clear() {
        this.operand1 = null;
        this.operand2 = null;
        this.result = null;
        this.operation = '';
        this.message = '';
    }
}
