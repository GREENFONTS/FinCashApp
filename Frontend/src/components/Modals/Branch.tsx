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
  Textarea,
} from "@chakra-ui/react";
import { UserModel } from "../../models/auth";
import { AddAccount, UpdateAccount } from "../../redux/features/Users/accounts";
import { dispatch } from "../../redux/store";
import DashboardAlert from "../shared/DashboardAlert";
import { Dispatch, SetStateAction, useState } from "react";
import { AccountModel } from "../../models/accounts";

type Props = {
  user: UserModel;
  account: AccountModel | null;
  isAcctLoading: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  modalState: boolean;
  updateModal : boolean
};

const BranchModal : React.FC<Props> = ({
  account,
  user,
  setModalState,
  modalState,
  updateModal,
  isAcctLoading,
}) => {
  const { onClose } = useDisclosure();
  const [BranchName, setBranchName] = useState<string>("");
  const [BranchAddress, setBranchAddress] = useState<string>("");
  const [BranchDescription, setBranchDescription] = useState<string>("");

  const onUpdateHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formBody : AccountModel = {
      branchId: account ? account.branchId : "",
      branchName: BranchName === "" ? account ? account.branchName : "" : BranchName,
      address: BranchAddress === "" ? account ? account.address : "" : BranchAddress,
      description:
        BranchDescription === "" ? account ? account.description : "" : BranchDescription,
      userId: user.id,
      accountId: account ? account.accountId : "",
    };

    dispatch(UpdateAccount(formBody));

    if (!isAcctLoading) {
      setModalState(false);
    }
  };

  const submitBranchHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const formBody : AccountModel = {
      branchId: "",
      branchName : BranchName,
      address: BranchAddress,
      description: BranchDescription,
      userId: user.id,
      accountId: "",
    };

    dispatch(AddAccount(formBody));
    setModalState(false);
  };

  return (
    <Modal isOpen={modalState} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {updateModal ? "Update" : "Create"}Account Branch
        </ModalHeader>
        <ModalCloseButton onClick={() => setModalState(false)} />
        <DashboardAlert />
        <ModalBody>
          <VStack mt="3" spacing="15px">
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="BranchName"
                onChange={(e) => setBranchName(e.target.value)}
                defaultValue={account ? account.branchName : ""}
                placeholder="Enter Account / Branch Name"
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                size="lg"
                className="form-control"
                id="BranchAddress"
                onChange={(e) => setBranchAddress(e.target.value)}
                defaultValue={account ? account.address : ""}
                placeholder="Enter Account Bank / Branch Address"
              />
            </FormControl>

            <FormControl>
              <Textarea
                rows={5}
                className="form-control"
                id="BranchDescription"
                onChange={(e) => setBranchDescription(e.target.value)}
                defaultValue={account ? account.description : ""}
                placeholder="Enter Account/Branch Description"
              ></Textarea>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => {
              updateModal ? onUpdateHandler(e) : submitBranchHandler(e);
            }}
            isLoading={isAcctLoading}
            loadingText={updateModal ? "Updating..." : "Submitting..."}
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

export default BranchModal;
