import {Button, Modal, Portal, Text } from "react-native-paper"
import { View } from "react-native"
import { useState } from "react"
import CreateTimetableForm from "../../components/CreateTimetableForm"

export default function CustomTimetablesScreen() {
    const [showModal, setShowModal] = useState<boolean>(false)

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
                    <CreateTimetableForm />
                    </View>
                </Modal>
            </Portal>
            <Text>Etusivun aikataulut</Text>
            <Button onPress={() => setShowModal(true)}>Lisää taulu</Button>
        </View>
    )
}