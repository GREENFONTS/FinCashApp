import { useEffect, useState } from "react";
import { UserRegister } from "../redux/features/Users/auth";
import { NavLink } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { dispatch } from "../redux/store";
import { useAppSelector } from "../redux/hook";
import { UserModel } from "../models/auth";
import FormInputComponent from "../components/Elements/FormInput";

const Register = () => {
  const { isLoading, token, error } = useAppSelector((state) => state.auth);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string | null>(null);
  const [checkPasswordLength, setCheckPasswordLength] = useState<string | null>(
    null,
  );
  const textColor = useColorModeValue("#2E3F6C", "white");
  const toast = useToast();

  useEffect(() => {
    if (password !== password2 && password2.length > 3) {
      setCheckPassword("Passwords don't match");
    } else setCheckPassword(null);
    if (password.length > 3 && password.length < 8) {
      setCheckPasswordLength("Password should be greater than 5 characters");
    } else setCheckPasswordLength(null);
  }, [password, password2]);

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const formBody: UserModel = {
      userName,
      email,
      password,
      id: "",
      firstName: "",
      lastName: "",
      isEmailVerified: false,
    };

    dispatch(UserRegister(formBody));
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
            Create New Account
          </Text>

          <Flex mt={{ base: "2", md: "0" }}>
            <Text mr="2">Aleady have an Account?</Text>
            <Link as={NavLink} to="/SignIn" color="#2A59C3">
              Login
            </Link>
          </Flex>
        </Box>

        <Box p={{ base: "2", md: "3" }} mt={{ base: "5", md: "0" }}>
          <FormInputComponent
            error={null}
            type="text"
            value={userName}
            label="UserName"
            name="UserName"
            image="images/Vector4.png"
            onChangeHandler={setUserName}
          />
          <FormInputComponent
            error={null}
            type="email"
            name="email"
            value={email}
            label="Email"
            image="images/Vector5.png"
            onChangeHandler={setEmail}
          />

          <Flex w={{ base: "100%", md: "81%" }}>
            <FormInputComponent
              error={checkPasswordLength}
              type="password"
              name="password"
              value={password}
              label="Password"
              image="images/Vector4.png"
              onChangeHandler={setPassword}
            />
            <FormInputComponent
              error={checkPassword}
              type="password"
              name="password2"
              value={password2}
              label="Confirm Password"
              image="images/Vector4.png"
              onChangeHandler={setPassword2}
            />
          </Flex>

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

export default Register;
