import { atom } from "recoil";

export interface AuthState {
  view: "login" | "signup" | "resetPassword";
}

const defaultModalState: AuthState = {
  view: "signup",
};

export const AuthState = atom<AuthState>({
  key: "AuthState",
  default: defaultModalState,
});