import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Box,
  Button,
  Flex,
  LinkBox,
  HStack,
  Text,
  useDisclosure,
  Divider,
  useColorModeValue
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  setDrawerState,
  setLeftDrawerState,
} from "../../redux/features/Utils/utils";
import { dispatch } from "../../redux/store";
import LeftSidebarWrapper from "./LeftSideBar";
import { useAppSelector } from "../../redux/hook";

const DrawerComponent = () => {
  const { drawerState, leftDrawerState } = useAppSelector((state) => state.utils);
  const { onClose } = useDisclosure();
  const backgroundColor = useColorModeValue("purple.800", "purple.900");
  return (
    <>
      {drawerState && (
        <Drawer
          isOpen={drawerState}
          onClose={onClose}
          placement="right"
          isFullHeight={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Flex w="100%" align="center" justify="space-between">
                <Box alignItems="center">
                  <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}>
                      <Link to="/" as={NavLink}>
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 9.3913C0 4.20463 4.20463 0 9.3913 0H26.6087C31.7954 0 36 4.20463 36 9.3913V26.6087C36 31.7954 31.7954 36 26.6087 36H9.3913C4.20463 36 0 31.7954 0 26.6087V9.3913Z"
                            fill="#440079"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.3387 27.7826H14.512V11.5517H8.21741V8.21738H14.5556V8.21737H27.7826V11.5517L24.6056 11.5517H18.3823V16.5946H26.202V19.6809H18.3823V27.7826L18.3387 27.7826Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                      <Text
                        fontWeight="bold"
                        fontSize="20px"
                        fontFamily="cursive"
                      >
                        FinCash
                      </Text>
                    </HStack>
                  </LinkBox>
                </Box>
                <Button
                  h={10}
                  w={10}
                  variant="unstyled"
                  m={3}
                  onClick={() => dispatch(setDrawerState(false))}
                >
                  x
                </Button>
              </Flex>
            </DrawerHeader>
            <Divider />
            <DrawerBody>
              <Box animation="bounceFromBottom 0.5s">
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                  >
                    <Link
                      to="/SignUp"
                      onClick={() => dispatch(setDrawerState(false))}
                      as={NavLink}
                    >
                      {" "}
                      Sign Up
                    </Link>
                  </Button>
                </Box>
                <Box>
                  <Button
                    bg="inherit"
                    _hover={{ transform: "scale(1.2)", cursor: "pointer" }}
                    fontSize="17px"
                    fontWeight="400"
                  >
                    <Link
                      to="/SignIn"
                      onClick={() => dispatch(setDrawerState(false))}
                      as={NavLink}
                    >
                      {" "}
                      Sign In
                    </Link>
                  </Button>
                </Box>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

       {leftDrawerState && (
        <Drawer
          isOpen={leftDrawerState}
          onClose={onClose}
          placement="left"
          isFullHeight={false}          
        >
          <DrawerOverlay />
          <DrawerContent bg={backgroundColor}>
            <DrawerHeader p="4" m="0">
              <Flex w="100%" align="center" justify="space-between" textColor="white">
                <Box alignItems="center">
                  <LinkBox>
                    <HStack _hover={{ cursor: "pointer" }}  >
                      <Link to="/" as={NavLink}>
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 9.3913C0 4.20463 4.20463 0 9.3913 0H26.6087C31.7954 0 36 4.20463 36 9.3913V26.6087C36 31.7954 31.7954 36 26.6087 36H9.3913C4.20463 36 0 31.7954 0 26.6087V9.3913Z"
                            fill="#440079"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.3387 27.7826H14.512V11.5517H8.21741V8.21738H14.5556V8.21737H27.7826V11.5517L24.6056 11.5517H18.3823V16.5946H26.202V19.6809H18.3823V27.7826L18.3387 27.7826Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                      <Text
                     
                        fontWeight="bold"
                        fontSize="20px"
                        fontFamily="cursive"
                      >
                        FinCash
                      </Text>
                    </HStack>
                  </LinkBox>
                </Box>
                <Button
                  h={10}
                  w={10}
                  variant="unstyled"
                  m={3}
                  onClick={() => dispatch(setLeftDrawerState(false))}
                >
                  x
                </Button>
              </Flex>
            </DrawerHeader>
            <DrawerBody p="0" m="0">
              <LeftSidebarWrapper />
             </DrawerBody>
          </DrawerContent>
        </Drawer>
      )} 
    </>
  );
};

export default DrawerComponent;
