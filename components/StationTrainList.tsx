import {useContext, useEffect, useState} from 'react';
import { DigitrafficContext } from '../context/DigitrafficContext';
import { TimeTableRow, Train } from '../constants/trainData';
import { Button, Chip, List, Modal, Portal, Text } from 'react-native-paper';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import TrainListItem, { TrainStopData } from './TrainListItem';
import TrainTimeTable from './TrainTimeTable';
import { FavoritesContext } from "../context/FavoritesContext";

interface Props {
    stationShort: string
}

const StationTrainList : React.FC<Props> = ({stationShort}: {stationShort : string}) : React.ReactElement => {
    const {fetchTrains, trains, getStationName} = useContext(DigitrafficContext);
    const {favoriteStations} = useContext(FavoritesContext);
    const [showTrainModal, setShowTrainModal] = useState<boolean>(false);
    const [activeTrain, setActiveTrain] = useState<Train>();
    const [filteredTrains, setFilteredTrains] = useState<Train[]>([...trains]);
    
    const [stationFilters, setStationFilters] = useState<string[]>([]);

    useEffect(() => {
        fetchTrains(stationShort);
        console.log("Suosikit tässä: " + favoriteStations)
    }, [])

    useEffect(() => {
        filterTrains();
    }, [trains, stationFilters])


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

    const getStoppingStations = () : void => {

    }

    const toggleStationFilter = (stationShort : string) : void => {
        if(stationFilters.includes(stationShort)) {
            setStationFilters(stationFilters.filter((station : string) => station !== stationShort));
        } else {
            setStationFilters([...stationFilters, stationShort]);
        }
    }

    const filterTrains = () : void => {
        setFilteredTrains(trains.filter((train : Train) => {
            if(stationFilters.length > 0) {
                let stationStop = train.timeTableRows.find((row : TimeTableRow) => stationFilters.includes(row.stationShortCode) && row.commercialStop)
               return Boolean(stationStop);
            } else {
                return true;
            }
        }))
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
            <View>
                    <Text>Suosikkiaseman kautta:</Text>
                        <ScrollView horizontal>
                        {favoriteStations.map((station : string) => {
                            if(station !== stationShort) {
                                return  <Chip 
                                key={station} 
                                style={{marginHorizontal: 1}}
                                selected={stationFilters.includes(station)}
                                onPress={() => toggleStationFilter(station)}
                                >
                                    {getStationName(station)}
                                </Chip>
                            }
                        })}
                        </ScrollView>

            </View>
            {(trains.length > 0) 
            ? <FlatList 
                data={filteredTrains}
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