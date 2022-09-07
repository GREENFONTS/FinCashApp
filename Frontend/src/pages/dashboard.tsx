import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import { ParseTransactions, TotalTransAmount } from "../Utils/Transactions";
import {
  GetAccountIdentity,
  GetAccounts,
  GetAllTransactions,
} from "../redux/features/Users/accounts";
import TableComponent from "../components/shared/TableComponent";
import { dispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import AddServiceKeysView from "../components/DashboardComponents/AddServiceView";
import Statistics from "../components/DashboardComponents/Stats";
import { useAppSelector } from "../redux/hook";
import { TransactionModel } from "../models/accounts";

const Dashboard = () => {
  const nav = useNavigate();
  const { user, monoKey } = useAppSelector((state) => state.auth);
  const { accounts, AllTransactions, RecentTransactions } = useAppSelector(
    (state) => state.accounts,
  );
  const [creditTrans, setCreditTrans] = useState<TransactionModel[]>([]);
  const [debitTrans, setDebitTrans] = useState<TransactionModel[]>([]);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [debitPercent, setDebitPercent] = useState<string>("");
  const [balancePercent, setBalancePercent] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const tabColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    let transactions: TransactionModel[] | null = JSON.parse(
      localStorage.getItem("transactions")!,
    );
    let allTransactions: TransactionModel[] | null = JSON.parse(
      localStorage.getItem("AllTransactions")!,
    );
    let recentTransactions: TransactionModel[] | null = JSON.parse(
      localStorage.getItem("RecentTransactions")!,
    );

    ParseTransactions(transactions, allTransactions, recentTransactions);

    if (user === null) {
      nav("/SignIn");
    } else {
      dispatch(GetAccounts(user.id));
      dispatch(GetAccountIdentity(user.id));
    }
  }, []);

  useEffect(() => {
    if (RecentTransactions) {
      const CreditTrans = RecentTransactions.filter(
        (transaction) => transaction.type == "credit",
      );
      setCreditTrans(CreditTrans.slice(0, 10));
      const DebitTrans = RecentTransactions.filter(
        (transaction) => transaction.type == "debit",
      );
      setDebitTrans(DebitTrans.slice(0, 10));
    }

    if (AllTransactions) {
      const { totalDebit, totalCredit, balance, debitPercent, balancePercent } =
        TotalTransAmount(AllTransactions);
      setTotalCredit(totalCredit);
      setBalance(balance);
      setTotalDebit(totalDebit);
      setDebitPercent(debitPercent);
      setBalancePercent(balancePercent);
    }
  }, [RecentTransactions, AllTransactions]);

  useEffect(() => {
    if (accounts) {
      if (accounts.length != 0) {
        if (
          (RecentTransactions === null || RecentTransactions.length === 0) &&
          (AllTransactions === null || AllTransactions.length === 0)
        ) {
          user ? dispatch(GetAllTransactions(user.id)) : console.log("");
        }
      }
    }
  }, [accounts]);

  return (
    <Box bg={bgColor} p="5">
      <Box mt="5">
        <Text
          fontFamily="cursive"
          fontSize={{ base: "12px", sm: "15px", lg: "20px" }}
        >
          Hello {user ? user.userName : ""}, Welcome back 👋🏻
        </Text>
        <Text
          pt="3"
          fontSize={{ base: "20px", sm: "30px", lg: "35px" }}
          fontWeight="bold"
        >
          Your Dashboard Today
        </Text>
      </Box>

      <Box
        mt="5"
        fontSize={{ base: "18px", sm: "20px" }}
        fontWeight="bold"
        w="100%"
      >
        {accounts != null ? (
          <>
            {accounts.length == 0 && monoKey === null ? (
              <>
                <AddServiceKeysView />
              </>
            ) : (
              <>
                <Statistics
                  totalCredit={totalCredit}
                  totalDebit={totalDebit}
                  balance={balance}
                  debitPercent={debitPercent}
                  balancePercent={balancePercent}
                />
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>

      <Box mt="5">
        <Box textAlign="center" mb="5" w="80%">
          <Text fontSize="25px" fontWeight="bold">
            Recent Transactions
          </Text>
        </Box>

        <Box bg={tabColor} borderRadius="8" p="5" w="100%">
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                bg="white.200"
                w="50%"
                fontSize="17px"
                fontWeight="600"
                _selected={{
                  color: "black",
                  borderRadius: "7px",
                  boxShadow: "base",
                  bg: "gray.200",
                }}
              >
                Credit
              </Tab>
              <Tab
                bg="white.200"
                w="50%"
                fontSize="17px"
                fontWeight="600"
                _selected={{
                  color: "black",
                  borderRadius: "7px",
                  boxShadow: "base",
                  bg: "gray.200",
                }}
              >
                Debit
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TableComponent transactions={creditTrans} />
              </TabPanel>

              <TabPanel>
                <TableComponent transactions={debitTrans} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
