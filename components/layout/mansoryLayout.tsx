import React, { useEffect, useMemo } from "react";

import Image from "next/image";
import { useIntersectionObserver, useWindowSize } from "@uidotdev/usehooks";
import { RiLoader4Line } from "@remixicon/react";
import { mapDataColumns } from "@/utils/mapDataColumns";
import ImageLayout from "../imageLayout";

interface LayoutProps extends React.PropsWithChildren<{}> {
  data: any[];
  loading?: boolean;
  error?: string;
  onLoadMore?: () => void;
  onSearch?: (query: string) => void;
}

const MansoryLayout: React.FC<LayoutProps> = (props) => {
  const { data, loading } = props;
  const windowSize = useWindowSize();
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  // useIntersectionObserver is used to trigger onLoadMore when the user scrolls to the bottom of the page
  const formatDataByIndex = useMemo(() => {
    return mapDataColumns(data, windowSize.width || 0);
  }, [windowSize, data.length]);

  useEffect(() => {
    if (entry?.isIntersecting && props.onLoadMore) {
      props.onLoadMore();
    }
  }, [entry]);

  return (
    <div className="p-4 py-4 m-auto">
      <div className="flex gap-2">
        {formatDataByIndex.map((column: any, index) => (
          <div key={index} className="flex flex-1 flex-col gap-2">
            {column.map((item: any) => (
              <div
                key={item.id}
                className="rounded-lg border border-neutral-200 overflow-hidden"
              >
                <ImageLayout item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={ref} className="h-4" />
      {loading && data.length > 0 && (
        <div className="flex justify-center gap-2 text-neutral-600">
          <RiLoader4Line className="animate-spin" /> <p>Loading more...</p>
        </div>
      )}
    </div>
  );
};

export default MansoryLayout;
