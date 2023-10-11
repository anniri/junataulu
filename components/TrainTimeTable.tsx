import { TimeTableRow } from "../constants/trainData";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";
import { useContext } from "react";
import { DigitrafficContext } from "../context/DigitrafficContext";

interface Props {
    timeTableRows : TimeTableRow[]
}

interface StationRow {
    stationName: string
    track: string
    arrivesScheduled?: Date
    departuresScheduled?: Date
    arrivesEstimate?: Date
    departuresEstimate?: Date
    arrivedActual?: Date
    departuredActual?: Date
} 

const TrainTimeTable : React.FC<Props> = ({timeTableRows} : {timeTableRows : TimeTableRow[]}) : React.ReactElement => {
    const {getStationName} = useContext(DigitrafficContext);

    let rowsByStation : StationRow[] = [];

    //Get all passenger traffic stations where the train stops.
    let allStations : string[] = []
    timeTableRows.forEach((row : TimeTableRow) => {
        if(row.commercialStop && !allStations.includes(row.stationShortCode)) {
            allStations.push(row.stationShortCode);
        }
    })

    allStations.forEach((stationShort : string) => {
        const arrival : TimeTableRow | undefined= timeTableRows.find((row : TimeTableRow) => 
                                                                        row.stationShortCode === stationShort && row.type === "ARRIVAL"
                                                                    );
        const departure : TimeTableRow | undefined = timeTableRows.find((row : TimeTableRow) => 
                                                                            row.stationShortCode === stationShort && row.type === "DEPARTURE"
                                                                        );

        let stationRow : StationRow = {
                                        stationName: getStationName(stationShort),
                                        track: arrival?.commercialTrack || departure?.commercialTrack || ""
                                      };

        //All stops should arrival and departure except for first and final stations so either may be undefined.
        if(arrival !== undefined) {
            stationRow.arrivesScheduled = new Date(arrival.scheduledTime);

            //If train is late at least one minute, actual or estimate time should be shown.
            if(arrival.differenceInMinutes !== undefined && arrival.differenceInMinutes > 0) {
                if(arrival.liveEstimateTime) stationRow.arrivesEstimate = new Date(arrival.liveEstimateTime);
                if(arrival.actualTime) stationRow.arrivedActual = new Date(arrival.actualTime);
            }
        }

        if(departure !== undefined) {
            stationRow.departuresScheduled = new Date(departure.scheduledTime)

            if(departure.differenceInMinutes !== undefined && departure.differenceInMinutes > 0) {
                if(departure.liveEstimateTime) stationRow.arrivesEstimate = new Date(departure.liveEstimateTime);
                if(departure.actualTime) stationRow.arrivedActual = new Date(departure.actualTime);
            }
        }

        rowsByStation.push(stationRow);
    })

    

    return (
        <DataTable style={{flex: 1}}>
            <DataTable.Header>
               <DataTable.Title>Asema</DataTable.Title>
               <DataTable.Title>Raide</DataTable.Title>
               <DataTable.Title>Saapuu</DataTable.Title>
               <DataTable.Title>Lähtee</DataTable.Title> 
            </DataTable.Header>
            <ScrollView>
                {rowsByStation.map((row : StationRow) => (
                    <DataTable.Row key={row.stationName}>
                        <DataTable.Cell>{row.stationName}</DataTable.Cell>
                        <DataTable.Cell>{row.track}</DataTable.Cell>
                        <DataTable.Cell>
                                {(row.arrivesScheduled)
                                ? row.arrivesScheduled.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
                                : "" }
                        </DataTable.Cell>
                        <DataTable.Cell>
                                {(row.departuresScheduled)
                                ? row.departuresScheduled.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
                                : "" }
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </ScrollView>
        </DataTable>
    )
}

export default TrainTimeTable;