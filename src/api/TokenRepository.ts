export interface TokenRepository {
  save: (token: string) => void;
  get: () => string | null;
  remove: () => void;
}

export class TokenRepositoryImp implements TokenRepository {
  private TOKEN_KEY = "ACCESS_TOKEN";

  save(token: string) {
    // TODO: 방어 로직 추가
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  get() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  remove() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
