"use client";
import { routes } from "@/routes";
import { useHover } from "@uidotdev/usehooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  item: {
    urls: {
      regular: string;
      thumb: string;
    };
    alt_description?: string;
    width: number;
    height: number;
    id: string;
  };
};

const ImageLayout: React.FC<ImageProps> = ({ item, ...props }) => {
  const [ref, isHover] = useHover();
  const router = useRouter();

  return (
    <div
      className="relative w-full h-full"
      ref={ref}
      onClick={() => {
        router.push(routes.photo(item.id));
      }}
    >
      <div className="cursor-pointer overflow-hidden rounded-lg">
        <Image
          src={item?.urls?.regular || ""}
          alt={item?.alt_description || "Image"}
          className="w-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
          loading="lazy"
          placeholder="blur"
          blurDataURL={item?.urls?.thumb}
          quality={80}
          priority={false}
          unoptimized={true}
          width={item?.width || 500}
          height={item?.height || 500}
        />
      </div>

      {isHover && (
        <>
          <div className="absolute bottom-0 left-0 z-10 h-full w-full rounded-lg bg-black opacity-20 cursor-pointer"></div>
          <div className="flex  items-center absolute bottom-0 left-0 right-0 bg-black text-white p-2.5 text-sm">
            <Image
              src={item?.urls?.thumb || ""}
              alt={item?.alt_description || "Thumbnail"}
              className="w-6 h-6 rounded-full mr-2"
              width={32}
              height={32}
              loading="lazy"
            />
            <div className="w-9/10 overflow-hidden text-ellipsis whitespace-nowrap">
              {item?.alt_description || "No description available"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageLayout;
