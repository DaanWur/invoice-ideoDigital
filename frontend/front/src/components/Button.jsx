import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ButtonComponent({ title, action }) {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="facebook"
      borderRadius="10px"
      onClick={() => navigate(action)}
    >
      {title}
    </Button>
  );
}

export default ButtonComponent;
