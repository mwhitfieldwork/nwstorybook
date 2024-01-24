import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsService } from './products.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ProductComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let service: ProductsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ProductsComponent ],
            imports: [HttpClientModule, MatDialogModule 
                ,RouterTestingModule.withRoutes([])],
            providers: [ProductsService]
        })
        .compileComponents();
        service = TestBed.inject(ProductsService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Add more tests here
});