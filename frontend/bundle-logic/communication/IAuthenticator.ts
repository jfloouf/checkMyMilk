import { MResponse } from "../../model/Response";
export interface IAuthenticator {
  minUsernameLength?: number;
  maxUsernameLength?: number;

  minPasswordLength?: number;
  maxPasswordLength?: number;

  signInWithCredentials(
    username: string,
    password: string
  ): Promise<MResponse<any, any, any, any>>;

  /* register?(
    username: string,
    password: string
  ): Promise<MResponse<any, any, any, any>>; */
}
