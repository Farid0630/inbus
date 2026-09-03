import type { LucideIcon } from "lucide-react";
import { Flame, Package, Nut, Layers, Sparkles } from "lucide-react";

export type ProductSlug =
  | "charcoal-briquette"
  | "coconut-shell-charcoal"
  | "semi-husked-coconut"
  | "kopra-hitam"
  | "kopra-putih";

export type SpecKey =
  | "shape"
  | "fixedCarbon"
  | "ashContent"
  | "moisture"
  | "volatileMatter"
  | "calorificValue"
  | "burningTime"
  | "sulfurContent"
  | "grade"
  | "size"
  | "netWeight"
  | "huskRemaining"
  | "shelfLife"
  | "harvestAge"
  | "packaging"
  | "moq"
  | "loadability";

export interface ProductSpec {
  key: SpecKey;
  value: string;
}

// 1. Product Model (OOP)
export class Product {
  constructor(
    public slug: ProductSlug,
    public icon: LucideIcon,
    public image: string,
    public specs: ProductSpec[]
  ) {}

  // Encapsulated behavior: Get a specific spec by its key
  getSpec(key: SpecKey): string | undefined {
    return this.specs.find((s) => s.key === key)?.value;
  }
}

// 2. Private Data Source
const _productsData: Product[] = [
  new Product("charcoal-briquette", Flame, "/images/briket-arang-kelapa-murni.jpg", [
    { key: "shape", value: "Cube, Hexagonal, Pillow, Finger, Flat" },
    { key: "fixedCarbon", value: "≥ 75%" },
    { key: "ashContent", value: "≤ 3%" },
    { key: "moisture", value: "≤ 8%" },
    { key: "calorificValue", value: "6,500 – 7,500 kcal/kg" },
    { key: "burningTime", value: "2 – 3 hours" },
    { key: "sulfurContent", value: "≤ 0.1%" },
    { key: "packaging", value: "10 kg / 20 kg carton, or as requested" },
    { key: "moq", value: "1 x 20ft container (approx. 18–20 tons)" },
  ]),
  new Product("coconut-shell-charcoal", Package, "/images/produk-arang-batok.jpg", [
    { key: "grade", value: "Grade A / Grade B" },
    { key: "size", value: "2 – 5 cm (customizable)" },
    { key: "fixedCarbon", value: "≥ 78%" },
    { key: "moisture", value: "≤ 10%" },
    { key: "ashContent", value: "≤ 3%" },
    { key: "volatileMatter", value: "≤ 15%" },
    { key: "packaging", value: "15 kg / 25 kg sack" },
    { key: "moq", value: "1 x 20ft container (approx. 15–17 tons)" },
  ]),
  new Product("semi-husked-coconut", Nut, "/images/produk-kelapa-semi-husked.jpg", [
    { key: "netWeight", value: "300 – 500 g / piece" },
    { key: "huskRemaining", value: "approx. 30% husk retained at the base" },
    { key: "harvestAge", value: "11 – 12 months" },
    { key: "shelfLife", value: "30 – 45 days from harvest" },
    { key: "packaging", value: "Mesh bag / sack, 50 – 80 pcs per unit" },
    { key: "loadability", value: "approx. 20,000 – 23,000 pcs / 40ft container" },
    { key: "moq", value: "1 x 40ft container" },
  ]),
  new Product("kopra-hitam", Layers, "/images/kopra-hitam-premium.jpg", [
    { key: "grade", value: "Grade A / Grade B (Industri)" },
    { key: "moisture", value: "≤ 6% (oven-dried)" },
    { key: "ashContent", value: "≤ 1%" },
    { key: "size", value: "Halves / pieces (customizable)" },
    { key: "packaging", value: "Karung 50 kg / jumbo bag" },
    { key: "moq", value: "1 x 20ft container (approx. 18–20 ton)" },
  ]),
  new Product("kopra-putih", Sparkles, "/images/produk-kopra-putih.jpg", [
    { key: "grade", value: "Edible Premium / Grade A" },
    { key: "moisture", value: "≤ 5% (smoke-free drying)" },
    { key: "ashContent", value: "≤ 0.8%" },
    { key: "size", value: "Halves / desiccated" },
    { key: "packaging", value: "Karung 50 kg / vacuum pack" },
    { key: "moq", value: "1 x 20ft container (approx. 18–20 ton)" },
  ]),
];

// 3. Service / Repository (OOP)
export class ProductService {
  /**
   * Get all available products
   */
  static getAll(): Product[] {
    return _productsData;
  }

  /**
   * Find a product by its slug
   */
  static getBySlug(slug: string): Product | undefined {
    return _productsData.find((product) => product.slug === slug);
  }
}

// Keeping these for backward compatibility so other files don't break immediately
export const products = ProductService.getAll();
export function getProduct(slug: string): Product | undefined {
  return ProductService.getBySlug(slug);
}
