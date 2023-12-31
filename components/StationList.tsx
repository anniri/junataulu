import {useContext, useState} from 'react';
import { DigitrafficContext, Station } from '../context/DigitrafficContext';
import { List, Searchbar, Text, TextInput } from 'react-native-paper';
import {Pressable, ScrollView, View} from 'react-native';
import { Link, router } from 'expo-router';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import { FavoritesContext } from '../context/FavoritesContext';

const StationList : React.FC = () : React.ReactElement => {
    const {stations, setTrains} = useContext(DigitrafficContext);
    const {favoriteStations, addFavoriteStation, deleteFavoriteStation} = useContext(FavoritesContext);
    const [stationNameFilter, setStationNameFilter] = useState<string>("")
    const theme = useTheme();

    const openStation = (stationShort : string) : void => {
        //Making sure that context's state variable "trains" is empty so the information of a previous station doesn't render when opening new one.
        setTrains([]);

        //Station info is rendered in modal view.
        router.push(`/station/${stationShort}`);
    }

    const toggleFavorite = (stationShort : string) : void => {
        if(favoriteStations.includes(stationShort)) {
            deleteFavoriteStation(stationShort);
        } else {
            addFavoriteStation(stationShort);
        }
    }

    return (
        <View>
            <Searchbar 
                placeholder="aseman nimi"
                value={stationNameFilter}
                onChangeText={(text : string) => setStationNameFilter(text)}
                style={{margin: 2}}
            />
            <ScrollView>
                <List.Section>
                {stations.filter((station : Station) => station.stationName.startsWith(stationNameFilter))
                .map((station : Station) => {
                    return (
                        <List.Item
                            key={station.stationShortCode} 
                            title={() => {return(
                                <TouchableHighlight 
                                    activeOpacity={0.5} 
                                    underlayColor={theme.colors.secondaryContainer} 
                                    style={{minHeight: 30, padding: 5, justifyContent: "center"}}
                                    onPress={() => openStation(station.stationShortCode)}
                                >   
                                    <Text variant="titleMedium">{station.stationName}</Text>
                                </TouchableHighlight>
                            )}}
                            right={() => <Pressable onPress={() => toggleFavorite(station.stationShortCode)}> 
                                        <List.Icon 
                                            icon={(favoriteStations.includes(station.stationShortCode) ? "star-check" : "star-outline")}
                                            
                                        />
                                        </Pressable>}
                        />
                    )
                })}
            </List.Section>
            </ScrollView>
        </View>
    )
}



export default StationList;