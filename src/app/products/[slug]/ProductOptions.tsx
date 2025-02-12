import { Label } from "@/components/ui/label";
import { products } from "@wix/stores";

interface ProductOptionsProps {
    product: products.Product;
}

export default function ProductOptions({
    product
}: ProductOptionsProps) {
    return (
        <div className="space-y-2.5">
            {product.productOptions?.map(option => (
                <fieldset key={option.name} className="space-y-1.5">
                    <legend>
                        <Label asChild>
                            <span>
                                {option.name}
                            </span>
                        </Label>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {option.choices?.map(choice => (
                                <div key={choice.description}>
                                    <input
                                        type="radio"
                                        id={choice.description}
                                        name={option.name}
                                        value={choice.description}
                                        className="hidden peer"
                                    />
                                    <Label
                                        htmlFor={choice.description}
                                        className="flex items-center justify-center min-w-14 gap-1.5 border p-2 peer-checked:border-primary"
                                    >
                                        {option.optionType === products.OptionType.color && (
                                            <span
                                                className="border rounded-full size-4"
                                                style={{ backgroundColor: choice.value }}
                                            />
                                        )}
                                        <span>{choice.description}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </legend>
                </fieldset>
            ))}
        </div>
    );
}