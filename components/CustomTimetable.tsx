import {useContext} from 'react'
import { View } from "react-native"
import { Text } from "react-native-paper"
import { DigitrafficContext } from "../context/DigitrafficContext"


interface Props {
    start: string
    destination: string
}

const CustomTimeTable : React.FC<Props> = ({start, destination} : Props) : React.ReactElement => {
    const {getStationName} = useContext(DigitrafficContext);

    return (
        <View>
            <Text>{getStationName(start)}-{getStationName(destination)}</Text>
        </View>
    )
}

export default CustomTimeTable