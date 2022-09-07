import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import BranchModal from "../Modals/Branch";

const ZeroAccountView = () => {
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  const [modalState, setModalState] = useState(false);
  const { isAcctLoading } = useAppSelector((state) => state.accounts);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {!mobileView && (
        <Flex boxShadow={`0px 0px 3px #222`} p="4">
          <Box w="50%" h="40vh">
            <Image src="/images/NoData.svg" h="inherit" alt="No Account" />
          </Box>
          <Flex
            p="2"
            w="50%"
            alignItems="center"
            alignContent="center"
            fontSize="13px"
          >
            <Box textAlign="center">
              <Text mb="5">Let's Link up your Accounts 😋</Text>
              <Button
                bg="purple.700"
                color="white"
                onClick={() => setModalState(true)}
              >
                Create an Account Branch
              </Button>
              <BranchModal
                user={user!}
                setModalState={setModalState}
                modalState={modalState}
                account={null}
                updateModal={false}
                isAcctLoading={isAcctLoading}
              />
            </Box>
          </Flex>
        </Flex>
      )}

      {mobileView && (
        <Box boxShadow={`0px 0px 3px #222`} p="4">
          <Box>
            <Center>
              <Image src="/images/NoData.svg" h="30vh" alt="No Account" />
            </Center>
          </Box>

          <Box>
            <Text mb="5" align="center">
              Let's Link up your Accounts 😋
            </Text>
            <Center>
              <Button
                bg="purple.700"
                color="white"
                onClick={() => setModalState(true)}
              >
                Create an Account Branch
              </Button>
              <BranchModal 
                user={user!}
                setModalState={setModalState}
                modalState={modalState}
                isAcctLoading={isAcctLoading}
                updateModal={false}
                account={null}/>
            </Center>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ZeroAccountView;
