import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string; }>;
}

export default async function Page({ params }: PageProps) {

    const slug = (await params).slug;

    const product = await getProductBySlug(slug);

    if (!product) notFound;

    return (
        <main className="mx-auto space-y-10 max-w-7xl">
            <pre>
                {JSON.stringify(product, null, 2)}
            </pre>
        </main>
    );
}