import { create } from "zustand";

const useRepoDataStore = create((set) => ({
  repoData: null,
  setRepoData: (data) => set((state) => ({ repoData: data })),
}));

export default useRepoDataStore;
