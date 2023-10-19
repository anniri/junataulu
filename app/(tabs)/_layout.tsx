import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { FavoritesProvider } from '../../context/FavoritesContext';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FavoritesProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Koti',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <Tabs.Screen 
        name="stations"
        options={{
          title: "Asemat",
          tabBarIcon: ({color}) => <TabBarIcon name="train" color={color}/>
        }}
      />
      <Tabs.Screen 
        name="info"
        options={{
          title: "Info",
          tabBarIcon: ({color}) => <TabBarIcon name="info" color={color}/>
        }}
      />
    </Tabs>
    </FavoritesProvider>
  );
}
