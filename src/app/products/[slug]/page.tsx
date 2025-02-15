import { getWixServerClient } from "@/lib/wix-server.base";
import { getProductBySlug } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

interface PageProps {
    params: Promise<{ slug: string; }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const slug = (await params).slug;
    const product = await getProductBySlug(await getWixServerClient(), slug);

    if (!product) notFound();

    const mainImage = product.media?.mainMedia?.image;

    return {
        title: product.name,
        description: "Get this product on Regzone",
        openGraph: {
            images: mainImage?.url
                ? [
                    {
                        url: mainImage.url,
                        width: mainImage.width,
                        height: mainImage.height,
                        alt: mainImage.altText || ""
                    }
                ] : undefined
        }
    };
}

export default async function Page({ params }: PageProps) {

    const slug = (await params).slug;

    const product = await getProductBySlug(await getWixServerClient(), slug);

    if (!product) notFound();

    return (
        <main className="px-5 py-5 mx-auto space-y-10 max-w-7xl">
            <ProductDetails product={product} />
        </main>
    );
}