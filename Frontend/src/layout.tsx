import LeftSidebarWrapper from "./components/shared/LeftSideBar";
import { Flex, Box, useMediaQuery} from "@chakra-ui/react";
import RightSidebarWrapper from "./components/RightBarComponent";
import Loading from "./components/shared/Loader";
import { useAppSelector } from "./redux/hook";
import { ReactNode } from "react";

interface Props {
  children : ReactNode
}

const Layout : React.FC<Props> = ({children}) => {
  const { authenticated, isLoading } = useAppSelector((state) => state.auth);
  const { drawerState, profileView } = useAppSelector((state) => state.utils);
  const [desktopView] = useMediaQuery("(min-width: 990px)");
  const [tabletViewLower] = useMediaQuery("(min-width: 650px)");
  const [tabletViewUpper] = useMediaQuery("(max-width: 990px)");
  const [mobileView] = useMediaQuery("(max-width: 650px)");

  return (
    <>
      <Loading />
      <Flex >
        {authenticated && !isLoading ? (
          <>
            {desktopView && (
              <>
                <Box
                  w="15%"
                  h="100%"
                  position="fixed"
                  z-index="1"
                  overflowX="hidden"
                >
                  <LeftSidebarWrapper />
                </Box>
                <Box w="70%" ml="15%" mr="15%" h="100%" >
                  {children}
                </Box>

                <Box
                  w="15%"
                  h="100%"
                  position="fixed"
                  right="0"
                  z-index="1"
                  overflowX="hidden"
                >
                  <RightSidebarWrapper />
                </Box>
              </>
            )}

            {(tabletViewUpper && tabletViewLower) && (
              <>
                {" "}
                <Box
                  w="20%"
                  h="100%"
                  position="fixed"
                  z-index="1"
                  overflowX="hidden"
                >
                  <LeftSidebarWrapper />
                </Box>
                <Box
                  w={drawerState ? "60%" : "83%"}
                  ml={"20%"}
                  mr={drawerState ? "18%" : "0%"}
                  h="100vh"
                >
                  {children}
                </Box>
                <Box
                  w={drawerState ? "20%" : "0%"}
                  h="100%"
                  position="fixed"
                  right="0"
                  z-index="1"
                  overflowX="hidden"
                >
                  <RightSidebarWrapper />
                </Box>
              </>
            )}

            {mobileView && (
              <>             

                  <Box
                    w="100%"
                    h="100%"
                  >
                    {children}
                  </Box>
                {profileView && <Box
                  w='50%'
                  h="100%"
                  position="fixed"
                  right="0"
                  z-index="1"
                  overflowX="hidden"
                >
                  <RightSidebarWrapper />
                </Box>}

                
              </>
           )}
          </>
        ) : (
          <Box w="100%">
            {children}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Layout;
