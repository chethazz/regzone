import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";

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
        <div className="space-y-5 basis-2/5 md:sticky md:top-0 h-fit">
            <div className="aspect-square bg-secondary">
                {selectedImage?.url ? (
                    <Zoom key={selectedImage.url}>
                        <WixImage
                            mediaIdentifier={selectedImage.url}
                            alt={selectedImage.altText}
                            width={1000}
                            height={1000}
                        />
                    </Zoom>
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
            {media.length > 1 && (
                <div className="flex flex-wrap gap-5">
                    {media.map(mediaItem => (
                        <MediaPreview
                            key={mediaItem._id}
                            mediaItem={mediaItem}
                            isSelected={mediaItem._id === selectedMedia?._id}
                            onSelect={() => setSelectedMedia(mediaItem)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface MediaPreviewProps {
    mediaItem: products.MediaItem;
    isSelected: boolean;
    onSelect: () => void;
}

function MediaPreview({
    mediaItem,
    isSelected,
    onSelect
}: MediaPreviewProps) {
    const imageUrl = mediaItem.image?.url;
    const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
    const thumbnailUrl = mediaItem.thumbnail?.url;
    const resolvedThumnailUrl = stillFrameMediaId && thumbnailUrl
        ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
        : undefined;

    if (!imageUrl && !resolvedThumnailUrl) {
        return null;
    }

    return (
        <div className={cn("relative cursor-pointer bg-secondary",
            isSelected && "outline outline-1 outline-primary"
        )}>
            <WixImage
                mediaIdentifier={imageUrl || resolvedThumnailUrl}
                alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
                width={100}
                height={100}
                onClick={onSelect}
            />
            {resolvedThumnailUrl && (
                <span className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 bg-black/30 size-9">
                    <PlayIcon className="size-5 text-white/60" />
                </span>
            )}
        </div>
    );
}