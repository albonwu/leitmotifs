import { atom } from "recoil";

export interface AuthState {
  user: boolean
}

const defaultAuthState: AuthState = {
  user: false
};

export const AuthState = atom<AuthState>({
  key: "AuthState",
  default: defaultAuthState,
});