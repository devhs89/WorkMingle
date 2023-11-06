import {AuthResponseInterface} from "../interfaces/auth-response.interface";
import {jwtDecode} from "jwt-decode";
import {UserClaimsInterface} from "../interfaces/user-claims.interface";

const decodeAuthToken = (authResp: AuthResponseInterface): UserClaimsInterface | null => {
  try {
    const token = authResp.token;
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

const verifyAuthTokenExpiration = (exp: number) => {
  try {
    const now = new Date().getTime() / 1000;
    return !(!exp || exp < now);
  } catch (e) {
    return false;
  }
};

const confirmRole = (roles: string[], roleToConfirm: string) => roles.map(r => r.toUpperCase()).includes(roleToConfirm.toUpperCase());

export const verifyAppRole = (authResp: AuthResponseInterface, appRole: string) => {
  try {
    const decoded: UserClaimsInterface | null = decodeAuthToken(authResp);
    if (!decoded) return false;
    if (!decoded.exp) return false;
    if (!verifyAuthTokenExpiration(decoded.exp)) return false;
    if (!decoded.roles || decoded.roles.length < 1) return false;
    return confirmRole(decoded.roles, appRole);
  } catch (e) {
    return false;
  }
};
