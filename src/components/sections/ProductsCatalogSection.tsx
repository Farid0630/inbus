import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProductSlider } from "@/components/ProductSlider";
import { ProductService } from "@/lib/products";

export async function ProductsCatalogSection() {
  const tHome = await getTranslations("home");
  const products = ProductService.getAll();

  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow={tHome("productsEyebrow")}
          title={tHome("productsTitle")}
          subtitle={tHome("productsSubtitle")}
        />

        {/* Mobile: horizontal snap slider with pop-up effect */}
        <div className="-mx-4 sm:hidden">
          <ProductSlider />
        </div>

        {/* Tablet+: normal 2-3 column grid */}
        <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.slug} className="flex h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
