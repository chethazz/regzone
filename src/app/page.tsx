import banner from "@/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    </main>
  );
}
