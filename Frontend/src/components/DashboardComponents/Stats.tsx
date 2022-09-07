import {
  Flex,
  VStack,
  Box,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import Card from "./Card";

type Props = {
  totalCredit: number;
  totalDebit: number;
  balance: number;
  debitPercent: string;
  balancePercent: string;
};

const Statistics: React.FC<Props> = ({
  totalCredit,
  totalDebit,
  balance,
  debitPercent,
  balancePercent,
}) => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  return (
    <Box bg={bgColor} p={{ base: "2", lg: "2" }} mb={{ base: "3", sm: "5" }}>
      {!mobileView && (
        <Flex justifyContent="space-between">
          <Card
            percent={"100"}
            color={"blue.200"}
            text={"Total Income"}
            amount={totalCredit}
          />

          <Card
            percent={debitPercent}
            color={"red.400"}
            text={"Total Expenses"}
            amount={totalDebit}
          />
          <Card
            percent={balancePercent}
            color={"blue.300"}
            text={"Balance"}
            amount={balance}
          />
        </Flex>
      )}

      {mobileView && (
        <VStack spacing="10px">
          <Card
            percent={"100"}
            color={"blue.200"}
            text={"Total Income"}
            amount={totalCredit}
          />

          <Card
            percent={debitPercent}
            color={"red.400"}
            text={"Total Expenses"}
            amount={totalDebit}
          />
          <Card
            percent={balancePercent}
            color={"blue.300"}
            text={"Balance"}
            amount={balance}
          />
        </VStack>
      )}
    </Box>
  );
};

export default Statistics;
