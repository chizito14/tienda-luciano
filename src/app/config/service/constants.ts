import { IProduct } from "../../application/models/interface-product";

/**
 * ProductsData: intenta cargar el archivo JSON colocado en
 * `src/assets/data/deepseek_json_20251007_f5aa3a.json` en tiempo de ejecución.
 * Si el archivo no existe o falla la carga (por ejemplo en desarrollo sin el asset),
 * se devuelve un pequeño conjunto de fallback (útil para que la app siga funcionando).
 *
 * Instrucciones:
 * - Copia el JSON que me pasaste a: `src/assets/data/deepseek_json_20251007_f5aa3a.json`
 * - El código intentará require() ese archivo y usarlo como `ProductsData`.
 */

// Fallback pequeño para que la app no rompa si aún no copiaste el JSON completo.
const DefaultProductsData: IProduct[] = [
    { id: 36, imagen: './assets/img-product/alternador toyota 4.5 1fz.jpeg', cantidad: 10, precio: 199.99, description: 'Alternador Toyota 4.5', especificaciones: 'Original', codigo: 'ALT-4.5' },
    { id: 2, imagen: './assets/img-product/1-2-kit-charnellacabezote-toyota-3f.jpeg', cantidad: 15, precio: 89.99, description: 'Kit charnela', especificaciones: '', codigo: 'KIT-3F' },
];

// Intenta cargar el archivo JSON desde assets (require funciona en tiempo de compilación/bundle si resolveJsonModule está activo
// o si el archivo es copiado a `assets` en el build). Si no está presente, se usa el fallback.
declare const require: any;
let productsData: IProduct[] = DefaultProductsData;
try {
    // ruta relativa desde este archivo a `src/assets/data/...`
    const json = require('../../../assets/Json.products.json');
    if (Array.isArray(json)) {
        productsData = json as IProduct[];
    } else if (json && json.default && Array.isArray(json.default)) {
        // en algunos setups el import de JSON queda en .default
        productsData = json.default as IProduct[];
    }
} catch (e) {
    // si falla, no hacemos throw para no romper la app en runtime; el fallback seguirá funcionando.
    // Se recomienda copiar el JSON a `src/assets/data/` para que éste sea usado.
    // console.warn('No se encontró JSON de productos en assets; usando fallback. Error:', e);
}

export const ProductsData: IProduct[] = productsData;
