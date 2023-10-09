import { Text } from "react-native-paper";
import { TimeTableRow, Train } from "../constants/trainData";
import { View } from "./Themed";
import { useContext } from "react";
import { DigitrafficContext } from "../context/DigitrafficContext";

export interface TrainStopData {
    trainName: string
    trainCategory: string
    cancelled: boolean
    stationTo: string
    stationFrom: string
    timeTableRow: TimeTableRow | string
    showDepOrArr: boolean
}

interface Props {
    trainStopData : TrainStopData
}

const TrainListItem : React.FC<Props> = ({trainStopData}: {trainStopData : TrainStopData}) : React.ReactElement => {
    const {getStationName} = useContext(DigitrafficContext);
    const {timeTableRow} = trainStopData;
    /*let trainName : string = String(train.trainNumber);

    if(train.trainCategory === "Commuter" && train.commuterLineID?.length !== undefined) {
        trainName = train.commuterLineID
    } else if(train.trainCategory === "Long-distance") {
        trainName = `${train.trainType} ${train.trainNumber}`
    }

    let trainOnStation = train.timeTableRows.find((timeTable : TimeTableRow) => timeTable.stationShortCode === stationShort && timeTable.type === "DEPARTURE");
    let stationFrom = train.timeTableRows[0];
    let stationTo = train.timeTableRows[train.timeTableRows.length - 1];*/

    return (
        <View>
            <Text>{trainStopData.trainName} ({trainStopData.stationFrom}-{trainStopData.stationTo})</Text>
            {(typeof timeTableRow !== "string")
            ? <>
                <Text>Raide {timeTableRow.commercialTrack}</Text>
                <Text>{new Date(timeTableRow.scheduledTime).toLocaleString()}</Text>
                {(timeTableRow.liveEstimateTime !== undefined &&
                new Date(timeTableRow.scheduledTime).getMinutes() < new Date(timeTableRow.liveEstimateTime).getMinutes() )
                ? <Text>{new Date(timeTableRow.liveEstimateTime).toLocaleString()}</Text>
                : null}
                {(trainStopData.showDepOrArr)
                ? <Text>{timeTableRow.type}</Text>
                : null}       
            </>
            : null
            }
        </View>
    )
}

export default TrainListItem;