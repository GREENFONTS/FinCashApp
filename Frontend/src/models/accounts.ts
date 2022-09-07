export interface Accounts {
  accounts: AccountModel[] | null;
  isAcctLoading: boolean;
  error: string | null;
  currentAccountId: string | null;
  currentAccountInfo: AccountInfo | null;
  currentAccountIdentity: AccountIdentity | null;
  currentAccount: AccountModel | null;
  Transactions: TransactionModel[] | null;
  AllTransactions: TransactionModel[] | null;
  RecentTransactions: TransactionModel[] | null;
  filteredTransactions: TransactionModel[];
  time: string | null;
  creditAmount: string | null;
  debitAmount: string | null;
  creditTrans: TransactionModel[];
  debitTrans: TransactionModel[];
}

export interface AccountModel {
  branchId: string;
  branchName: string;
  address: string;
  description: string;
  userId: string;
  accountId: string;
}

export interface TransactionModel {
  amount: number;
  balance: number | null;
  currency: string;
  date: string;
  narration: string;
  type: string;
  _id: string;
}

export interface AccountIdData {
  BranchId: string;
  code: string;
  id: string;
}

export interface AccountIdentity {
  fullName: string;
  gender: string;
  bvn: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
}

export interface AccountInfo{
  accountNumber :string,
  type: string
}
