import {
  Box,
  Text,
  Image,
  Button,
  Divider,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import MonoConnect from "@mono.co/connect.js";
import { useMemo, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  GetAccountId,
  setCurrentAccount,
} from "../../redux/features/Users/accounts";
import { dispatch } from "../../redux/store";
import BranchModal from "../Modals/Branch";
import DeleteBranch from "../Modals/DeleteBranch";

const UnlinkedAccounts = ({ account, user, monoKey }) => {
  const [monoDisabled, setMonoDisabled] = useState(true);
  const [code, setCode] = useState("");
  const [BranchId, setBranchId] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const { isAcctLoading } = useSelector((state) => state.accounts);
  const [deleteModal, setDeleteModal] = useState(false);

  const monoConnect = useMemo(() => {
    if (monoKey !== null) {
      const monoInstance = new MonoConnect({
        onClose: () => setMonoDisabled(false),
        onLoad: () => {
          console.log("Widget loaded successfully");
          setMonoDisabled(false);
        },
        onSuccess: ({ code }) => {
          setCode(code);
        },
        key: monoKey,
      });

      monoInstance.setup();

      return monoInstance;
    }
  }, [monoKey]);

  useEffect(() => {
    const { id } = user;
    const Data = {
      code,
      BranchId,
      id,
    };
    if (code !== "") {
      dispatch(GetAccountId(Data));
    }
  }, [code, user, BranchId]);

  return (
    <Box>
      <Box mt={{ md: "1", lg: "3" }} fontSize="20px" fontWeight="bold" w="100%">
        <Box
          position="relative"
          bg="white"
          borderRadius="7px"
          textColor="black"
          boxShadow="base"
          width="250px"
          h={{ base: "20vh", sm: "17vh" }}
          p="3"
        >
          <Flex justifyContent="space-between">
            <Text onClick={() => dispatch(setCurrentAccount(account))}>
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
                branchId={BranchId}
                isAcctLoading={isAcctLoading}
              />
            </HStack>
          </Flex>

          <Box position="absolute" bottom="0" right="0" p="2">
            <Button
              bg="#182CD1"
              opacity="0.9"
              color="white"
              borderRadius="8px"
              disabled={monoDisabled}
              h="50px"
              w="200px"
              onClick={() => {
                setBranchId(account.branchId);
                monoConnect.open();
              }}
            >
              <Image src="/images/mono.png" w="inherit" h="inherit" />
              <Divider orientation="vertical" colorScheme="#FFFFFF" />
              Connect To Mono
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UnlinkedAccounts;
