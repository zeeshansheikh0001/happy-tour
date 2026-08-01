import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

import { NextImageSrc } from '../../types/common';

type MyImageProps = Omit<ImageProps, 'src'> & {
    icon: NextImageSrc;
    fallBackImage?: NextImageSrc;
    priority?: Boolean;
};

const ImageContainer = (props: MyImageProps) => {
    const { icon, fallBackImage, priority = false, ...all } = props;
    const [imgSrc, setImgSrc] = useState<NextImageSrc>(icon);

    useEffect(() => {
        setImgSrc(icon);
    }, [icon]);

    if (priority)
        return <Image {...all} src={imgSrc} priority onError={() => setImgSrc(fallBackImage!)} />;

    if (typeof imgSrc === 'object') {
        const imgPathBreakup = imgSrc.src.split('.');
        const imgType = imgPathBreakup[imgPathBreakup.length - 1];

        const supportedImgTypes = ['jpg', 'png', 'webp', 'avif'];

        if (supportedImgTypes.includes(imgType))
            return (
                <Image
                    {...all}
                    src={imgSrc}
                    loading="lazy"
                    onError={() => setImgSrc(fallBackImage!)}
                    placeholder="blur"
                    blurDataURL={imgSrc?.blurDataURL}
                />
            );
    }

    return <Image {...all} src={imgSrc} loading="lazy" onError={() => setImgSrc(fallBackImage!)} />;
};

export default ImageContainer;
