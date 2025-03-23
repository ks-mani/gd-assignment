import { create } from "zustand";

const useFullRepoDataStore = create((set) => ({
  fullRepoData: null,
  setFullRepoData: (data) => set((state) => ({ fullRepoData: data })),
}));

const useMinRepoDataStore = create((set) => ({
  minRepoData: null,
  setMinRepoData: (data) => set((state) => ({ minRepoData: data })),
}));

export { useFullRepoDataStore, useMinRepoDataStore };
