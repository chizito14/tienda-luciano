import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from '../best-seller/best-seller.component';

@Component({
	selector: 'app-tabs',
	standalone: true,
	imports: [CommonModule,
        BestSellerComponent,
        ],
		templateUrl: './tabs.component.html',
		styles: []
})
export class TabsComponent {
	tabs = [
		{ id: 'best', label: 'Más vendidos', selector: 'app-best-seller' },
		{ id: 'toyota', label: 'Toyota', selector: 'app-toyota' }
	];

	selected = this.tabs[0].id;

	select(tabId: string) {
		this.selected = tabId;
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

