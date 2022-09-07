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
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { UserModel } from "../../models/auth";
import { UpdateUser } from "../../redux/features/Users/auth";
import { dispatch } from "../../redux/store";
import DashboardAlert from "../shared/DashboardAlert";

type Props = {
  user: UserModel;
  isLoading: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
}

const UpdateProfileModal : React.FC<Props>= ({user, setModalState, modalState, isLoading}) => {
  const { onClose } = useDisclosure();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const UpdateUserHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formBody : UserModel = {
      userName: userName === "" ? user.userName : userName,
      email: user.email,
      password: user.password,
      id: user.id,
      firstName: firstName === "" ? user.firstName : firstName,
      lastName: lastName === "" ? user.lastName : lastName,
      isEmailVerified: user.isEmailVerified,
    };

    dispatch(UpdateUser(formBody));
    setModalState(false);
  };

  return (
    <Modal isOpen={modalState} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Update Profile</ModalHeader>
        <ModalCloseButton onClick={() => setModalState(false)} />
        <DashboardAlert />
        <ModalBody>
          <VStack mt="3" spacing="15px">
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder={
                  user.firstName !== ""
                    ? user.firstName
                    : "Enter your firstname" 
                }
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder={
                  user.lastName !== "" ? user.lastName : "Enter your lastname"
                }
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="userName"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                placeholder={
                  user.userName !== "" ? user.userName : "Enter new Username"
                }
              />
            </FormControl>
            <FormControl>
              <Input
                disabled={true}
                type="text"
                size="lg"
                className="form-control"
                id="email"
                value={user ? user.email : ""}
                placeholder={user ? user.email : ""}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => {
              UpdateUserHandler(e);
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

export default UpdateProfileModal;
