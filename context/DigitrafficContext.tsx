import React, {createContext, useState, useEffect} from 'react';
import { Train } from '../constants/trainData';

interface Props {
    children: React.ReactNode
}

export interface Station {
    passengerTraffic: boolean
    type: string
    stationName: string
    stationShortCode: string
    stationUICCode: number
    countryCode: string
    longitude: number
    latitude: number
}

export const DigitrafficContext : React.Context<any> = createContext(undefined);

const ApiUrl = "https://rata.digitraffic.fi/api/v1/"

export const DigitrafficProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const [stations, setStations] = useState<Station[]>([]);
    const [trains, setTrains] = useState<Train[]>([]);

    const fetchStations = async () : Promise<void> => {

        const fetchResult = await fetch(`${ApiUrl}metadata/stations`, {method: "GET"});
        const allStations = await fetchResult.json();

        setStations(allStations.filter((station : Station) => {return (station.passengerTraffic && station.countryCode === "FI")}));
    }

    const fetchTrains = async (stationShort : string) : Promise<Train[]> => {
        const fetchResult = await fetch(`${ApiUrl}live-trains/station/${stationShort}?minutes_before_departure=1440&minutes_after_departure=0&minutes_before_arrival=100&minutes_after_arrival=0&train_categories=Commuter,Long-distance`);
        let fetchedTrains = await fetchResult.json();
        console.log(fetchedTrains.length)
        setTrains(fetchedTrains);
        return fetchedTrains;
    }

    const getStationName = (stationShort : string) : string => {
        let matchingStation = stations.find((station : Station) => station.stationShortCode === stationShort);
        let stationName : string = stationShort;
        if(matchingStation !== undefined) {
            if(matchingStation.stationName.endsWith(" asema")) {
                stationName = matchingStation.stationName.split(" ")[0];
            } else {
                stationName = matchingStation.stationName
            }
        }
        return stationName;
    }

    useEffect(() => {
        fetchStations();
    }, [])

    return (
        <DigitrafficContext.Provider value={{stations, fetchTrains, trains, setTrains, getStationName}}>
            {props.children}
        </DigitrafficContext.Provider>
    )
}