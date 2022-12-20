import { AxiosInstance } from "axios";

import { AuthResponseDTO, ResultState, SignInRequestDTO } from "../types";
import { getErrorMessage } from "../utils";
import { TokenRepository } from "./TokenRepository";

interface AuthService {
  signIn: (data: SignInRequestDTO) => Promise<ResultState>;
  getToken: () => string | null;
  logout: () => void;
}

export class AuthServiceImp implements AuthService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signIn(data: SignInRequestDTO): Promise<ResultState> {
    try {
      const res = await this.httpClient.post<AuthResponseDTO>("/login", data);
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
