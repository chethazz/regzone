import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "./WixImage";

interface ProductProps {
    product: products.Product;
}

export default function Product({
    product
}: ProductProps) {

    const mainImage = product.media?.mainMedia?.image;

    return (
        <Link
            href={`/products/${product.slug}`}
            className="h-full border"
        >
            <div className="overflow-hidden">
                <WixImage
                    mediaIdentifier={mainImage?.url}
                    alt={mainImage?.altText || ""}
                    width={700}
                    height={700}
                    className="transition-transform duration-300 hover:scale-110"
                />
            </div>
            <div className="p-3 space-y-3">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <div
                    className="line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: product.description || "" }}
                />
            </div>
        </Link>
    );
}