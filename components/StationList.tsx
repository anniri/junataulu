import {useContext, useState} from 'react';
import { DigitrafficContext, Station } from '../context/DigitrafficContext';
import { List, Text, TextInput } from 'react-native-paper';
import {Pressable, ScrollView} from 'react-native';
import { Link, router } from 'expo-router';

const StationList : React.FC = () : React.ReactElement => {
    const {stations, fetchTrains, setTrains} = useContext(DigitrafficContext);
    const [stationNameFilter, setStationNameFilter] = useState<string>("")

    const openStation = (stationShort : string) : void => {
        setTrains([]);
        router.push(`/station/${stationShort}`);
    }

    return (
        <ScrollView>
            <TextInput 
                label="Aseman nimi"
                value={stationNameFilter}
                onChangeText={(text : string) => setStationNameFilter(text)}
                style={{width: "100%"}}
            />
            <List.Section>
            {stations.filter((station : Station) => station.stationName.startsWith(stationNameFilter))
            .map((station : Station) => {
                return (
                    <List.Item
                        key={station.stationShortCode} 
                        title={() => {return(
                            <Pressable onPress={() => openStation(station.stationShortCode)}>
                                <Text>{station.stationName}</Text>
                            </Pressable>
                        )}} 
                    />
                )
            })}
            </List.Section>
        </ScrollView>
    )
}

export default StationList;