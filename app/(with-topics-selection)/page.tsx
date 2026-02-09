"use client";
import React, { useState, useEffect, use } from "react";
import Headers from "../../components/header/header";
import MansoryLayout from "../../components/layout/mansoryLayout";
import { fetchPhotos } from "../../api/api";

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("nature");

  const fetchData = async () => {
    try {
      setLoading(true);
      const photos = await fetchPhotos(searchQuery, page);
      setList([...list, ...photos]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setList([]); // Reset list when search query changes
    setPage(1); // Reset page to 1
    window.scrollTo(0, 0); // Scroll to top when search query changes
  }, [searchQuery]);

  return (
    <MansoryLayout
      data={list}
      loading={loading}
      onLoadMore={() => setPage((prev) => prev + 1)}
    />
  );
}
