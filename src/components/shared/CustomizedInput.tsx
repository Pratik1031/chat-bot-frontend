import {
  Input,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

type Props = {
  name: string;
  type: string;
  label: string;
};

const getIcon = (type: string) => {
  switch (type) {
    case 'email':
      return <FaEnvelope color='black' />;
    case 'password':
      return <FaLock color='black' />;
    case 'text':
    default:
      return <FaUser color='black' />;
  }
};

const CustomizedInput = (props: Props) => {
  return (
    <FormControl>
      <FormLabel color='black'>{props.label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none' children={getIcon(props.type)} />
        <Input
          name={props.name}
          type={props.type}
          borderRadius={10}
          fontSize={20}
          color='black'
          _placeholder={{ color: 'black' }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default CustomizedInput;
