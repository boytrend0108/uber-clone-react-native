import React from 'react';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const SimpleGoogleTextInput = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Simple Google Places Test
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Type a place..."
        onPress={(data, details = null) => {
          // Handle place selection
        }}
        onFail={(error) => {
          // Handle error
        }}
        onNotFound={() => {
          // Handle no results
        }}
        onTimeout={() => {
          // Handle timeout
        }}
        query={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        fetchDetails={true}
        debounce={300}
        minLength={1}
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
          },
          textInput: {
            height: 44,
            color: '#5d5d5d',
            fontSize: 16,
            backgroundColor: '#fff',
          },
          listView: {
            backgroundColor: '#fff',
            elevation: 5,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 15,
            shadowOffset: { x: 0, y: 10 },
            maxHeight: 200,
          },
        }}
        textInputProps={{
          onFocus: () => {},
          onBlur: () => {},
          onChangeText: (text) => {},
        }}
        listViewDisplayed={'auto'}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

export default SimpleGoogleTextInput;
