//This file holds interfaces for Digitraffic train response types.

export interface Train {
    trainNumber: number     //Between 1-99999
    debartureDate: string   //date
    operatorUICCode: number
    operatorShortCode: string
    trainType: string
    trainCategory: string
    commuterLineID?: string
    runningCurrently: boolean
    cancelled: boolean
    version: number
    timetableType: string   //REGULAR or ADHOC
    timetableAcceptanceDate: string //datetime
    deleted?: boolean   //Cancelled 10 days before departure
    timeTableRows: TimeTableRow[]
}

export interface TimeTableRow {
    trainStopping: boolean
    stationShortCode: string
    countryCode: string     //FI or RU
    type: string            //ARRIVAL or DEPARTURE
    commercialStop?: boolean
    commercialTrack?: string
    cancelled: boolean
    scheduledTime: string
    liveEstimateTime?: string
    estimateSource?: string
    unknownDelay?: boolean
    actualTime?: string
    differenceInMinutes?: number
    causes: Cause[]
    trainReady: TrainReady
}

interface Cause {
    categoryCodedId: number
    categoryCode: string
    detailedCategoryCodeId?: number
    detailedCategoryCode?: string
    thirdCategoryCodeId?: number
    thirdCategoryCode?: string
}

interface TrainReady {
    source: string
    accepted: boolean
    timestamp: string
}