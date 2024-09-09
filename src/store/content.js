import { create } from "zustand";

export const useContentStore = create((set) => ({
    contentType: "movie/popular",
    setContentType: (type) => set({ contentType: type }),
}));
