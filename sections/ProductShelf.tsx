import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @title Products to display
   * @description List of products to be displayed in the shelf
   */
  products: Product[];
  /**
   * @title Navigation arrows
   */
  showArrows?: boolean;
  /**
   * @title Buy button label
   */
  buyButtonText: string;
}

const defaultProps: Props = {
  products: [{
    "@type": "Product",
    "productID": "3507008",
    "name": "Sample Product",
    "description": "Product description",
    "image": [{
      "@type": "ImageObject",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQImWNgYGAAAAAEAAGjChXjAAAAAElFTkSuQmCC",
    }],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": 99.99,
      "highPrice": 99.99,
    }
  }],
  showArrows: true,
  buyButtonText: "Buy Now"
};

export default function ProductShelf(props: Props) {
  props.products ??= defaultProps.products;
  props.showArrows ??= defaultProps.showArrows;
  props.buyButtonText ??= defaultProps.buyButtonText;

  const { products, showArrows, buyButtonText } = props;

  return (
    <div class="w-full">
      <div class="relative flex gap-4 overflow-x-auto">
        {showArrows && (
          <button class="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow">
            &lt;
          </button>
        )}
        {products.map((product) => (
          <div class="min-w-[250px] p-4 border rounded">
            <div class="aspect-square mb-4">
              <Image
                src={product.image?.[0]?.url}
                alt={product.name}
                width={200}
                height={200}
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-lg font-bold mb-2">{product.name}</div>
            <div class="text-sm mb-4">{product.description}</div>
            <div class="text-xl font-bold mb-4">
              {product.offers?.lowPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: product.offers.priceCurrency,
              })}
            </div>
            <button class="w-full bg-black text-white py-2 px-4 rounded">
              {buyButtonText}
            </button>
          </div>
        ))}
        {showArrows && (
          <button class="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow">
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export function Preview() {
  return <ProductShelf {...defaultProps} />;
}