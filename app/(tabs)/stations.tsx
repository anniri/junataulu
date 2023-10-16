import StationList from "../../components/StationList"
import { View } from "../../components/Themed"
import { FavoritesProvider } from "../../context/FavoritesContext"

export default function StationsScreen() {
    return (
        <View>
            <FavoritesProvider>
                <StationList />
            </FavoritesProvider>          
        </View>
    )
}