import { TransactionModel } from "../models/accounts";
import { accountSetState } from "../redux/features/Users/accounts";
import { dispatch } from "../redux/store";

export const ParseTransactions = (
  transactions : TransactionModel[] | null,
  allTransactions : TransactionModel[] | null,
  recentTransactions : TransactionModel[] | null,
) => {
  dispatch(
    accountSetState({ transactions, allTransactions, recentTransactions }),
  );
};

export const ExtractTransactions = (transactions : TransactionModel[]) => {
  const TransactionsCopy = [...transactions];

  const sortedTrans = TransactionsCopy.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );

  return sortedTrans.slice(0, 20);
};

export const TransAmount = (transactions : TransactionModel[]) => {
  let totalDebit = 0;
  let totalCredit = 0;

  if (transactions.length > 0) {
    transactions.forEach((trans) => {
      if (trans.type === "credit") {
        totalCredit += trans.amount;
      } else {
        totalDebit += trans.amount;
      }
    });
  }

  totalCredit = Math.round(totalCredit / 100);
  totalDebit = Math.round(totalDebit / 100);

  return { totalCredit, totalDebit };
};

export const TotalTransAmount = (transactions : TransactionModel[]) => {
  let totalDebit = 0;
  let totalCredit = 0;
  let balance = 0;

  if (transactions.length > 0) {
    transactions.forEach((trans) => {
      if (trans.type === "credit") {
        totalCredit += trans.amount;
      } else {
        totalDebit += trans.amount;
      }
    });
  }

  totalCredit = Math.round(totalCredit / 100);
  totalDebit = Math.round(totalDebit / 100);
  balance = totalCredit - totalDebit;

  let debitPercent = ((totalDebit / totalCredit) * 100).toFixed(1)
  let balancePercent = ((balance / totalCredit) * 100).toFixed(1)

  return { totalCredit, totalDebit, balance, debitPercent, balancePercent };
};

const GetDays = (timeString: string) => {
  let days = 0;
  switch (timeString) {
    case "1day":
      days = 1;
      break;
    case "7days":
      days = 7;
      break;
    case "1month":
      days = 30;
      break;
    case "3months":
      days = 90;
      break;
    case "6months":
      days = 180;
      break;
    case "1year":
      days = 365;
      break;
    default:
      days = 365;
  }
  return days;
};

export const DatedTransactions = (transactions : TransactionModel[], time : string) => {
  let Transactions : TransactionModel[] = [];
  let range = GetDays(time);
  let date :any = new Date();
  date = date.setDate(date.getDate() - range);
  if (transactions.length > 0) {
    transactions.forEach((trans) => {
      let transDate:any = new Date(trans.date);
      transDate = transDate.getTime();
      if (transDate > date) {
        Transactions.push(trans);
      }
    });
  }
  return Transactions;
};
