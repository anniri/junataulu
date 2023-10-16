import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    children: React.ReactNode
}

export const FavoritesContext : React.Context<any> = createContext(undefined);

export const FavoritesProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const [favoriteStations, setFavoriteStations] = useState<string[]>([]);

    const getFavoriteStations = async () : Promise<void> => {
        try {
            const favorites = await AsyncStorage.getItem("fav-stations");
            if(favorites !== null) {
                setFavoriteStations(JSON.parse(favorites));
            }
        } catch (e) {
            
        }
    }

    const addFavoriteStation = async (stationShort : string) : Promise<void> => {
        try {
            setFavoriteStations([...favoriteStations, stationShort]);
            await AsyncStorage.setItem("fav-stations", JSON.stringify(favoriteStations));
        } catch (e) {    
        }
    }

    const deleteFavoriteStation = async (stationShort : string) => {
        try {
            setFavoriteStations(favoriteStations.filter((station : string) => station !== stationShort));
            await AsyncStorage.setItem("fav-stations", JSON.stringify(favoriteStations));
        } catch (e) {
            
        }
    }

    useEffect(() => {
        getFavoriteStations();
    }, [])

    return (
        <FavoritesContext.Provider value={{favoriteStations, addFavoriteStation, deleteFavoriteStation}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}