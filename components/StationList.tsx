import {useContext, useState} from 'react';
import { DigitrafficContext, Station } from '../context/DigitrafficContext';
import { List, Text, TextInput } from 'react-native-paper';
import {ScrollView} from 'react-native';
import { Link } from 'expo-router';

const StationList : React.FC = () : React.ReactElement => {
    const {stations} = useContext(DigitrafficContext);
    const [stationNameFilter, setStationNameFilter] = useState<string>("")

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
                          <Link href={`/station/${station.stationShortCode}`}><Text>{station.stationName}</Text></Link>
                        )}} 
                    />
                )
            })}
            </List.Section>
        </ScrollView>
    )
}

export default StationList;