import {useContext, useEffect, useState} from 'react';
import { DigitrafficContext } from '../context/DigitrafficContext';
import { Train } from '../constants/trainData';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Text } from './Themed';

interface Props {
    stationShort: string
}

const StationTrainList : React.FC<Props> = ({stationShort}: {stationShort : string}) : React.ReactElement => {
    const {fetchTrains, trains} = useContext(DigitrafficContext)

    useEffect(() => {
        fetchTrains(stationShort);
    }, [])

    return (
        <ScrollView>
            <List.Section>
                {(Boolean(trains)
                ? trains.map((train : Train) => { return (
                    <List.Item
                        title={train.trainNumber}
                    />
                )})
                : <Text>Nothing</Text>)


                }

            </List.Section>
        </ScrollView>
    )
}

export default StationTrainList;