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
            console.log(e)
        }
    }

    const addFavoriteStation = (stationShort : string) : void => {
        setFavoriteStations([...favoriteStations, stationShort]);
    }

    const deleteFavoriteStation =  (stationShort : string) : void => {
        setFavoriteStations(favoriteStations.filter((station : string) => station !== stationShort));
    }

    const saveFavorites = async () : Promise<void> => {
        try {
            await AsyncStorage.setItem("fav-stations", JSON.stringify(favoriteStations));
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getFavoriteStations();
    }, [])

    //Each time favorites are changed, the updated value is stored into local storage.
    useEffect(() => {
        saveFavorites();
    }, [favoriteStations])

    return (
        <FavoritesContext.Provider value={{favoriteStations, addFavoriteStation, deleteFavoriteStation}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}