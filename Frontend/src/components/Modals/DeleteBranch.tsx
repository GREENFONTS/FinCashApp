import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
    Text,
  } from "@chakra-ui/react";
import { UserModel } from "../../models/auth";
import { DeleteAccount, GetAccounts} from "../../redux/features/Users/accounts";
import { dispatch } from "../../redux/store";
import { Dispatch, SetStateAction } from "react";

type Props = {
  user: UserModel;
  branchId: string;
  isAcctLoading: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  deleteModal: boolean;
};

const DeleteBranch : React.FC<Props> = ({user, setDeleteModal, deleteModal, branchId, isAcctLoading}) => {
    const { onClose } = useDisclosure();

    const DeleteHandler = () => {
      const id = user.id
        dispatch(DeleteAccount({branchId, id}));        
        if (!isAcctLoading) {          
          dispatch(GetAccounts(id));
          setDeleteModal(false);
        }
      };

    return (
        <Modal isOpen={deleteModal} onClose={onClose}>
          <ModalContent>
            <ModalHeader textAlign="center">Delete Acoount</ModalHeader>
            <ModalBody>
              <Text>This action will Unlink this account</Text>
              <Text> Do you sure you want to unlink this account?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  DeleteHandler();
                }}
                isLoading={isAcctLoading}
                loadingText="Deleting..."
              >
                Delete
              </Button>

              <Button variant="ghost" onClick={(e) => setDeleteModal(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteBranch