import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Box,
  MenuButton,
  Button,
  Link,
  Icon,
  Text,
  HStack,
  useColorModeValue,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiMoon } from "react-icons/bi";
import { ImSun } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { setAuthenticated } from "../../redux/features/Users/auth";
import {
  setDrawerState,
  setLeftDrawerState,
  setProfileView,
} from "../../redux/features/Utils/utils";
import DrawerComponent from "./Drawer";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const NavComponent = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { toggleColorMode } = useColorMode();
  const {pathname } = useLocation()
  const [tabletViewLower] = useMediaQuery("(min-width: 650px)");
  const [tabletViewUpper] = useMediaQuery("(max-width: 990px)");
  const [mobileView] = useMediaQuery("(max-width: 650px)");
  const iconColor = useColorModeValue("themeLight.icon", "themeLight.icon");
  const textColor = useColorModeValue("#2E3F6C", "white");
  const bgColor = useColorModeValue("black", "white");
  const navColor = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue("#333", "#000");
  const icon = useColorModeValue(BiMoon, ImSun);
  const { authenticated } = useAppSelector((state) => state.auth);

  const SignOutHandler = () => {
    localStorage.clear();
    dispatch(setAuthenticated(false));
    nav("/SignIn");
  };

  return (
    <Flex
      p={{ base: "3", md: "3", lg: "3" }}
      h={{ sm: "55px", md: "60px", lg: "56px" }}
      bg={navColor}
      justifyContent="space-between"
      boxShadow={`0px 0px 5px ${shadow}`}
      position="sticky"
      zIndex={999}
      top="0"
      w="100%"
    >
      {tabletViewLower && (
        <>
          <Box color={bgColor}>
            <HStack spacing="10px">
                <svg
                  width="40"
                  height="36"
                  viewBox="0 0 40 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 9.3913C0 4.20463 4.20463 0 9.3913 0H26.6087C31.7954 0 36 4.20463 36 9.3913V26.6087C36 31.7954 31.7954 36 26.6087 36H9.3913C4.20463 36 0 31.7954 0 26.6087V9.3913Z"
                    fill="#2E3F6C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3387 27.7826H14.512V11.5517H8.21741V8.21738H14.5556V8.21737H27.7826V11.5517L24.6056 11.5517H18.3823V16.5946H26.202V19.6809H18.3823V27.7826L18.3387 27.7826Z"
                    fill="white"
                  />
                </svg>
                <Text fontSize="25px" fontWeight="600" color={textColor}>
                  FinCash
                </Text>
                       </HStack>
          </Box>
          <Box>
            {!authenticated ? (
              <HStack spacing="24px" color={bgColor}>
               

                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={5}
                  w="27px"
                  h="27px"
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              </HStack>
            ) : (
              <HStack spacing="20px">
                <Menu>
                  <MenuButton
                    as={Button}
                    bg={navColor}
                    color={bgColor}
                    rightIcon={<FaChevronDown />}
                  >
                    <Icon
                      color={bgColor}
                      as={FaUser}
                      w="22px"
                      h="22px"
                      mx={3}
                      _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    />
                  </MenuButton>
                  <MenuList>
                    {tabletViewLower && tabletViewUpper && (
                      <>
                        {pathname === "/accounts" ?  <MenuItem
                          color={bgColor}
                          minH="48px"
                          onClick={() => dispatch(setDrawerState(true))}
                        >
                          <HStack justifyContent="space-between">
                            <Icon as={ImProfile} m="2" fontSize="20px" />
                            <Text m="2" textDecoration="none">
                              Account
                            </Text>
                          </HStack>
                        </MenuItem> :
                        <MenuItem
                          color={bgColor}
                          minH="48px"
                          onClick={() => dispatch(setDrawerState(true))}
                        >
                          <HStack justifyContent="space-between">
                            <Icon as={ImProfile} m="2" fontSize="20px" />
                            <Text m="2" textDecoration="none">
                              Profile
                            </Text>
                          </HStack>
                        </MenuItem> }
                      </>
                    )}

                    <MenuItem
                      minH="40px"
                      color={bgColor}
                      onClick={() => SignOutHandler()}
                    >
                      <HStack justifyContent="space-between" color="inherit">
                        <Icon as={FaSignOutAlt} m="2" fontSize="20px" />
                        <Text m="2" textDecoration="none">
                          Sign Out
                        </Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  color={bgColor}
                  mx={5}
                  w="27px"
                  h="27px"
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              </HStack>
            )}
          </Box>
        </>
      )}

      {mobileView && (
        <>
          {!authenticated ? (
            <>
              <Box color={bgColor}>
                <HStack spacing="35px">
                  <Link
                    display="flex"
                    justifyContent="center"
                    to="/"
                    as={NavLink}
                  >
                    <svg
                      width="40"
                      height="36"
                      viewBox="0 0 40 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 9.3913C0 4.20463 4.20463 0 9.3913 0H26.6087C31.7954 0 36 4.20463 36 9.3913V26.6087C36 31.7954 31.7954 36 26.6087 36H9.3913C4.20463 36 0 31.7954 0 26.6087V9.3913Z"
                        fill="#2E3F6C"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.3387 27.7826H14.512V11.5517H8.21741V8.21738H14.5556V8.21737H27.7826V11.5517L24.6056 11.5517H18.3823V16.5946H26.202V19.6809H18.3823V27.7826L18.3387 27.7826Z"
                        fill="white"
                      />
                    </svg>
                    <Text fontSize="23px" fontWeight="600">
                      FinCash
                    </Text>
                  </Link>
                </HStack>
              </Box>

              <HStack spacing="24px" color={textColor}>
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={5}
                  w="27px"
                  h="27px"
                  color={iconColor}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
              </HStack>
            </>
          ) : (
            <>
              <Box p="1">
                <Icon
                  as={GiHamburgerMenu}
                  ml="3"
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                  onClick={() => dispatch(setLeftDrawerState(true))}
                  fontSize="25px"

                  color={bgColor}
                />
                <DrawerComponent />
              </Box>

              <HStack spacing="15px" color={bgColor}>
                <Icon
                  as={icon}
                  onClick={toggleColorMode}
                  mx={5}
                  w={{ base: "20px", md: "23px", lg: "27px" }}
                  h={{ base: "20px", md: "23px", lg: "27px" }}
                  _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                />
                <Box bg="inherit">
                <Menu>
                  <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                    <Icon
                      as={FaUser}
                      w={{ base: "18px", md: "20px", lg: "22px" }}
                      h={{ base: "18px", md: "20px", lg: "22px" }}
                      mx={3}
                      _hover={{ transform: "scale(1.15)", cursor: "pointer" }}
                    />
                  </MenuButton>
                  <MenuList>
                  {pathname === "/accounts" ?  <MenuItem
                          color={bgColor}
                          minH="48px"
                          onClick={() => dispatch(setProfileView(true))}
                        >
                          <HStack justifyContent="space-between">
                            <Icon as={MdAccountBalanceWallet} m="2" fontSize="20px" />
                            <Text m="2" textDecoration="none">
                              Account
                            </Text>
                          </HStack>
                        </MenuItem> :
                        <MenuItem
                          color={bgColor}
                          minH="48px"
                          onClick={() => dispatch(setProfileView(true))}
                        >
                          <HStack justifyContent="space-between">
                            <Icon as={ImProfile} m="2" fontSize="20px" />
                            <Text m="2" textDecoration="none">
                              Profile
                            </Text>
                          </HStack>
                        </MenuItem> }
                    <MenuItem
                      minH="40px"
                      color={bgColor}
                      onClick={() => SignOutHandler()}
                    >
                      <HStack justifyContent="space-between">
                        <Icon as={FaSignOutAlt} m="2" fontSize="20px" />
                        <Text m="2" textDecoration="none">
                          Sign Out
                        </Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
                </Box>
                
              </HStack>
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default NavComponent;
