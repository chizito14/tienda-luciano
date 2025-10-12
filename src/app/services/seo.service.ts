import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        public title: Title,
        public meta: Meta
    ) {}

    setCanonicalURL(url?: string) {
        const canURL = url ?? this._document.URL
        //const canURL = url == undefined ? this._document.URL : url
        const head = this._document.getElementsByTagName('head')[0]
        let element = this._document.querySelector("link[rel='canonical']") as HTMLLinkElement
        if (!element) {
            element = this._document.createElement('link');
            element.setAttribute('rel', 'canonical');
            head.appendChild(element);
            //element = this._document.createElement('link') as HTMLLinkElement
            //head.appendChild(element)
        }
        element.setAttribute('href', canURL);
    }

    setIndexFollow(state: boolean = true) {
        this.meta.updateTag({
            name: 'robots',
            content: state ? 'index, follow' : 'noindex, nofollow'
        })
    }

    setTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }

}


/*
    EXAMPLE

    export class ProductPageComponent implements OnInit {
        constructor(private seo: SeoService) {}
        ngOnInit(): void {
            this.seo.title.setTitle('Zapatos Deportivos | MiTienda');
            this.seo.meta.updateTag({ name: 'description', content: 'Compra zapatos deportivos con envío gratis y descuentos exclusivos.' });
            this.seo.setCanonicalURL('https://mitienda.com/productos/zapatos-deportivos');
            this.seo.setIndexFollow(true); // o false si no quieres que se indexe
        }
    }


*/