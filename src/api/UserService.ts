import { AxiosInstance, AxiosResponse } from "axios";

import {
  UserRequestParams,
  UserResponseDTO,
  UserSettingResponseDTO,
} from "../types";
import { TokenRepository } from "./TokenRepository";

interface UserService {
  getUsers: (
    params?: UserRequestParams
  ) => Promise<AxiosResponse<UserResponseDTO[], UserRequestParams>>;
  getUserSettings: () => Promise<AxiosResponse<UserSettingResponseDTO[], any>>;
}

export class UserServiceImp implements UserService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async getUsers(
    params?: UserRequestParams
  ): Promise<AxiosResponse<UserResponseDTO[], UserRequestParams>> {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<UserResponseDTO[]>("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return res;
  }

  async getUserSettings(): Promise<
    AxiosResponse<UserSettingResponseDTO[], any>
  > {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<UserSettingResponseDTO[]>(
      "/userSetting",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  }
}
