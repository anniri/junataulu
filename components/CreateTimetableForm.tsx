import { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { DigitrafficContext, Station } from "../context/DigitrafficContext";

const CreateTimetableForm : React.FC = () : React.ReactElement => {

    const {stations, getStationName} = useContext(DigitrafficContext);

    const [inputStartStation, setInputStartStation] = useState<string>("");
    const [inputDestination, setInputDestination] = useState<string>("");

    const [startOptions, setStartOptions] = useState<string[]>([]);
    const [destinationOptions, setDestinationOptions] = useState<string[]>([]);

    const [selectedStart, setSelectedStart] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<string>("");

    
    const getMatchingStations = (stationName : string) : string[] => {
        let matches = stations.filter((station : Station) => station.stationName.startsWith(stationName));
        if(matches.length <= 5 && matches.length > 0) return matches.map((station : Station) => station.stationShortCode);
        else return [];
    }

    useEffect(() => {
        console.log("Effectissä")
        if(inputStartStation.length >= 2) {
            console.log("Haetaan asemat")
            setStartOptions(getMatchingStations(inputStartStation));
        }
    }, [inputStartStation]);

    useEffect(() => {
        if(inputDestination.length >= 2) {
            setDestinationOptions(getMatchingStations(inputDestination));
        }
    }, [inputDestination])

    return (
        <View>
            <TextInput 
                label="Lähtöasema"
                value={inputStartStation}
                onChangeText={(text) => setInputStartStation(text)}
            />
            {(startOptions.length > 0)
            ? <RadioButton.Group onValueChange={(value) => setSelectedStart(value)} value={selectedStart}>
                {startOptions.map((stationShort : string) => <RadioButton.Item 
                                                                label={getStationName(stationShort)} 
                                                                value={stationShort} 
                                                                key={stationShort}
                                                            /> 
                                                            )}
            </RadioButton.Group>
            : null}
            <TextInput 
                label="Kohdeasema"
                value={inputDestination}
                onChangeText={(text) => setInputDestination(text)}
            />
            <Button disabled={selectedDestination.length > 0 && selectedStart.length > 0}>Lisää taulu</Button>
        </View>
    )
}

export default CreateTimetableForm;