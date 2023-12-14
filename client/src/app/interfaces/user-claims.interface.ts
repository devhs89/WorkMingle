import {JwtPayload} from "jwt-decode";

export interface UserClaimsInterface extends JwtPayload {
  userId?: string;
  email?: string;
  roles?: string[];
  memberId?: string;
  activeMember?: boolean;
}
