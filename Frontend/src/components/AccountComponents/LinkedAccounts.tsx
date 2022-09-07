import { Box, Text, Flex, HStack, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AccountModel } from "../../models/accounts";
import { UserModel } from "../../models/auth";
import {
  GetAccountInfo,
  GetAccountTransactions,
  setCurrentAccount,
} from "../../redux/features/Users/accounts";
import { useAppSelector } from "../../redux/hook";
import { dispatch } from "../../redux/store";
import BranchModal from "../Modals/Branch";
import DeleteBranch from "../Modals/DeleteBranch";

type Props = {
  account: AccountModel,
  user : UserModel
}


const LinkedAccounts : React.FC<Props> = ({ account, user }) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const { isAcctLoading } = useAppSelector((state) => state.accounts);
  const [BranchId, setBranchId] = useState<string>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const GetTransactionsHandler = (account : AccountModel) => {
    const { branchId } = account;
    dispatch(GetAccountTransactions(branchId));
    dispatch(GetAccountInfo(branchId));
  };

  return (
    <Box
      bg="purple.800"
      borderRadius="7px"
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer",
      }}
      textColor="white"
      boxShadow="base"
      fontSize={{base:"15px", sm:"20px"}}
      width="-moz-fit-content"
      h={{ base: "6vh", sm: "8vh"}}
      p="3"
    >
      <Flex justifyContent="space-between">
        <Text
          onClick={() => {
            GetTransactionsHandler(account);
            dispatch(setCurrentAccount(account));
          }}
        >
          {account.branchName}
        </Text>
        <HStack ml="4" spacing="3px">
          <Icon
            as={FaEdit}
            onClick={() => {
              setUpdateModal(true);
            }}
          />
          <BranchModal
            account={account}
            user={user}
            setModalState={setUpdateModal}
            modalState={updateModal}
            updateModal={updateModal}
            isAcctLoading={isAcctLoading}
          />

          <Icon
            as={FaTrash}
            onClick={() => {
              setBranchId(account.branchId);
              setDeleteModal(true);
            }}
          />
          <DeleteBranch
            user={user}
            setDeleteModal={setDeleteModal}
            deleteModal={deleteModal}
            branchId={BranchId!}
            isAcctLoading={isAcctLoading}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default LinkedAccounts;
