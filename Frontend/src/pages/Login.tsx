import React, { useEffect, useState } from "react";
import { setLoading, UserLogin } from "../redux/features/Users/auth";
import { NavLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  useToast,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import { dispatch } from "../redux/store";
import { useAppSelector } from "../redux/hook";
import FormInputComponent from "../components/Elements/FormInput";

const LoginPage = () => {
  const { isLoading, token, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const textColor = useColorModeValue("#2E3F6C", "white");
  const toast = useToast();

  const submitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(UserLogin({ email, password }));
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    if (error !== null) {
      let id = error;
      if (!toast.isActive(id)) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [error]);

  return (
    <Flex
    alignItems="center"
    display={{ base: "block" }}
    justifyContent="center"
    mt={{ base: "2", md: "5" }}
  >
    <Box
      w={{ md: "50%" }}
      h="80vh"
      mt={{ base: "2", md: "5" }}
      p={{ base: "2", md: "5" }}
      ml={{ base: "0", md: "5" }}
      fontWeight="700"
      fontFamily="Roboto, san-serif"
    >
      <Box mt={{ base: "2", md: "5" }} p={{ base: "2", md: "3" }}>
        <Text fontSize="17px" color="gray.400">
          Start For Free
        </Text>
      </Box>

      <Box p={{ base: "2", md: "3" }} mt="0">
        <Text
          fontSize={{ base: "25px", md: "30px" }}
          fontWeight="800"
          color={textColor}
        >
          Log In to your Account
        </Text>

        <Flex mt={{ base: "2", md: "0" }}>
          <Text mr="2">Don't have an Account?</Text>
          <Link as={NavLink} to="/SignUp" color="#2A59C3">
            SignUp
          </Link>
        </Flex>
      </Box>

      <Box p={{ base: "2", md: "3" }} mt={{ base: "5", md: "0" }}>
        <FormInputComponent
          error={null}
          type="email"
          name="email"
          value={email}
          label="Email"
          image="images/Vector5.png"
          onChangeHandler={setEmail}
        />

          <FormInputComponent
            error={null}
            type="password"
            name="password"
            value={password}
            label="Password"
            image="images/Vector4.png"
            onChangeHandler={setPassword}
          />
         

        <Flex
          w={{ base: "100%", md: "80%" }}
          mt="3"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            borderRadius="20px"
            w={{ base: "50%", md: "30%" }}
            color={textColor}
            onClick={(e) => submitHandler(e)}
          >
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Box>
    <Flex w="50%"></Flex>
  </Flex>
  );
};

export default LoginPage;
