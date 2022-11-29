import { AxiosInstance, AxiosResponse } from "axios";

import { AccountsData } from "../types";
import { TokenRepository } from "./TokenRepository";

interface AccountService {
  getAccounts: (params?: any) => Promise<AxiosResponse<AccountsData, any>>;
}

export class AccountServiceImp implements AccountService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async getAccounts(params?: any) {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<AccountsData>("/accounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res;
  }
}
