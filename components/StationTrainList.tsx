import {useContext, useEffect, useState} from 'react';
import { DigitrafficContext } from '../context/DigitrafficContext';
import { TimeTableRow, Train } from '../constants/trainData';
import { List } from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native';
import { Text } from './Themed';
import TrainListItem, { TrainStopData } from './TrainListItem';

interface Props {
    stationShort: string
}

const StationTrainList : React.FC<Props> = ({stationShort}: {stationShort : string}) : React.ReactElement => {
    const {fetchTrains, trains, getStationName} = useContext(DigitrafficContext)
    
    useEffect(() => {
        fetchTrains(stationShort);
    }, [])

    const formTrainStopData = (train : Train) : TrainStopData => {
        let trainName : string = String(train.trainNumber);

        if(train.trainCategory === "Commuter" && train.commuterLineID?.length !== undefined) {
            trainName = train.commuterLineID
        } else if(train.trainCategory === "Long-distance") {
            trainName = `${train.trainType} ${train.trainNumber}`
        }

        let trainOnStation = train.timeTableRows.find((timeTable : TimeTableRow) => timeTable.stationShortCode === stationShort && timeTable.type === "DEPARTURE");

        return {
            trainName: trainName,
            trainCategory: train.trainCategory,
            cancelled: train.cancelled,
            stationTo: getStationName(train.timeTableRows[train.timeTableRows.length - 1].stationShortCode),
            stationFrom: getStationName(train.timeTableRows[0].stationShortCode),
            timeTableRow: train.timeTableRows.find((timeTable : TimeTableRow) => 
                                                    timeTable.stationShortCode === stationShort && timeTable.type === "DEPARTURE"
                                                ) || "no data",
            showDepOrArr: false
        }
    }

    return (
            (trains.length > 0) 
            ? <FlatList 
                data={trains}
                renderItem={({item}) => {return (<TrainListItem trainStopData={formTrainStopData(item)} />)}}
                />
            : <></>
        

    )
}

export default StationTrainList;