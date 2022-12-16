import { AxiosInstance, AxiosResponse } from "axios";

import { AccountRequestParams, AccountResponseDTO } from "../types";
import { TokenRepository } from "./TokenRepository";

interface AccountService {
  getAccounts: (
    params?: AccountRequestParams
  ) => Promise<AxiosResponse<AccountResponseDTO[], AccountRequestParams>>;
}

export class AccountServiceImp implements AccountService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async getAccounts(params?: AccountRequestParams) {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<AccountResponseDTO[]>("/accounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res;
  }
}
