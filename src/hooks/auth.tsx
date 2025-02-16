import api from "@/api";
import { AuthContext } from "@/context/AuthProvider";
import { LoginRequestType } from "@/schemas/auth";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

// Auth state is managed in src/routes/_app.tsx
const loginWithSupabase = async (data: {
  access_token: string;
  refresh_token: string;
}) => {
  const response = await supabase.auth.setSession(data);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data.session;
};

const postLogin = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  const session = await loginWithSupabase(response.data);

  return session;
};

export const useLoginWithPassword = () =>  useMutation({
  mutationFn: (data: LoginRequestType) => postLogin(data),
});
