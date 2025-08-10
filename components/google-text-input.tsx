import { GoogleInputProps } from '@/types/type';
import { Text, View } from 'react-native';

const GoogleTextInput = ({
  icon,
  containerStyle,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center  justify-center p-3 relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <Text>Google </Text>
    </View>
  );
};

export default GoogleTextInput;
