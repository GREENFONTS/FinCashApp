import {
  Flex,
  Text,
  Box,
  VStack,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  color: string;
  text: string;
  percent: string;
  amount: number;
};

const Card : React.FC<Props> = ({ color, text, percent, amount }) => {
  const textColor = useColorModeValue("black", "black");
  const Percent = parseInt(percent)
  return (
    <Flex
      borderRadius="15px"
      h={{ sm: "30vh" }}
      bg="white"
      boxShadow="base"
      w={{ sm: "23vw", lg: "20vw" }}
      justifyContent="space-between"
      p="3"
    >
      <VStack p={{ base: "4", lg: "2" }} align="flex-start" spacing="5px">
        <Box
          bgColor={color}
          p={{ base: "3", sm: "2", lg: "4" }}
          borderRadius="50%"
        >
          <Box
            textColor="black"
            w={{ base: "30px", sm: "15px", md: "17px", lg: "20px" }}
            h={{ base: "30px", sm: "15px", md: "17px", lg: "20px" }}
          >
            <svg
              width="inherit"
              height="inherit"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 5.76199V13.762V5.76199ZM9 8.76199V13.762V8.76199ZM5 11.762V13.762V11.762ZM3 17.762H15C15.5304 17.762 16.0391 17.5513 16.4142 17.1762C16.7893 16.8011 17 16.2924 17 15.762V3.76199C17 3.23156 16.7893 2.72285 16.4142 2.34778C16.0391 1.97271 15.5304 1.76199 15 1.76199H3C2.46957 1.76199 1.96086 1.97271 1.58579 2.34778C1.21071 2.72285 1 3.23156 1 3.76199V15.762C1 16.2924 1.21071 16.8011 1.58579 17.1762C1.96086 17.5513 2.46957 17.762 3 17.762Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>

        <Text
          fontWeight="600"
          color={textColor}
          fontSize={{ sm: "12px", lg: "15px" }}
        >
          {text}
        </Text>
        <Text
          fontWeight="600"
          color={textColor}
          fontSize={{ sm: "12px", lg: "15px" }}
        >
          N{amount.toLocaleString()}{" "}
        </Text>
        <Text fontWeight="600" fontSize="13px" color="gray">
          {" "}
          Last 24hrs
        </Text>
      </VStack>
      <VStack justifyContent="center" p="2">
        <CircularProgress
          trackColor="white"
          color={color}
          size="100%"
          thickness="10px"
          value={Percent}
          capIsRound={true}
        >
          <CircularProgressLabel
            fontSize={{ base: "25px", sm: "10px", lg: "15px" }}
            color={textColor}
          >
            {percent}%
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </Flex>
  );
};

export default Card;
