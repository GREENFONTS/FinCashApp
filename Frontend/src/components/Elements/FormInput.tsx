import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Image,
  FormErrorMessage,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
type Props = {
  error: string | null;
  type: string;
  value: string;
  label: string;
  image: string;
  name: string;
  onChangeHandler: Dispatch<SetStateAction<string>>;
};
const FormInputComponent: React.FC<Props> = ({ error, type, value, label, image, name, onChangeHandler }) => {
  const textColor = useColorModeValue("#2E3F6C", "white");
  return (
    <FormControl backgroundColor="#2E3F6C" borderRadius="20px" p="2" w={{base:"100%", md:"80%"}} mb="2" mr="2">
      <FormLabel fontSize="12px" color="gray.300" pl="3">
        {label}
      </FormLabel>
      <Flex
        pt="0"
        mt="0"
        pr="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Input
          type={type}
          h="30px"
          borderColor="#2E3F6C"
          w="80%"
          name={name}
          _hover={{ borderColor: { textColor } }}
          textColor="white"
          _focus={{ borderColor: { textColor } }}
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <Image h="15px" w="15px" src={image} />
      </Flex>

      {error !== null && <FormHelperText fontSize="10px" color="gray.300">{error}</FormHelperText>}
    </FormControl>
  );
};

export default FormInputComponent;
