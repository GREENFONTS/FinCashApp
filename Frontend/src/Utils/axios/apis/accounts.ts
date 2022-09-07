import { AxiosInstance } from "axios";
import { AccountIdData, AccountModel } from "../../../models/accounts";

import api from "../axios";

class Accounts {
  constructor(private readonly request: AxiosInstance) {}

  async GetAccounts(userId: string) {
    return this.request.get(`/user/branch/?userId=${userId}`);
  }

  async AddAccount(data: AccountModel) {
    return this.request.post("/user/branch/create", data);
  }

  async UpdateAccount(data: AccountModel) {
    return this.request.put(`/user/branch/${data.branchId}`, data);
  }

  async DeleteAccounts(branchId: string) {
    return this.request.delete(`/user/branch/${branchId}`);
  }

  async GetAccountId(data: AccountIdData) {
    return this.request.get(
      `/user/branch/AccountId/${data.BranchId}?code=${data.code}`,
    );
  }

  async GetAccountInfo(branchId: string) {
    return this.request.get(`/user/branch/AccountInfo/${branchId}`);
  }

  async GetAccountIdentity(userId: string) {
    return this.request.get(`/user/branch/AccountIdentity/${userId}`);
  }

  async GetAccountTransactions(branchId: string) {
    return this.request.get(`/user/branch/Transactions/${branchId}`);
  }

  async GetAllTransactions(userId: string) {
    return this.request.get(`/user/branch/AllTransactions/${userId}`);
  }

  async UnlinkAccount(branchId: string) {
    console.log(branchId)
    return this.request.get(`/user/branch/UnlinkAccount/${branchId}`);
  }
}

const AccountService = new Accounts(api);

export default AccountService;
