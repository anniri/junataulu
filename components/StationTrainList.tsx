import {useContext, useEffect, useState} from 'react';
import { DigitrafficContext } from '../context/DigitrafficContext';
import { TimeTableRow, Train } from '../constants/trainData';
import { Button, List, Modal, Portal } from 'react-native-paper';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from './Themed';
import TrainListItem, { TrainStopData } from './TrainListItem';
import TrainTimeTable from './TrainTimeTable';

interface Props {
    stationShort: string
}

const StationTrainList : React.FC<Props> = ({stationShort}: {stationShort : string}) : React.ReactElement => {
    const {fetchTrains, trains, getStationName} = useContext(DigitrafficContext);
    const [showTrainModal, setShowTrainModal] = useState<boolean>(false);
    const [activeTrain, setActiveTrain] = useState<Train>();
    
    useEffect(() => {
        fetchTrains(stationShort);
    }, [])

    //Triggers modal for displaying single train's timetable.
    const openTrainView = (train : Train) : void => {
        setActiveTrain(train);
        setShowTrainModal(true);
    }

    const parseTrainName = (train : Train) : string => {
        //Displayed train name depends on train type.
        //Only line id (R, U...) is shown for commuter trains.
        //Long distance trains will show train type (IC, S...) and train number.
        let trainName : string = String(train.trainNumber);

        if(train.trainCategory === "Commuter" && train.commuterLineID?.length !== undefined) {
            trainName = train.commuterLineID
        } else if(train.trainCategory === "Long-distance") {
            trainName = `${train.trainType} ${train.trainNumber}`
        }
        return trainName;
    }


    //TrainListItem component shows relevant information about a train and takes TrainStopData as props.
    //This function extracts required information from the Train object and forms a TrainStopData object from it.
    const formTrainStopData = (train : Train) : TrainStopData => {

        let trainName : string = parseTrainName(train);

        //Train object has a TimeTableRow object for every station it arrives to and departures from.
        //Find method finds the relevant TimeTableRow for active station.
        let trainOnStation = train.timeTableRows.find((timeTable : TimeTableRow) => timeTable.stationShortCode === stationShort && timeTable.type === "DEPARTURE");

        return {
            trainName: trainName,
            trainCategory: train.trainCategory,
            cancelled: train.cancelled,
            stationTo: getStationName(train.timeTableRows[train.timeTableRows.length - 1].stationShortCode),
            stationFrom: getStationName(train.timeTableRows[0].stationShortCode),
            //If data is somehow incoherrent and relevant TimeTableRow for active station is not found, a shallow TimeTableRow is created to avoid software errors.
            timeTableRow: trainOnStation || {
                                                    trainStopping: true,
                                                    stationShortCode: "",
                                                    countryCode: "fi",
                                                    type: "",
                                                    cancelled: false,
                                                    scheduledTime: "",
                                                    causes: [],
                                                    trainReady: {source: "", accepted: false, timestamp: ""}
                                                },
            showDepOrArr: false
        }
    }


    return (
        <View>
            <Portal>
            <Modal 
                visible={showTrainModal} 
                onDismiss={() => setShowTrainModal(false)}
                contentContainerStyle={{width: "90%", height: "90%", backgroundColor: "white", padding: 5, alignSelf: "center"}}
            >
                <View style={{flex: 1}}>
                <Button onPress={() => setShowTrainModal(false)}>Sulje</Button>
                {
                    (activeTrain)
                    ? <TrainTimeTable timeTableRows={activeTrain.timeTableRows}/>
                    : null
                }
                </View>
            </Modal>
            </Portal>
            {(trains.length > 0) 
            ? <FlatList 
                data={trains}
                renderItem={({item}) => {return (
                                                <TouchableOpacity onPress={() => openTrainView(item)}>
                                                    <TrainListItem trainStopData={formTrainStopData(item)} />
                                                </TouchableOpacity>
                                                )}}
                maxToRenderPerBatch={10}
                keyExtractor={(item) => item.trainNumber + item.timeTableRows[0].scheduledTime}
                />
            : <></>}

        </View>
    )
}

export default StationTrainList;