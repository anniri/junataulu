import {Button, Modal, Portal, Text } from "react-native-paper"
import { View } from "react-native"
import { useState, useContext } from "react"
import CreateTimetableForm from "../../components/CreateTimetableForm"
import { FavoritesContext, SavedTimetable } from "../../context/FavoritesContext"
import { DigitrafficContext } from "../../context/DigitrafficContext"

export default function CustomTimetablesScreen() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const {savedTimetables} = useContext(FavoritesContext);
    const {getStationName} = useContext(DigitrafficContext);

    return (
        <View>
            <Portal>
                <Modal 
                    visible={showModal} 
                    onDismiss={() => setShowModal(false)}
                    contentContainerStyle={{width: "90%", height: "90%", backgroundColor: "white", padding: 5, alignSelf: "center"}}
                >
                    <View style={{flex: 1}}>
                    <Button onPress={() => setShowModal(false)}>Sulje</Button>
                    <CreateTimetableForm closeForm={() => setShowModal(false)} />
                    </View>
                </Modal>
            </Portal>
            <Text>Tallennetut aikataulunäkymät:</Text>
            {(savedTimetables.length > 0)
            ? <View>
                {savedTimetables.map((timetable : SavedTimetable) => <Text key={`${timetable.start}+${timetable.destination}`}>
                                                                        {getStationName(timetable.start)}-{getStationName(timetable.destination)}
                                                                    </Text>)}
            </View>
            : null}
            <Button onPress={() => setShowModal(true)}>Lisää taulu</Button>
        </View>
    )
}