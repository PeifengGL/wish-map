import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function generateUUID(): string {
  const uuid = uuidv4();
  return uuid;
}
