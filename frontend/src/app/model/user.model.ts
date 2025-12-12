export interface IDebugTokenModel {
  id: number;
  role: EUserRoleType;
}

export enum EUserRoleType {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ILoginUserResponse {
  message: string;
  token: string;
}
