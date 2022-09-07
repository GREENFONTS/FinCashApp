import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useMediaQuery
} from "@chakra-ui/react";
import { useState } from "react";
import { TransactionModel } from "../../models/accounts";

type Props = {
  transactions : TransactionModel[]
}

const TableComponent : React.FC<Props> = ({ transactions }) => {
  const [narration, setNarration] = useState<string>("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLesserThan900] = useMediaQuery("(max-width: 900px, min-width:600px)");
  return (
    <TableContainer overflowY="scroll">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w={{sm:"40%", lg:"60%"}}>Description</Th>
            <Th w={{sm:"30%", lg:"20%"}}>Amount(N)</Th>
            <Th w={{sm:"30%", lg:"20%"}}>Date</Th>
          </Tr>
          
        </Thead>

        {transactions.length > 0 ? (
          <Tbody>
            {transactions.map((trans) => {
              return (
                <Tr key={trans._id} w="100%">
                  <Td className="tableWidth" fontSize="13px" onClick={() => {
                    onOpen();
                    setNarration(trans.narration)
                  }}>
                    {isLesserThan900 &&  <>{trans.narration.slice(0, 50)}</>}
                      {trans.narration.slice(0, 100)}
                  </Td>

                  <Td>{trans.amount / 100}</Td>
                  <Td>{trans.date.split("T")[0]}</Td>

                  
                </Tr>
              );
            })}
          </Tbody>
        ) : (
          <></>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Narration</ModalHeader>
                <ModalBody>
                   {narration}
                </ModalBody>
                
            </ModalContent>
        </Modal>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
