import StationList from "../../components/StationList"
import {Text, View } from "../../components/Themed"

export default function StationsScreen() {
    return (
        <View>
            <Text>Liikennetietojen lähde:</Text>
            <Text>Fintraffic / digitraffic.fi</Text>
            <Text>(digitraffic.fi/rautatieliikenne)</Text>
            <Text>Lisenssi: CC 4.0 BY</Text>
        </View>
    )
}