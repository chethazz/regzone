import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import { useState } from "react";

interface ProductMediaProps {
    media: products.MediaItem[] | undefined;
}

export default function ProductMedia({
    media
}: ProductMediaProps) {

    const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

    if (!media?.length) return null;

    const selectedImage = selectedMedia?.image;
    const selectedVideo = selectedMedia?.video?.files?.[0];

    return (
        <div className="basis-2/5">
            <div className="aspect-square bg-secondary">
                {selectedImage?.url ? (
                    <WixImage
                        mediaIdentifier={selectedImage.url}
                        alt={selectedImage.altText}
                        width={1000}
                        height={1000}
                    />
                ) : selectedVideo?.url ? (
                    <div className="flex items-center bg-black size-full">
                        <video
                            controls
                            className="size-full"
                        >
                            <source src={selectedVideo.url} type={`video/${selectedVideo.format}`} />
                        </video>
                    </div>
                ) : null}
            </div>

        </div>
    );
}