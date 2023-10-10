import { useLocalSearchParams } from "expo-router";
import { View } from '../../components/Themed';
import StationTrainList from "../../components/StationTrainList";
import {useContext} from 'react'
import { DigitrafficContext } from "../../context/DigitrafficContext";
import { Text } from "react-native-paper";

export default function StationInfoScreen() {
    const {getStationName} = useContext(DigitrafficContext)
    const {stationShort} = useLocalSearchParams();

    return(
        <View>
            <Text variant="headlineSmall">{getStationName(stationShort)}</Text>
            <StationTrainList stationShort={stationShort.toString()}/>
        </View>
    )
}