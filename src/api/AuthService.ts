import { AxiosInstance } from "axios";

import { AuthDataType, LoginData, ResultState } from "../types";
import { getErrorMessage } from "../utils";
import { TokenRepository } from "./TokenRepository";

interface AuthService {
  signIn: (data: LoginData) => Promise<ResultState>;
  getToken: () => string | null;
  logout: () => void;
}

export class AuthServiceImp implements AuthService {
  private httpClient;

  private tokenRepository;

  // TODO: HttpClient를 class로 확장 (fetch-httpClient)
  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signIn(data: LoginData): Promise<ResultState> {
    try {
      const res = await this.httpClient.post<AuthDataType>("/login", data);
      this.tokenRepository.save(res.data.accessToken);
      return {
        result: "success",
        data: res.data,
      };
    } catch (error: unknown) {
      return {
        result: "fail",
        reason: getErrorMessage(error),
      };
    }
  }

  getToken() {
    return this.tokenRepository.get();
  }

  logout() {
    this.tokenRepository.remove();
  }
}
