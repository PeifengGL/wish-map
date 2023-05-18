declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType;
  export default value;
}
declare module '*.json' {
  interface PackageJson {
    version: string;
  }
  const value: PackageJson;
  export default value;
}
