import { create } from "zustand";
import { PHOTO_GET } from "../api/api";
import { devtools } from "zustand/middleware";

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Store corrigida com DevTools middleware
export const useStorePhoto = create(
  devtools((set, get) => ({
    data: null,
    loading: false,
    error: null,

    fetchPhotos: async (id) => {
      set({ loading: true, error: null });
      try {
        const { url, options } = PHOTO_GET(id); // Certifique-se que PHOTO_GET está retornando corretamente
        const response = await fetch(url, options);  
        const result = await response.json();
        if (response.ok === false) {
          throw new Error("Erro ao buscar fotos: " + result.message);
        }
        set(() => ({ data:  result, loading: false, error: null }));
      } catch (e) {
        set({ error: e.message, loading: false });
      }
    },
  }), { name: "photos" }) // Usar DevTools com nome "photos"
);
