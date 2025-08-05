import { icons } from '@/assets/constants';
import { InputFieldProps } from '@/types/type';
import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const InputField = ({
  value,
  onChangeText,
  label,
  labelStyle,
  inputStyle,
  containerStyle,
  iconStyle,
  placeholder,
  icon,
  secureTextEntry = false,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      className="w-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback className="w-full" onPress={Keyboard.dismiss}>
        <View className="my-2 w-full ">
          <Text
            className={`text-lg font-JakartaSemiBold ${labelStyle} text-left w-full mb-2`}
          >
            {label}
          </Text>

          <View
            className={`flex flex-row justify-start items-center ${containerStyle} bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500`}
          >
            {icon && (
              <Image
                source={icons.person}
                className={`w-6 h-6 ml-4 ${iconStyle}`}
              />
            )}

            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
