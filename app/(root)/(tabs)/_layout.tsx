import { icons } from '@/assets/constants';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      className={`flex flex-row items-center justify-center rounded-full ${focused ? '#333333' : ''}`}
    >
      <View
        className={`w-12 h-12 ${focused ? 'bg-general-400' : ''} rounded-full flex items-center justify-center`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000', // Active tab color
        tabBarInactiveTintColor: '#000', // Inactive tab color
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333', // Tab bar background color
          borderRadius: 50,
          marginBottom: 50,
          paddingBottom: 30,
          marginHorizontal: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 78,
          overflow: 'hidden',
          flexDirection: 'row',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          tabBarLabel: 'Rides',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
