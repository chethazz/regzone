import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

interface PageProps {
    params: Promise<{ slug: string; }>;
}

export default async function Page({ params }: PageProps) {

    const slug = (await params).slug;

    const product = await getProductBySlug(slug);

    if (!product) notFound();

    return (
        <main className="mx-auto space-y-10 max-w-7xl px-5 py-5">
            <ProductDetails product={product} />
            <pre>
                {JSON.stringify(product, null, 2)}
            </pre>
        </main>
    );
}