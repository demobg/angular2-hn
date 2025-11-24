import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from './calculator.service';

const routes: Routes = [
    {
        path: '',
        component: CalculatorComponent
    }
];

@NgModule({
    declarations: [CalculatorComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [CalculatorService]
})
export class CalculatorModule {}
