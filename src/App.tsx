import React, { useState, useEffect } from "react"
import { fetchData, dataObject } from "./hooks/fetchData"
import Graph from "./components/Graph"
import refresh from "./assets/refresh.png"
import github from "./assets/github.png"

const App: React.FC = () => {
  const [data, setData] = useState<dataObject[] | null>(null)
  const [lastDate, setLastDate] = useState<Date | null>(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetchData()
    setData(res)
    setLastDate(new Date())
  }

  const refreshWindow = () => {
    window.location.reload()
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-2 p-4 border-2 rounded-xl">
        <h1 className="text-3xl">Weather Data</h1>
        <div className="flex flex-row items-center">
          <p className="text-xl">
            {lastDate ?
              "Last update: " + lastDate?.toLocaleTimeString() : "Loading..."
            }
          </p>
          <img src={refresh} onClick={refreshWindow} className="ml-2 w-5 h-5 cursor-pointer" alt="refresh button" />
          <img onClick={() => window.open("https://github.com/Tcumulus/weather_data_dashboard", "_blank")} src={github} alt="github" className="ml-8 mr-4 w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" />
        </div>
      </div>

      {data ?
        <Graph data={data} />
        : <p>Loading...</p>
      }
      <div className="flex flex-row flex-grow w-full justify-end">
        {data ?
          <p className="mr-4 mt-1 text-sm">{data.length + " weather stations included"}</p>
          : null
        }
      </div>
    </div>
  )
}

export default App
