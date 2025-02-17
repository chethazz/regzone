"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/cart";
import { currentCart } from "@wix/ecom";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

interface ShoppingCartButtonProps {
    initialData: currentCart.Cart | null;
}

export default function ShoppingCartButton({
    initialData
}: ShoppingCartButtonProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const cartQuery = useCart(initialData);

    const totalQuantity = cartQuery.data?.lineItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setSheetOpen(true)}
            >
                <ShoppingCartIcon />
                <span className="absolute top-0 right-0 flex items-center justify-center text-xs rounded-full size-5 bg-primary text-primary-foreground">
                    {totalQuantity < 10 ? totalQuantity : "9+"}
                </span>
            </Button>
        </div>
    );
}