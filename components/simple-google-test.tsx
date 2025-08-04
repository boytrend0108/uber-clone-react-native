import React from 'react';
import { Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const SimpleGoogleTextInput = () => {
  console.log('=== Simple Google Test Component ===');
  console.log('API Key:', googlePlacesApiKey);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Simple Google Places Test
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Type a place..."
        onPress={(data, details = null) => {
          console.log('✅ Selected place:', data);
          console.log('✅ Details:', details);
        }}
        onFail={(error) => {
          console.error('❌ Google Places API Error:', error);
        }}
        onNotFound={() => {
          console.log('❌ No results found for this search');
        }}
        onTimeout={() => {
          console.log('❌ Google Places API request timed out');
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
          onFocus: () => console.log('🎯 Input focused'),
          onBlur: () => console.log('🎯 Input blurred'),
          onChangeText: (text) => {
            console.log('🎯 Text changed:', text);
            if (text.length > 0) {
              console.log('🎯 Should trigger API call for:', text);
            }
          },
        }}
        listViewDisplayed={'auto'}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

export default SimpleGoogleTextInput;
