import React, { useState, useEffect } from "react"
import { fetchData, dataObject } from "./hooks/fetchData"
import Graph from "./components/Graph"
import refresh from "./assets/refresh.png"
import github from "./assets/github.png"
import cloud from "./assets/cloud.png"

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

  const downloadFile = () => {
    if (data) {
      const file = new Blob([JSON.stringify(data)], { type: "application/json" })
      const url = window.URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute("download", "data.json")
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-2 p-4 border-2 rounded-xl">
        <div className="flex flex-row items-center">
          <h1 className="text-3xl text-gray-700">Weather Data</h1>
          <img src={cloud} className="ml-4 w-12 h-12 opacity-60" />
        </div>
        <div className="flex flex-row items-center">
          <p className="text-xl">
            { lastDate ?
              "Last update: " + lastDate.toLocaleTimeString() : "Loading..."
            }
          </p>
          <img src={refresh} onClick={refreshWindow} className="ml-2 w-5 h-5 cursor-pointer opacity-60 hover:opacity-100" alt="refresh button" />
          <img onClick={() => window.open("https://github.com/Tcumulus/weather_data_dashboard", "_blank")} src={github} alt="github" className="ml-8 mr-4 w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer" />
        </div>
      </div>

      { data ?
        <Graph data={data} />
        : null
      }

      { data ?
        <div className="flex flex-row flex-grow w-full justify-between">
          <a onClick={downloadFile} className="ml-4 mt-1 text-sm text-gray-500 cursor-pointer underline">Download Data</a>
          <p className="mr-4 mt-1 text-sm text-gray-500">{data.length + " weather stations included"}</p>
        </div>
        : null
      }


    </div>
  )
}

export default App
