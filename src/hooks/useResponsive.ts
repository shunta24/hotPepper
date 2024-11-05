import { useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const isPcLayout = useMediaQuery("(min-width:640px)");
  const isImageResponsive = useMediaQuery("(min-width:450px)");
  const isDetailAreaButton = useMediaQuery("(max-width:450px)");

  return {
    isPcLayout,
    isImageResponsive,
    isDetailAreaButton,
  };
};
