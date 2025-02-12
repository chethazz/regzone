"use client";

import Badge from "@/components/ui/badge";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import { useState } from "react";
import ProductOptions from "./ProductOptions";

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

    return (
        <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <div className="basis-2/5">
                <WixImage
                    mediaIdentifier={product.media?.mainMedia?.image?.url}
                    alt={product.media?.mainMedia?.image?.altText}
                    width={1000}
                    height={1000}
                    className="sticky top-0"
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
                <ProductOptions
                    product={product}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
                <div>
                    Selected options
                    {JSON.stringify(selectedOptions)}
                </div>
            </div>
        </div>
    );
}