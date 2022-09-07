import {
  Box,
  Text,
  HStack,
  Divider,
  VStack,
  Select,
  useMediaQuery,
  Flex,
  Button,
} from "@chakra-ui/react";
import { setTime } from "../../redux/features/Users/accounts";
import { reset } from "../../redux/features/Utils/utils";
import { useAppSelector } from "../../redux/hook";
import { dispatch } from "../../redux/store";
const AccountsView = () => {
  const [desktopView] = useMediaQuery("(min-width: 990px)");
  const [tabletViewLower] = useMediaQuery("(min-width: 650px)");
  const [tabletViewUpper] = useMediaQuery("(max-width: 990px)");
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  const {
    Transactions,
    creditAmount,
    debitAmount,
    currentAccount,
    currentAccountInfo,
  } = useAppSelector((state) => state.accounts);

  return (
    <>
      <Box p="2" h={{ md: "4vh", lg: "10vh" }} mb="3">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            {" "}
            <Text
              align="center"
              fontSize={{ md: "17px", lg: "20px" }}
              fontWeight="600"
              fontFamily="cursive"
            >
              {currentAccount != null ? currentAccount.branchName : ""}
            </Text>
          </Box>

          {((tabletViewLower && tabletViewUpper) || mobileView) && (
            <Box>
              <Button
                h={10}
                w={10}
                variant="unstyled"
                onClick={() => dispatch(reset())}
              >
                x
              </Button>
            </Box>
          )}
        </Flex>
      </Box>
      <Divider orientation="horizontal" w="100%" />
      <VStack
        alignItems="flex-start"
        pl="1"
        pt="3"
        spacing={{ base: "20px", lg: "10px" }}
      >
        <Box>
          <Text fontWeight="700" fontSize="13px">
            BranchID
          </Text>
          <Text color="gray" fontSize="13px">
            #{currentAccount != null ? currentAccount.branchId : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="13px">
            Branch Address
          </Text>
          <Text color="gray">
            {currentAccount != null ? currentAccount.address : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="13px">
            Branch Description
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccount != null ? currentAccount.description : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="13px">
            Branch Account Number
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccountInfo != null ? currentAccountInfo.accountNumber : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="13px">
            Branch Account Type
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccountInfo != null ? currentAccountInfo.type : ""}
          </Text>
        </Box>
      </VStack>

      {desktopView && (
        <>
          <Box p="2">
            <HStack spacing="4px">
              <Text w="50%" fontWeight="700" fontSize="13px">
                Recent Activity
              </Text>

              <Select
                w="50%"
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
          </Box>

          <Box pl="1">
            <VStack alignItems="flex-start" spacing="5px">
              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#F3E4FF" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 13C12 12.4696 12.2107 11.9609 12.5858 11.5858C12.9609 11.2107 13.4696 11 14 11C14 11.7956 14.3161 12.5587 14.8787 13.1213C15.4413 13.6839 16.2044 14 17 14H19C19.7956 14 20.5587 13.6839 21.1213 13.1213C21.6839 12.5587 22 11.7956 22 11C22.5304 11 23.0391 11.2107 23.4142 11.5858C23.7893 11.9609 24 12.4696 24 13V24C24 24.5304 23.7893 25.0391 23.4142 25.4142C23.0391 25.7893 22.5304 26 22 26H14C13.4696 26 12.9609 25.7893 12.5858 25.4142C12.2107 25.0391 12 24.5304 12 24V13ZM15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18C14 18.2652 14.1054 18.5196 14.2929 18.7071C14.4804 18.8946 14.7348 19 15 19H15.01C15.2752 19 15.5296 18.8946 15.7171 18.7071C15.9046 18.5196 16.01 18.2652 16.01 18C16.01 17.7348 15.9046 17.4804 15.7171 17.2929C15.5296 17.1054 15.2752 17 15.01 17H15ZM18 17C17.7348 17 17.4804 17.1054 17.2929 17.2929C17.1054 17.4804 17 17.7348 17 18C17 18.2652 17.1054 18.5196 17.2929 18.7071C17.4804 18.8946 17.7348 19 18 19H21C21.2652 19 21.5196 18.8946 21.7071 18.7071C21.8946 18.5196 22 18.2652 22 18C22 17.7348 21.8946 17.4804 21.7071 17.2929C21.5196 17.1054 21.2652 17 21 17H18ZM15 21C14.7348 21 14.4804 21.1054 14.2929 21.2929C14.1054 21.4804 14 21.7348 14 22C14 22.2652 14.1054 22.5196 14.2929 22.7071C14.4804 22.8946 14.7348 23 15 23H15.01C15.2752 23 15.5296 22.8946 15.7171 22.7071C15.9046 22.5196 16.01 22.2652 16.01 22C16.01 21.7348 15.9046 21.4804 15.7171 21.2929C15.5296 21.1054 15.2752 21 15.01 21H15ZM18 21C17.7348 21 17.4804 21.1054 17.2929 21.2929C17.1054 21.4804 17 21.7348 17 22C17 22.2652 17.1054 22.5196 17.2929 22.7071C17.4804 22.8946 17.7348 23 18 23H21C21.2652 23 21.5196 22.8946 21.7071 22.7071C21.8946 22.5196 22 22.2652 22 22C22 21.7348 21.8946 21.4804 21.7071 21.2929C21.5196 21.1054 21.2652 21 21 21H18Z"
                      fill="#8F00FF"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="1px">
                  <Text fontWeight="500">Total Transactions</Text>
                  <Text color="gray" fontSize="13px">
                    {Transactions != null ? Transactions.length : ""}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FFD4D4" />
                    <path
                      d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                      stroke="#FF0000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Debit</Text>
                  <Text color="gray" fontSize="13px">
                    N{debitAmount}
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Box>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#D4FFDA" />
                    <path
                      d="M22.1667 14.6667V24.6667M10.5 11.3333H21.3333H10.5ZM10.5 14.6667H18H10.5ZM10.5 18H15.5H10.5ZM18.8333 18L22.1667 14.6667L18.8333 18ZM22.1667 14.6667L25.5 18L22.1667 14.6667Z"
                      stroke="#008E13"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>

                <VStack alignItems="flex-start" spacing="3px">
                  <Text fontWeight="500">Credit</Text>
                  <Text color="gray" fontSize="13px">
                    N{creditAmount}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

export default AccountsView;
