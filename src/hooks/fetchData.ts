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
  const stationPromise: any[] = await Promise.all(stations.map(async (station) => {
    return await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${station.id}&format=json&units=m&apiKey=${process.env.REACT_APP_API_KEY}&numericPrecision=decimal`)
  }))

  const stationData: dataObject[] = []
  for (let i=0; i<stationPromise.length; i++) {
    if (stationPromise[i].status === 200) {
      const stationJson = await stationPromise[i].json()
      const data: dataObject = {
        id: stations[i].id,
        height: stations[i].height,
        temperature: stationJson.observations[0].metric.temp,
        humidity: stationJson.observations[0].humidity,
        wind: stationJson.observations[0].metric.windGust
      }
      if (data.temperature !== null && data.humidity !== null && data.wind !== null) {
        if(data.temperature > -20 && data.temperature < 45) {
          stationData.push(data)
        }
      } 
    }
  }
  return stationData
}