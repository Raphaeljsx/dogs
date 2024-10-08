import { create } from "zustand";
import { PHOTO_GET, TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../api/api";
import { devtools } from "zustand/middleware";

export const useStoreToken = create(devtools((set, get) => ({
  token: window.localStorage.getItem('token') || null,
  loading: false,
  error: null,

  fetchToken: async (user) => {
    set({ loading: true, error: null });
    try {
      const { url, options } = TOKEN_POST(user);
      const response = await fetch(url, options);
      const result = await response.json();
      if (response.ok === false) {
        throw new Error("Erro ao autenticar: " + result.message);
      }
      set(() => ({ token: result.token, loading: false, error: null }));
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  resetTokenState: () => { set({ token: null, loading: false, error: null }) },

}), { name: "Token" }));

export const useStoreUser = create(devtools((set, get) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async (token) => {
    set({ loading: true, error: null });
    try {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok === false) {
        throw new Error("Erro ao logar: " + result.message);
      }
      set(() => ({ user: result, loading: false, error: null }));
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },
  resetUserState: () => { set({ user: null, loading: false, error: null }) },
})), { name: "user" });


export const userLogin = async (user) => {

  const getToken = useStoreToken.getState().fetchToken;
  const getUser = useStoreUser.getState().fetchUser;

  try {
    await getToken(user);
    const tokken = await useStoreToken.getState().token;

    if (tokken){
      window.localStorage.setItem('token', tokken);
      await getUser(tokken);
    } 
  } catch (e) {
    throw new Error("Erro ao logar: " + e.message);
  }
}

export const userLogout = async () => {
  const getResetUser = useStoreUser.getState().resetUserState;
  const getResetToken = useStoreToken.getState().resetTokenState;
  await getResetToken();
  await getResetUser();
  window.localStorage.removeItem('token');
}

export const autoLogin = () =>{
  const { token } = useStoreToken.getState();
  const { fetchUser, error } = useStoreUser.getState();

  if(token){
    fetchUser(token);
    if(error) userLogout();
  }
}


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
        set(() => ({ data: result, loading: false, error: null }));
      } catch (e) {
        set({ error: e.message, loading: false });
      }
    },
  }), { name: "photos" }) // Usar DevTools com nome "photos"
);
