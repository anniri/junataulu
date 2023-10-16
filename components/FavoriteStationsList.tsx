import { ScrollView } from "react-native-gesture-handler";
import {useContext} from 'react';
import { DigitrafficContext, Station } from "../context/DigitrafficContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { router } from "expo-router";
import { List, Text, useTheme } from "react-native-paper";
import {TouchableHighlight} from "react-native";

const FavoriteStationsList : React.FC = () : React.ReactElement => {
    const {setTrains} = useContext(DigitrafficContext);
    const {favoriteStations} = useContext(FavoritesContext);
    const theme = useTheme();

    const openStation = (stationShort : string) : void => {
        //Making sure that context's state variable "trains" is empty so the information of a previous station doesn't render when opening new one.
        setTrains([]);
        //Station info is rendered in modal view.
        router.push(`/station/${stationShort}`);
    }

    return (
        <ScrollView>
            <List.Section>
                {favoriteStations.map((station : Station) => {
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
                    />)
                })}
            </List.Section>
        </ScrollView>
    )
}

export default FavoriteStationsList;