import { getWixClient } from "@/lib/wix-client.base";
import Link from "next/link";

async function getCart() {
    const wixClient = getWixClient();
    try {
        return await wixClient.currentCart.getCurrentCart();
    } catch (error) {
        if ((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND") {
            return null;
        } else {
            throw error;
        }
    }
}

export default async function Navbar() {
    const cart = await getCart();

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