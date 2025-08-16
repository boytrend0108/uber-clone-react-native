import { Image, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { icons } from '@/assets/constants';
import { GoogleInputProps } from '@/types/type';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  console.log('GoogleTextInput component rendered');

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        predefinedPlaces={
          [
            // {
            //   description: 'Times Square, New York, NY, USA',
            //   geometry: {
            //     location: {
            //       lat: 40.758,
            //       lng: -73.9855,
            //       latitude: 40.758,
            //       longitude: -73.9855,
            //     },
            //   },
            // },
            // {
            //   description: 'Central Park, New York, NY, USA',
            //   geometry: {
            //     location: {
            //       lat: 40.7829,
            //       lng: -73.9654,
            //       latitude: 40.7829,
            //       longitude: -73.9654,
            //     },
            //   },
            // },
          ]
        }
        predefinedPlacesAlwaysVisible={true}
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        minLength={2}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps={'handled'}
        listViewDisplayed={'auto'}
        timeout={20000}
        onFail={(error) => {
          console.error('❌ Google Places Error:', error);
          console.error('❌ Error details:', JSON.stringify(error, null, 2));
        }}
        onNotFound={() => {
          console.log('🔍 No results found');
          console.log(
            '🔍 This means API call was made but returned no results'
          );
        }}
        onTimeout={() => {
          console.log('⏰ Google Places API timeout');
          console.log('⏰ This means API call was made but timed out');
        }}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            position: 'relative',
            shadowColor: '#d4d4d4',
            height: 50,
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : 'white',
            fontSize: 16,
            fontWeight: '600',
            marginTop: 5,
            width: '100%',
            borderRadius: 200,
            paddingHorizontal: 16,
            height: 50,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : 'white',
            position: 'absolute',
            top: 55,
            width: '100%',
            borderRadius: 10,
            shadowColor: '#d4d4d4',
            zIndex: 1000,
            elevation: 1000,
            maxHeight: 200,
          },
          row: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : 'white',
            padding: 13,
            minHeight: 44,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        GooglePlacesDetailsQuery={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: 'gray',
          placeholder: initialLocation ?? 'Where do you want to go?',
          returnKeyType: 'search',
          autoCapitalize: 'none',
          autoCorrect: false,
          onChangeText: (text) => {
            console.log('⌨️ Typing:', text);
            console.log('📝 Text length:', text.length);
            console.log('🔄 Should trigger API call for:', text);
            if (text.length >= 2) {
              console.log('✅ Text is long enough for API call');
            } else {
              console.log('❌ Text too short for API call');
            }
          },
          onFocus: () => console.log('🎯 Input focused'),
          onBlur: () => console.log('🎯 Input blurred'),
          onSubmitEditing: () => console.log('⏎ Submit pressed'),
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
