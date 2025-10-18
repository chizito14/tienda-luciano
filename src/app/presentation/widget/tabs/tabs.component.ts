import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { ToyotaComponent } from "../toyota/toyota.component";
import { TabsNewComponent } from "../tabs-new/tabs-new.component";

@Component({
    selector: 'app-tabs',
    standalone: true,
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    imports: [
    CommonModule,
    BestSellerComponent,
    ToyotaComponent,
    TabsNewComponent
]})
export class TabsComponent {
	tabs = [
		{ id: 'best', label: 'Más Vendidos', selector: 'app-best-seller' },
		{ id: 'toyota', label: 'Marca Toyota', selector: 'app-toyota' },
		{ id: 'nuevos', label: 'Nuevos', selector: 'tabs-new' }
	]

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

