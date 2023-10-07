import { useLocalSearchParams } from "expo-router";
import { Text, View } from '../../components/Themed';
import StationTrainList from "../../components/StationTrainList";


export default function StationInfoScreen() {
    const {stationShort} = useLocalSearchParams();

    return(
        <View>
            <Text>{stationShort}</Text>
            <Text>Näkymässä ollaan</Text>
            <StationTrainList stationShort={stationShort.toString()}/>
        </View>
    )
}