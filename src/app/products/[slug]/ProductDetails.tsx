"use client";

import Badge from "@/components/ui/badge";
import { checkInStock, findVariant } from "@/lib/utils";
import { products } from "@wix/stores";
import { useState } from "react";
import ProductMedia from "./ProductMedia";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";

interface ProductDetailsProps {
    product: products.Product;
}

export default function ProductDetails({
    product
}: ProductDetailsProps) {

    const [quantity, setQuantity] = useState<Record<string, string>>();

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
        product.productOptions
            ?.map((option) => ({
                [option.name || ""]: option.choices?.[0].description || ""
            }))
            ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
    );

    const selectedVariant = findVariant(product, selectedOptions);

    const inStock = checkInStock(product, selectedOptions);

    return (
        <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <div className="basis-2/5">
                <ProductMedia
                    media={product.media?.items}
                />
            </div>
            <div className="space-y-5 basis-3/5">
                <div className="space-y-2.5">
                    <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
                    {product.brand && (
                        <div className="text-muted-foreground">
                            {product.brand}
                        </div>
                    )}
                    {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}
                </div>
                {product.description && (
                    <div
                        dangerouslySetInnerHTML={{ __html: product.description }}
                        className="prose bg-card dark:prose-invert"
                    />
                )}
                <ProductPrice
                    product={product}
                    selectedVariant={selectedOptions}
                />
                <ProductOptions
                    product={product}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
                <div>
                    Selected options
                    {JSON.stringify(selectedOptions)}
                </div>
                <div>
                    Variant:
                    {JSON.stringify(selectedVariant?.choices)}
                </div>
            </div>
        </div>
    );
}