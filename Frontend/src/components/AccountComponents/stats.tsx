import {
    Flex,
    Box,
    Text,
  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hook";

const Stats = () => {
    const [transCount, setTransCount] = useState<number>(0);
    const { AllTransactions, accounts } = useAppSelector((state) => state.accounts)

    useEffect(() => {
        if (AllTransactions != null) {
          let end = AllTransactions.length;
          let start = Math.round(end / 2);
    
          let timer = setInterval(() => {
            start += 1;
    
            if (start > end) {
              clearInterval(timer);
            } else setTransCount(start);
          }, 1);
        }
      }, [AllTransactions]);



    return (
        <Flex justifyContent="space-between">
                  <Box m={{base:"2", lg:"5"}}>
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w={{base: "100px", sm : "150px", lg:"200px"}}
                      bg="white"
                      lineHeight={{base:"100px", sm : "150px", lg:"200px"}}
                    >
                      <Text m="auto">{accounts?.length}</Text>
                    </Flex>
                    <Text mt="3"> Accounts</Text>
                  </Box>

                  <Box m={{base:"2", lg:"5"}}>
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w={{base: "100px", sm : "150px", lg:"200px"}}
                      bg="white"
                      lineHeight={{base:"100px", sm : "150px", lg:"200px"}}
                    >
                      <Text m="auto">{transCount}</Text>
                    </Flex>
                    <Text mt="3">Transactions</Text>
                  </Box>

                  <Box m={{base:"2", lg:"5"}}>
                    <Flex
                      textAlign="center"
                      color="purple.700"
                      fontSize="30px"
                      boxShadow="base"
                      borderRadius="50%"
                      w={{base: "100px", sm : "150px", lg:"200px"}}
                      bg="white"
                      lineHeight={{base:"100px", sm : "150px", lg:"200px"}}
                    >
                      <Text m="auto">0</Text>
                    </Flex>
                    <Text mt="3">Bill Payments</Text>
                  </Box>
                </Flex>
    )
}

export default Stats