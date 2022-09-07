import React from "react";
import { useEffect, useState } from "react";
import {
  GetAccounts,
  GetAllTransactions,
} from "../redux/features/Users/accounts";
import { ParseTransactions } from "../Utils/Transactions";

import {
  Flex,
  Box,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Button,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/shared/TableComponent";
import ZeroAccountView from "../components/AccountComponents/ZeroAccountView";
import UnlinkedAccounts from "../components/AccountComponents/UnlinkedAccounts";
import LinkedAccounts from "../components/AccountComponents/LinkedAccounts";
import BranchModal from "../components/Modals/Branch";
import FilterTableComponent from "../components/AccountComponents/FilterTableComponent";
import Stats from "../components/AccountComponents/stats";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { AccountModel, TransactionModel } from "../models/accounts";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const tabColor = useColorModeValue("white", "gray.800");
  const [tabletViewLower] = useMediaQuery("(min-width: 650px)");
  const [tabletViewUpper] = useMediaQuery("(max-width: 990px)");
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  const { user, monoKey } = useAppSelector((state) => state.auth);
  const {
    accounts,
    isAcctLoading,
    creditTrans,
    debitTrans,
    RecentTransactions,
    AllTransactions,
  } = useAppSelector((state) => state.accounts);
  const [modalState, setModalState] = useState<boolean>(false);
  const [unLinkedAccounts, setUnlinkedAccounts] = useState<AccountModel[]>([]);
  const [linkedAccounts, setLinkedAccounts] = useState<AccountModel[]>([]);

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
    if (user) {
      const { id } = user;

      dispatch(GetAccounts(id));
    } else {
      nav("/SignIn");
    }
  }, []);

  useEffect(() => {
    let unlinkedAccounts = [];
    let linkedAccounts = [];
    if (accounts) {
      unlinkedAccounts = accounts.filter((account) => account.accountId === "");
      linkedAccounts = accounts.filter((account) => account.accountId !== "");
      setUnlinkedAccounts(unlinkedAccounts);
      setLinkedAccounts(linkedAccounts);

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
    <>
      <Box
        bg={bgColor}
        p={{ base: "2", lg: "5" }}
        mb={{ base: "3", sm: "5" }}
        h="100vh"
      >
        <Box mt={{ base: "2", lg: "5" }}>
          <Text
            fontFamily="cursive"
            fontSize={{ base: "12px", sm: "15px", lg: "20px" }}
          >
            Hello {user ? user.userName : ""}, Welcome back 👋🏻
          </Text>
          <Text
            fontSize={{ base: "25px", sm: "30px", lg: "35px" }}
            fontWeight="bold"
          >
            Your Accounts Today
          </Text>
        </Box>

        <Stats />

        <Box
          mt={{ base: "2", sm: "5" }}
          fontSize={{ base: "18px", sm: "20px" }}
          fontWeight="bold"
          w="100%"
        >
          {accounts != null ? (
            <>
              {accounts.length == 0 ? (
                <>
                  <ZeroAccountView />
                </>
              ) : (
                <>
                  <Box justifyContent="space-between" flexWrap="wrap">
                    <Text mb={{ sm: "2", lg: "5" }}>
                      UnLinked Accounts -{" "}
                      {accounts != null ? unLinkedAccounts.length : ""}
                    </Text>
                    <>
                      <Flex>
                        {unLinkedAccounts.map((account) => {
                          return (
                            <UnlinkedAccounts
                              account={account}
                              user={user}
                              monoKey={monoKey}
                              key={account.branchId}
                            />
                          );
                        })}
                      </Flex>

                      <Text mb="5">
                        Linked Accounts -{" "}
                        {accounts != null ? linkedAccounts.length : ""}
                      </Text>
                      <Flex
                        justifyContent="space-between"
                        p="2"
                        w={{ sm: "100%" }}
                      >
                        {linkedAccounts.map((account) => {
                          return (
                            <LinkedAccounts
                              key={account.branchId}
                              account={account}
                              user={user!}
                            />
                          );
                        })}

                        <Box>
                          <Button
                            bg="purple.800"
                            onClick={() => setModalState(true)}
                            borderRadius="9px"
                            _hover={{
                              transform: "scale(1.05)",
                              cursor: "pointer",
                            }}
                            textColor="white"
                            fontSize={{ base: "15px" }}
                            boxShadow="base"
                            width="-moz-fit-content"
                            h={{ base: "6vh", sm: "8vh" }}
                            p="3"
                          >
                            Add new Account
                          </Button>
                          <BranchModal
                            user={user!}
                            setModalState={setModalState}
                            modalState={modalState}
                            isAcctLoading={isAcctLoading}
                            updateModal={false}
                            account={null}
                          />
                        </Box>
                      </Flex>
                    </>
                  </Box>
                </>
              )}
            </>
          ) : (
            <>
              <Stats />
            </>
          )}
        </Box>

        <Box mt={{ base: "2", sm: "1", lg: "5" }} p="2" w={{ sm: "100%" }}>
          <Box textAlign="center" mb="5">
            <Text fontSize={{ base: "20px", sm: "25px" }} fontWeight="bold">
              Account Transactions
            </Text>
          </Box>

          <Box
            bg={tabColor}
            borderRadius="8"
            boxShadow="base"
            p={{ base: "2", sm: "3", lg: "5" }}
            w="100%"
          >
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
                  {((tabletViewLower && tabletViewUpper) || mobileView) && (
                    <FilterTableComponent />
                  )}
                  <TableComponent transactions={creditTrans} />
                </TabPanel>

                <TabPanel>
                  {((tabletViewLower && tabletViewUpper) || mobileView) && (
                    <FilterTableComponent />
                  )}
                  <TableComponent transactions={debitTrans} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Accounts;
