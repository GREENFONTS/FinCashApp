import UpdateProfileModal from "../Modals/UpdateProfile";
import ChangePasswordModal from "../Modals/ChangePasword";
import UpdateServiceKeysModal from "../Modals/UpdateServiceKeys";
import {
  Box,
  Text,
  HStack,
  Divider,
  VStack,
  Button,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { dispatch } from "../../redux/store";
import { reset } from "../../redux/features/Utils/utils";
import { useAppSelector } from "../../redux/hook";

const DashBoardView = () => {
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const { currentAccountIdentity } = useAppSelector((state) => state.accounts);
  const [tabletViewLower] = useMediaQuery("(min-width: 650px)");
  const [tabletViewUpper] = useMediaQuery("(max-width: 990px)");
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  const [modalState, setModalState] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [keysModalState, setKeysModalState] = useState<boolean>(false);

  return (
    <>
      <Box pl="1">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text
              align="center"
              fontSize="23px"
              fontWeight="600"
              fontFamily="cursive"
            >
              Profile
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
      <VStack alignItems="flex-start" pt="4" spacing="10px">
        <Box>
          <Text fontWeight="700" fontSize="15px">
            FullName
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccountIdentity != null
              ? currentAccountIdentity.fullName
              : user
              ? user.firstName + " " + user.lastName
              : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="15px">
            Gender
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccountIdentity != null
              ? currentAccountIdentity.gender
              : ""}
          </Text>
        </Box>

        <Box>
          <Text fontWeight="700" fontSize="15px">
            BVN
          </Text>
          <Text color="gray" fontSize="13px">
            {currentAccountIdentity != null ? currentAccountIdentity.bvn : ""}
          </Text>
        </Box>
      </VStack>
      <Box pt="3">
        <VStack alignItems="flex-start" spacing="10px" mb="3">
          <HStack>
            <Box>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                <path
                  d="M25.2 14.5L18 18.875L10.8 14.5V12.75L18 17.125L25.2 12.75V14.5ZM25.2 11H10.8C9.801 11 9 11.7788 9 12.75V23.25C9 23.7141 9.18964 24.1592 9.52721 24.4874C9.86477 24.8156 10.3226 25 10.8 25H25.2C25.6774 25 26.1352 24.8156 26.4728 24.4874C26.8104 24.1592 27 23.7141 27 23.25V12.75C27 11.7788 26.19 11 25.2 11Z"
                  fill="#FFAD47"
                />
              </svg>
            </Box>

            <VStack alignItems="flex-start" spacing="3px">
              <Text fontWeight="500">EmailAddress:</Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.email
                  : user
                  ? user.email
                  : ""}
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
                <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                <path
                  d="M12.62 16.79C14.06 19.62 16.38 21.94 19.21 23.38L21.41 21.18C21.69 20.9 22.08 20.82 22.43 20.93C23.55 21.3 24.75 21.5 26 21.5C26.2652 21.5 26.5196 21.6054 26.7071 21.7929C26.8946 21.9804 27 22.2348 27 22.5V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27C21.4913 27 17.1673 25.2089 13.9792 22.0208C10.7911 18.8327 9 14.5087 9 10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9H13.5C13.7652 9 14.0196 9.10536 14.2071 9.29289C14.3946 9.48043 14.5 9.73478 14.5 10C14.5 11.25 14.7 12.45 15.07 13.57C15.18 13.92 15.1 14.31 14.82 14.59L12.62 16.79Z"
                  fill="#FFAD47"
                />
              </svg>
            </Box>

            <VStack alignItems="flex-start" spacing="3px">
              <Text fontWeight="500">Phone No:</Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.phone
                  : ""}
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
                <rect width="36" height="36" rx="8" fill="#FFE4C2" />
                <path
                  d="M18 17.5C17.337 17.5 16.7011 17.2366 16.2322 16.7678C15.7634 16.2989 15.5 15.663 15.5 15C15.5 14.337 15.7634 13.7011 16.2322 13.2322C16.7011 12.7634 17.337 12.5 18 12.5C18.663 12.5 19.2989 12.7634 19.7678 13.2322C20.2366 13.7011 20.5 14.337 20.5 15C20.5 15.3283 20.4353 15.6534 20.3097 15.9567C20.1841 16.26 19.9999 16.5356 19.7678 16.7678C19.5356 16.9999 19.26 17.1841 18.9567 17.3097C18.6534 17.4353 18.3283 17.5 18 17.5ZM18 8C16.1435 8 14.363 8.7375 13.0503 10.0503C11.7375 11.363 11 13.1435 11 15C11 20.25 18 28 18 28C18 28 25 20.25 25 15C25 13.1435 24.2625 11.363 22.9497 10.0503C21.637 8.7375 19.8565 8 18 8Z"
                  fill="#FFAD47"
                />
              </svg>
            </Box>

            <VStack alignItems="flex-start" spacing="3px">
              <Text fontWeight="500">Address:</Text>
              <Text color="gray" fontSize="13px">
                {currentAccountIdentity != null
                  ? currentAccountIdentity.addressLine1
                  : ""}
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <Divider orientation="horizontal" w="100%" />
        <VStack mt="4" spacing="10px">
          <Button
            bg="purple.800"
            color="white"
            onClick={() => setModalState(true)}
          >
            Update Profile
          </Button>
          <UpdateProfileModal
            modalState={modalState}
            setModalState={setModalState}
            user={user!}
            isLoading={isLoading}
          />
          <Button
            bg="purple.800"
            color="white"
            onClick={() => setPasswordModal(true)}
          >
            Change Password
          </Button>
          <ChangePasswordModal
            modalState={passwordModal}
            setModalState={setPasswordModal}
            user={user!}
            isLoading={isLoading}
            error={error}
          />
          <Button
            bg="purple.800"
            color="white"
            onClick={() => setKeysModalState(true)}
          >
            Update Service Keys
          </Button>
          <UpdateServiceKeysModal
            modalState={keysModalState}
            setModalState={setKeysModalState}
            user={user!}
            isLoading={isLoading}
            error={error}
          />
        </VStack>
      </Box>
    </>
  );
};

export default DashBoardView;
