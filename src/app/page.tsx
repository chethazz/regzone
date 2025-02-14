import banner from "@/assets/banner.jpg";
import Product from "@/components/Product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="px-5 py-10 mx-auto space-y-10 max-w-7xl">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="p-10 space-y-7 md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Your Daily Dose of Glamour.
          </h1>
          <p>
            Invest in pieces you'll love for years to come: explore our curated premium collection
          </p>
          <Button
            asChild
          >
            <Link
              href={"/shop"}
            >
              Discover
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="relative hidden w-1/2 h-full md:block">
          <Image
            src={banner}
            alt="Banner"
            className="object-cover h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  await delay(1000);

  const collection = await getCollectionBySlug("featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts({
    collectionIds: collection._id
  });

  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured products</h2>
      <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col grid-cols-2 gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[24rem] w-full" />
      ))}
    </div>
  );
}