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
  // TODO: 사용자 상세 정보 인자 확인
  //   getUser: (id: number) => Promise<ResultState>;
  getUserSettings: () => Promise<AxiosResponse<UserSettingResponseDTO[], any>>;
}

export class UserServiceImp implements UserService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  // TODO: 만료된 토큰에 대한 처리 로직 추가
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
    //   console.log(res);
    //   return {
    //     result: "success",
    //     data: res.data,
    //   };
    // } catch (error: unknown) {
    //   return {
    //     result: "fail",
    //     reason: getErrorMessage(error),
    //   };
    // }
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
