import { Input } from "@chakra-ui/react";
function InputComponent({ placeholder, value, setValue }) {
  return (
    <Input
      placeholder={placeholder}
      bg="facebook.100"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
}

export default InputComponent;
