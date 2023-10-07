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

    const fetchTrains = async (stationShort : string) : Promise<void> => {
        const fetchResult = await fetch(`${ApiUrl}live-trains/station/${stationShort}?departing_trains=10&include_nonstopping=false&train_categories=Commuter,Long-distance`);
        setTrains(await fetchResult.json());
    }

    const getStationName = (stationShort : string) : string => {
        let matchingStation = stations.find((station : Station) => station.stationShortCode === stationShort);
        return matchingStation ? matchingStation.stationName : "No matching station";
    }

    useEffect(() => {
        fetchStations();
    }, [])

    return (
        <DigitrafficContext.Provider value={{stations, fetchTrains, trains, getStationName}}>
            {props.children}
        </DigitrafficContext.Provider>
    )
}