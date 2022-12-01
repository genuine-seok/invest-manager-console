import { AxiosInstance, AxiosResponse } from "axios";

import { UserSettingResponseDTO, UserSettingType, UsersType } from "../types";
import { TokenRepository } from "./TokenRepository";

interface UserService {
  getUsers: (params?: any) => Promise<AxiosResponse<UsersType, any>>;
  // TODO: 사용자 상세 정보 인자 확인
  //   getUser: (id: number) => Promise<ResultState>;
  getUserSettings: () => Promise<AxiosResponse<UserSettingResponseDTO, any>>;
  // TODO: return 타입 정의하기
}

export class UserServiceImp implements UserService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  // TODO: 만료된 토큰에 대한 처리 로직 추가
  async getUsers(params?: any): Promise<AxiosResponse<UsersType, any>> {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<UsersType>("/users", {
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

  async getUserSettings(): Promise<AxiosResponse<UserSettingResponseDTO, any>> {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<Array<UserSettingType>>(
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
