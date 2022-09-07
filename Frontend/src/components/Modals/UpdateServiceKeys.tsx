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
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { UserModel } from "../../models/auth";
import { UpdateAccountKeys } from "../../redux/features/Users/auth";
import { dispatch } from "../../redux/store";
import DashboardAlert from "../shared/DashboardAlert";

type Props = {
  user: UserModel;
  error: string | null;
  isLoading: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
};

const UpdateServiceKeysModal: React.FC<Props> = ({
  user,
  error,
  isLoading,
  setModalState,
  modalState,
}) => {
  const toast = useToast();
  const { onClose } = useDisclosure();
  const [secretKey, setSecretKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const UpdatekeysHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const formBody = {
      monoPrivateKey: privateKey,
      monoSecretKey: secretKey,
      UserId: user.id,
      FlutterKey: "",
    };
    dispatch(UpdateAccountKeys(formBody));
    if (error === null && !isLoading) {
      setModalState(false);

      toast({
        title: "Account Keys Updated",
        description: "Account Keys has been Updated successfully",
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
        <ModalHeader textAlign="center">Update App Keys</ModalHeader>
        <ModalCloseButton onClick={() => setModalState(false)} />
        <DashboardAlert />
        <ModalBody>
          <VStack mt="3" spacing="15px">
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="Mono_private_key"
                onChange={(e) => setPrivateKey(e.target.value)}
                value={privateKey}
                placeholder="Enter your Mono App Private_key"
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="Mono_secret_key"
                onChange={(e) => setSecretKey(e.target.value)}
                value={secretKey}
                placeholder="Enter your Mono App Secret_key"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => {
              UpdatekeysHandler(e);
            }}
            isLoading={isLoading}
            loadingText="Submitting..."
          >
            Submit
          </Button>

          <Button variant="ghost" onClick={(e) => setModalState(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateServiceKeysModal;
