import { AxiosInstance } from "axios";
import { ChangePasswordData, LoginData, UserModel } from "../../../models/auth";
import { ServiceKeys } from "../../../models/serviceKeys";

import api from "../axios";

class User {
  constructor(private readonly request: AxiosInstance) {}

  async CreateUser(data: UserModel) {
    return this.request.post("/register", data)
  }

  async UpdateUser(data: UserModel) {
    return this.request.post(`/user/${data.id}`, data)
  }

  async Login(data: LoginData){
    return this.request.post("/login", data)
  }

  async VerifyToken(token: string){
    return this.request.get(`/verifyToken?token=${token}`)
  }

  async AddAccountKeys(data: ServiceKeys){
    return this.request.post('/AddAccountKeys', data)
  }

  async UpdateAccountKeys(data: ServiceKeys){
    return this.request.post('/UpdateAccountKeys', data)
  }
  
  async ChangePassword(data: ChangePasswordData) {
    return this.request.post(`/user/ChangePassword`, data)
  }
}



const UserService = new User(api)

export default UserService
