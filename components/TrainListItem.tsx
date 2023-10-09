import { Surface, Text } from "react-native-paper";
import { TimeTableRow, Train } from "../constants/trainData";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useContext } from "react";
import { DigitrafficContext } from "../context/DigitrafficContext";

export interface TrainStopData {
    trainName: string
    trainCategory: string
    cancelled: boolean
    stationTo: string
    stationFrom: string
    timeTableRow: TimeTableRow
    showDepOrArr: boolean
}

interface Props {
    trainStopData : TrainStopData
}



const TrainListItem : React.FC<Props> = ({trainStopData}: {trainStopData : TrainStopData}) : React.ReactElement => {
    const {timeTableRow} = trainStopData;
    const theme = useTheme();

    let scheduledTime = new Date(timeTableRow.scheduledTime);
    let onTime : boolean = (!timeTableRow.unknownDelay && !trainStopData.cancelled);
    let liveEstimateTime = (timeTableRow.liveEstimateTime !== undefined) ? new Date(timeTableRow.liveEstimateTime) : undefined;
    if(liveEstimateTime !== undefined && liveEstimateTime.getMinutes() !== scheduledTime.getMinutes()) {
        onTime = false;
    }
    

    return (
         <View style={styles.trainContainer}>
            <View style={{flex:1}}>
                <Surface style={{padding:10, alignItems:"center"}}>
                    <Text variant="labelLarge">{trainStopData.trainName}</Text>
                </Surface>
            </View>
            <View style={{flex:3}}>
                <Text>{trainStopData.stationFrom}-{trainStopData.stationTo}</Text>
                <Text>Raide {timeTableRow.commercialTrack}</Text>
            </View>
            <View style={{flex: 1}}>
                <Surface style={ (onTime) 
                                 ? {...styles.basicTimeContainer, backgroundColor: theme.colors.primaryContainer}
                                 : {...styles.basicTimeContainer, backgroundColor: theme.colors.surfaceDisabled}
                                }>
                    <Text style={(onTime) ? {} : {textDecorationLine: "line-through"}}>
                        {scheduledTime.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </Text>
                </Surface>
                {(!onTime && liveEstimateTime !== undefined)
                    ? <Surface style={{...styles.basicTimeContainer, backgroundColor: theme.colors.tertiaryContainer}}>
                        <Text>{liveEstimateTime.getHours()}:{liveEstimateTime.getMinutes()}</Text>
                    </Surface>
                    : (timeTableRow.unknownDelay)
                       ? <Surface style={{...styles.basicTimeContainer, backgroundColor: theme.colors.errorContainer}}>
                            <Text>Lähtöaika ei tiedossa</Text>
                        </Surface>
                       : null
                }
                {(trainStopData.cancelled)
                    ? <Surface style={{...styles.basicTimeContainer, backgroundColor: theme.colors.errorContainer}}>
                        <Text>Peruttu</Text>
                    </Surface>
                    : null}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    trainContainer: {
        flexDirection: "row", 
        justifyContent:"space-between", 
        alignItems:"flex-start", 
        padding: 5, 
        columnGap: 5,
        borderBottomColor: "grey",
        borderBottomWidth: 1
    },
    basicTimeContainer: {
        padding: 10
    }
})

export default TrainListItem;