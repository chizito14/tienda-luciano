import { Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CardItemComponent } from '../../widget/card-item/card-item.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../application/models/interface-product';
import { ProductsData } from '../../../config/service/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { fadeScale } from '../../animations/fade-scale';
import { slideDown } from '../../animations/slide-down';

@Component({
    selector: 'products-page',
    standalone: true,
    imports: [
        CardItemComponent,
        ReactiveFormsModule,
        CommonModule
    ],
    animations: [
        fadeScale,
        slideDown('100ms')
    ],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
    
    data: IProduct[] = ProductsData
    products: IProduct[] = ProductsData    
    displayedProducts: IProduct[] = []
    pageSize = 20
    currentPage = 1
    totalPages = 1
    inpSearch = new FormControl('')
    inpMin = new FormControl(null)
    inpMax = new FormControl(null)
    router = inject(Router)
    paramURL: string = ''
    seo = inject(SeoService)
    // control para mostrar u ocultar la barra lateral en móvil
    showSidebarMobile = false

    constructor(private route: ActivatedRoute) {}

    // alterna la visibilidad de la barra lateral en dispositivos móviles
    toggleSidebarMobile() {
        this.showSidebarMobile = !this.showSidebarMobile
        // prevenir scroll del body cuando el panel está abierto (solo en navegador)
        try {
            if (isPlatformBrowser(PLATFORM_ID)) {
                // (no-op) this check exists to satisfy types; actual PLATFORM_ID injected below
            }
        } catch (e) {
            // ignore in SSR
        }
        // Usar document directamente con guardia de plataforma
        if (typeof document !== 'undefined') {
            if (this.showSidebarMobile) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    ngOnInit(): void {
        this.seo.title.setTitle('Repuesto de Vehiculos | LuciShop');
        this.seo.meta.updateTag({ name: 'description', content: 'Compra de respuestos de vehiculos con envío gratis y descuentos exclusivos.' });
        this.seo.setCanonicalURL('https://web-gyyu6m1m320a.up-de-fra1-k8s-1.apps.run-on-seenode.com/products/');
        this.seo.setIndexFollow(true)
        
        this.route.params.subscribe(params => {
            this.paramURL = params['param'] ?? ''
        });
        this.inpSearch.valueChanges.subscribe( e => this.filterProducts() )
        // inicializar listado paginado
        this.updateDisplayedProducts()
    }

    filterPrice() {
        this.filterProducts()
        if (this.inpMax.value) {
            const value = this.inpMax.value 
            this.products = this.products.filter( p => value >= p.precio )
        }
        // actualizar paginación tras filtrar por precio
        this.currentPage = 1
        this.updateDisplayedProducts()
        if (this.inpMin.value) {
            const value = this.inpMin.value 
            this.products = this.products.filter( p => value <= p.precio )
        }

    }

    filterProducts() {
        let temp = this.data
        if (!this.inpSearch.value) {
            this.products = ProductsData
        } else {
            const str = this.inpSearch.value.toLowerCase().trim()
            temp = temp.filter( p => p.description.toLowerCase().includes(str) )        
        }
        this.products = temp
        // reset pagina actual y actualizar vista
        this.currentPage = 1
        this.updateDisplayedProducts()
    }
    
    // --- métodos de paginación ---
    updateDisplayedProducts() {
        const total = this.products ? this.products.length : 0
        this.totalPages = Math.max(1, Math.ceil(total / this.pageSize))
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages
        if (total === 0) {
            this.displayedProducts = []
            return
        }
        const start = (this.currentPage - 1) * this.pageSize
        this.displayedProducts = this.products.slice(start, start + this.pageSize)
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++
            this.updateDisplayedProducts()
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            this.updateDisplayedProducts()
        }
    }

    goToPage(n: number) {
        if (n >= 1 && n <= this.totalPages) {
            this.currentPage = n
            this.updateDisplayedProducts()
        }
    }

    get totalItems() {
        return this.products ? this.products.length : 0
    }

    get startIndex() {
        if (this.totalItems === 0) return 0
        return (this.currentPage - 1) * this.pageSize + 1
    }

    get endIndex() {
        return Math.min(this.currentPage * this.pageSize, this.totalItems)
    }
}
