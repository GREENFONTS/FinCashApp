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
import { ServiceKeys } from "../../models/serviceKeys";
import { AddAccountKeys } from "../../redux/features/Users/auth";
import { dispatch } from "../../redux/store";
import DashboardAlert from "../shared/DashboardAlert";

type Props = {
  user: UserModel;
  isLoading: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
};

const AddServiceKeysModal: React.FC<Props> = ({ user, setModalState, modalState, isLoading }) => {
  const { onClose } = useDisclosure();
  const [secretKey, setSecretKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const submitKeysHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formBody  : ServiceKeys = {
      monoPrivateKey: privateKey,
      monoSecretKey: secretKey,
      UserId: user.id,
      FlutterKey: "",
    };

    dispatch(AddAccountKeys(formBody));
    setModalState(false);
  };

  return (
    <Modal isOpen={modalState} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Store App Keys</ModalHeader>
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
                placeholder="Enter your Mono App Public_key"
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
              submitKeysHandler(e);
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

export default AddServiceKeysModal;
