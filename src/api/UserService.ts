import { AxiosInstance, AxiosResponse } from "axios";

import { UsersData } from "../types";
import { TokenRepository } from "./TokenRepository";

interface UserService {
  getUsers: (params?: any) => Promise<AxiosResponse<UsersData, any>>;
  // TODO: 사용자 상세 정보 인자 확인
  //   getUser: (id: number) => Promise<ResultState>;
}

export class UserServiceImp implements UserService {
  private httpClient;

  private tokenRepository;

  constructor(httpClient: AxiosInstance, tokenRepository: TokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async getUsers(params?: any): Promise<AxiosResponse<UsersData, any>> {
    const token = this.tokenRepository.get();
    const res = await this.httpClient.get<UsersData>("/users", {
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
}
