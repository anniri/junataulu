import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { FavoritesProvider } from '../../context/FavoritesContext';
import FavoriteStationsList from '../../components/FavoriteStationsList';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
        <FavoriteStationsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
