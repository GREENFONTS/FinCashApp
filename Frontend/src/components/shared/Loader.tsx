import { Spinner, Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading, verifyToken } from "../../redux/features/Users/auth";
import { reset } from "../../redux/features/Utils/utils";
import { useAppSelector } from "../../redux/hook";
import { dispatch } from "../../redux/store";

const Loading = () => {
  const { authenticated, user, isLoading} = useAppSelector((state) => state.auth);

  const nav = useNavigate();
  let token: string = localStorage.getItem("token")!;
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !isLoading &&
      !authenticated &&
      (token === "null" || token === null || token === undefined)
    ) {
      localStorage.clear();
      if (pathname !== "/SignUp") {
      nav("/SignIn");
      }

    } else {
      dispatch(verifyToken(token));
      dispatch(reset())
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (pathname === "/SignIn" || pathname === "/SignUp") {
        console.log("entered")
        if(user != null){
          console.log(user, "hey")
          nav("/dashboard");
          dispatch(setLoading(false))
        }
       
      } else {
        nav(pathname);
      }
    }
  }, [authenticated, user]);

  return (
    <>
      {isLoading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="9999999"
          bg="white"
          w="100%"
          h="100vh"
          opacity="0.999"
        >
          <Stack justifyContent="center" h="inherit" alignItems="center">
            <Spinner size="xl" color="primary-1" />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Loading;
