import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  FormControl,
  Input,
  VStack,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { UserModel, ChangePasswordData } from "../../models/auth";
import { ChangePassword } from "../../redux/features/Users/auth";
import { dispatch } from "../../redux/store";
import DashboardAlert from "../shared/DashboardAlert";

type Props = {
  user: UserModel;
  error: string | null;
  isLoading: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
};

const ChangePasswordModal: React.FC<Props> = ({
  user,
  error,
  isLoading,
  modalState,
  setModalState,
}) => {
  const toast = useToast();
  const { onClose } = useDisclosure();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword2, setNewPassword2] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [checkPasswordLength, setCheckPasswordLength] =
    useState<boolean>(false);

  useEffect(() => {
    if (newPassword !== newPassword2 && newPassword2.length > 3) {
      setCheckPassword(true);
    } else setCheckPassword(false);
    if (newPassword.length > 3 && newPassword.length < 8) {
      setCheckPasswordLength(true);
    } else setCheckPasswordLength(false);
  }, [newPassword, newPassword2]);

  const ChangePasswordHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const id = user.id;
    const formBody: ChangePasswordData = {
      userId: id,
      oldPassword,
      newPassword,
    };
    dispatch(ChangePassword(formBody));
    if (error === null && !isLoading) {
      setModalState(false);

      toast({
        title: "Password Changed",
        description: "Password has been changed successfully",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={modalState} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Change Password</ModalHeader>
        <ModalCloseButton onClick={() => setModalState(false)} />
        <DashboardAlert />
        <ModalBody>
          <VStack mt="3" spacing="15px">
            <FormControl>
              <Input
                type="password"
                size="lg"
                className="form-control"
                id="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                placeholder="Enter your Password"
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                size="lg"
                className="form-control"
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="Enter your new Password"
              />
              {checkPasswordLength && (
                <FormHelperText color={"red.200"} textAlign="left">
                  Password is less than 8 characters
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <Input
                type="password"
                size="lg"
                className="form-control"
                id="newPassword2"
                onChange={(e) => setNewPassword2(e.target.value)}
                value={newPassword2}
                placeholder="Confirm your new Password "
              />
              {checkPassword && (
                <FormHelperText color={"red.200"} textAlign="left">
                  Password does not match
                </FormHelperText>
              )}
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => {
              ChangePasswordHandler(e);
            }}
            isLoading={isLoading}
            loadingText="Updating..."
          >
            Update
          </Button>

          <Button variant="ghost" onClick={(e) => setModalState(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
