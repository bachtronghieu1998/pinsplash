import { log } from "console";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "N-9qxsIAjuOddPgwEnZgGcbRDzvMO9cbBbOW5pAOe6s",
  // accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
  //accessKey: "mJCaWk1IBby9-dvfPcvTns5JOEqiBPiE86yv3oflXXo",
});

export const fetchPhotos = async (query: string, page: number) => {
  try {
    const response = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 10,
    });

    if (response.errors) {
      throw new Error(response.errors.join(", "));
    }

    return response.response?.results || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const getTopis = async (): Promise<any[]> => {
  try {
    const response = await unsplash.topics.list({ page: 1, perPage: 30 });

    if (response.errors) {
      throw new Error(response.errors.join(", "));
    }

    return response.response?.results || [];
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};
