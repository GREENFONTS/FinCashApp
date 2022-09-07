import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    CloseButton,
    useDisclosure,
  } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hook";
  
  const DashboardAlert = () => {
    const {error} = useAppSelector((state) => state.auth)
    const {onClose} = useDisclosure({ defaultIsOpen: true });
  
    return (
      <>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertDescription>
                {error ? error : "Request Error"}
              </AlertDescription>
            </Box>
  
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => {
                onClose();
              }}
            ></CloseButton>
          </Alert>
        ) : (
          <></>
        )}
      </>
    );
  };
  
  export default DashboardAlert;
  