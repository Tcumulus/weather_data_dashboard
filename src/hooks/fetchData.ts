const stations = [
  { id: "IOUDHEVE5", height: 62 }, 
  { id: "IBIERB1", height: 60 },
  { id: "IBIERB9", height: 81 },
  { id: "IBEAUV36", height: 80 },
  { id: "IHULDENB18", height: 45 },
  { id: "ITERVU4", height: 77 },
  { id: "ITERVU1", height: 79 },
  { id: "IBERTE5", height: 44 },
  { id: "IBIERB6", height: 50 },
  { id: "IBEAUVEC19", height: 84 },
  { id: "ILUBBE7", height: 89 },
  { id: "IINCOU4", height: 113 },
  { id: "IJODOI8", height: 119 },
  { id: "IHOEGA6", height: 83 },
  { id: "IBIERB2", height: 52 },
  { id: "ILEUVE38", height: 68 },
  { id: "IHULDENB17", height: 36 },
  { id: "IOVERI6", height: 83 },
  { id: "IOVERI2", height: 96 },
  { id: "ILEUVE22", height: 64 },
  { id: "ILEUVEN18", height: 35 },
  { id: "ILEUVE47", height: 47 },
  { id: "IBERTEM5", height: 82 },
  { id: "ITERVURE22", height: 100 },
]

export interface dataObject {
  id: string,
  height: number,
  temperature: number,
  humidity: number,
  wind: number
}

export const fetchData = async(): Promise<dataObject[]> => {
  const stationJson: any[] = await Promise.all(stations.map(async (station) => {
    const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station.id}&format=json&units=m&apiKey=${process.env.REACT_APP_API_KEY}&numericPrecision=decimal`)
    return response.json()
  }))
  
  const stationData: dataObject[] = []
  for (let i=0; i<stationJson.length; i++) {
    const data: dataObject = {
      id: stations[i].id,
      height: stations[i].height,
      temperature: stationJson[i].observations[0].metric.temp,
      humidity: stationJson[i].observations[0].humidity,
      wind: stationJson[i].observations[0].metric.windGust
    }
    stationData.push(data)
  }
  return stationData
}