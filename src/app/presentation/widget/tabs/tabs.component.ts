import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { ToyotaComponent } from "../toyota/toyota.component";

@Component({
    selector: 'app-tabs',
    standalone: true,
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [
        CommonModule,
        BestSellerComponent,
        ToyotaComponent
    ]
})
export class TabsComponent {
	tabs = [
		{ id: 'best', label: 'Más vendidos', selector: 'app-best-seller' },
		{ id: 'toyota', label: 'Marca toyota', selector: 'app-toyota' },
		{ id: 'nuevos', label: 'Nuevos', selector: 'app-nuevos' }

	];

	selected = this.tabs[0].id;

	select(tabId: string) {
		this.selected = tabId;
		console.log('Selected tab:', tabId);
	}

	// Simple keyboard navigation: Left/Right arrows to move between tabs
	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		const idx = this.tabs.findIndex(t => t.id === this.selected);
		if (event.key === 'ArrowRight') {
			const next = this.tabs[(idx + 1) % this.tabs.length];
			this.select(next.id);
			event.preventDefault();
		} else if (event.key === 'ArrowLeft') {
			const prev = this.tabs[(idx - 1 + this.tabs.length) % this.tabs.length];
			this.select(prev.id);
			event.preventDefault();
		}
	}
}

