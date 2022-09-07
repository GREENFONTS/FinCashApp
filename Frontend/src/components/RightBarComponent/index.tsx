import React, { useEffect } from "react";
import { Container, useColorModeValue } from "@chakra-ui/react";
import { DatedTransactions, TransAmount } from "../../Utils/Transactions";
import {
  GetAccountIdentity,
  setfilteredTransactions,
  setfilteredTransAmount,
  setTypeTransactions,
} from "../../redux/features/Users/accounts";
import { useLocation } from "react-router-dom";
import DashBoardView from "./DashboardView";
import AccountsView from "./AccountsView";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { TransactionModel } from "../../models/accounts";

const RightSidebarWrapper = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const bgColor = useColorModeValue("white", "gray.800");
  const { Transactions, time, filteredTransactions, accounts } = useAppSelector(
    (state) => state.accounts,
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (Transactions) {
      let { totalCredit, totalDebit } = TransAmount(Transactions);
      dispatch(setfilteredTransAmount({ totalCredit, totalDebit }));
    }
    if (user !== null) {
      const { id } = user;
      if (accounts !== null) {
        if (accounts.length !== 0) {
          dispatch(GetAccountIdentity(id));
        }
      }
    }
  }, []);

  
  useEffect(() => {
    if (accounts !== null) {
      if (accounts.length !== 0) {
        if (time !== null) {
          if (Transactions) {
            let filteredTrans : TransactionModel[] = DatedTransactions(Transactions, time);

            dispatch(setfilteredTransactions(filteredTrans));
          }
        }
      }
    }
  }, [time, accounts, Transactions]);

  useEffect(() => {
    if (filteredTransactions) {
      let { totalCredit, totalDebit } = TransAmount(filteredTransactions);

      dispatch(setfilteredTransAmount({ totalCredit, totalDebit }));

      const creditTrans = filteredTransactions.filter(
        (transaction) => transaction.type === "credit",
      );
      const debitTrans = filteredTransactions.filter(
        (transaction) => transaction.type === "debit",
      );
      dispatch(setTypeTransactions({ debitTrans, creditTrans }));

    }
  }, [filteredTransactions]);

  return (
    <>
      {pathname == "/accounts" && (
        <Container bg={bgColor} h="100vh" py="1rem" m="0" overflowY="scroll">
          <AccountsView />{" "}
        </Container>
      )}
    {pathname == "/dashboard" && (<Container bg={bgColor} h="100vh" py="1rem" m="0" overflowY="scroll"><DashBoardView /></Container>)}
    </>
  );
};

export default RightSidebarWrapper;
