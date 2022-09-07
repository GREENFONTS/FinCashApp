import { Flex, HStack, Box, Text, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  setfilteredTransAmount,
  setTime,
  setTypeTransactions,
} from "../../redux/features/Users/accounts";
import { useAppSelector } from "../../redux/hook";
import { dispatch } from "../../redux/store";
import { DatedTransactions, TransAmount } from "../../Utils/Transactions";

const FilterTableComponent = () => {
  const { Transactions, accounts, debitAmount, creditAmount, time } =
    useAppSelector((state) => state.accounts);

  useEffect(() => {
    if (accounts !== null) {
      if (accounts.length !== 0) {
        if (time !== null) {
          if (Transactions) {
            let filteredTrans = DatedTransactions(Transactions, time);
            const creditTrans = filteredTrans.filter(
              (transaction) => transaction.type === "credit",
            );
            const debitTrans = filteredTrans.filter(
              (transaction) => transaction.type === "debit",
            );
            dispatch(setTypeTransactions({ debitTrans, creditTrans }));

            let { totalCredit, totalDebit } = TransAmount(filteredTrans);
            dispatch(setfilteredTransAmount({ totalCredit, totalDebit }));
          }
        }
      }
    }
  }, [time, accounts, Transactions]);

  return (
    <Flex justifyContent="space-between">
      <HStack spacing={{ base: "5px", sm: "auto" }}>
        <Text fontWeight="600" fontSize={{ base: "12px", sm: "15px" }}>
          Filter:
        </Text>
        <Select
          w={{ base: "60%", sm: "50%" }}
          placeholder="Select range"
          onChange={(e) => dispatch(setTime(e.target.value))}
        >
          <option value="1day">1day</option>
          <option value="7days">7days</option>
          <option value="1month">1month</option>
          <option value="3months">3months</option>
          <option value="6months">6months</option>
          <option value="1year">1year</option>
        </Select>
      </HStack>
      <Box>
        <HStack>
          <Box>
            <HStack>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" rx="8" fill="#FFD4D4" />
                <path
                  d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                  stroke="#FF0000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Text color="gray" fontWeight="600" fontSize="15px">
                N{debitAmount}
              </Text>
            </HStack>
          </Box>

          <Box>
            <HStack>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" rx="8" fill="#D4FFDA" />
                <path
                  d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                  stroke="#008E13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <Text color="gray" fontWeight="600" fontSize="15px">
                N{creditAmount}
              </Text>
            </HStack>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default FilterTableComponent;
