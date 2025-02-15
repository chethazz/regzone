import { getWixServerClient } from "@/lib/wix-client.server";
import { getCart } from "@/wix-api/cart";
import Link from "next/link";

export default async function Navbar() {
    const cart = await getCart(await getWixServerClient());

    const totalQuantity = cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

    return (
        <header className="shadow-sm bg-background">
            <div className="flex items-center justify-between gap-5 p-5 mx-auto max-w-7xl">
                <Link href="/" className="text-xl font-bold">
                    Regzone
                </Link>
                {totalQuantity} Items in your cart
            </div>
        </header>
    );
}