import {
  Flex,
  Box,
  Text,
  Image,
  Link,
  Button,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import AddServiceKeysModal from "../Modals/AddServiceKeys";

const AddServiceKeysView = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [modalState, setModalState] = useState<boolean>(false);
  const [mobileView] = useMediaQuery("(max-width: 650px)");

  return (
    <>
    {!mobileView && (
      <Flex boxShadow={`0px 0px 3px #222`} p="5">
        <Box w="50%" h="40vh">
          <Image src="/images/NoData.svg" h="inherit" alt="No Account" />
        </Box>
        <Box p="2" w="50%" alignItems="center" alignContent="center">
          <Text>Let's Link Up your Accounts😋</Text>
          <Text>
            &emsp; - Create an Account with{" "}
            <Link
              href="https://app.mono.co/signup"
              target="_blank"
              color="purple.700"
            >
              Mono
            </Link>
          </Text>
          <Text>&emsp; - Create an App and set to Live</Text>
          <Text>&emsp; - Copy the Secret and private keys</Text>

          <Box mt="5">
            <Button
              bg="purple.700"
              color="white"
              onClick={() => setModalState(true)}
            >
              Store Keys
            </Button>

            <AddServiceKeysModal
              modalState={modalState}
              setModalState={setModalState}
              user={user!}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Flex>
    )}

      {mobileView && (
        <Box  boxShadow={`0px 0px 3px #222`} p="5">
          <Box w="100%" >
            <Center>
            <Image src="/images/NoData.svg" h="30vh" w="inherit" alt="No Account" />
            </Center>
           
          </Box>
          <Box p="2" alignItems="center" alignContent="center" fontSize="15px">
            <Text>Let's Link Up your Accounts😋</Text>
            <Text>
              &emsp; - Create an Account with{" "}
              <Link
                href="https://app.mono.co/signup"
                target="_blank"
                color="purple.700"
              >
                Mono
              </Link>
            </Text>
            <Text>&emsp; - Create an App and set to Live</Text>
            <Text>&emsp; - Copy the Secret and private keys</Text>

            <Box mt="5">
              <Button
                bg="purple.700"
                color="white"
                onClick={() => setModalState(true)}
              >
                Store Keys
              </Button>

              <AddServiceKeysModal
                modalState={modalState}
                setModalState={setModalState}
                user={user!}
                isLoading={isLoading}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddServiceKeysView;
