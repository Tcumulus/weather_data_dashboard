import React, { useState } from "react"
import { sampleCorrelation } from "simple-statistics"
import { Scatter } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
import chartTrendline from "chartjs-plugin-trendline"
import { dataObject } from "../hooks/fetchData"
import Stats from "./Stats"

Chart.register(chartTrendline)
Chart.register(...registerables)

interface Props {
  data: dataObject[]
}

const Graph: React.FC<Props> = ({ data }) => {
  const [id] = useState(data.map(station => station.id))
  const [height] = useState(data.map(station => station.height))
  const [temperature] = useState(data.map(station => station.temperature))
  const [humidity] = useState(data.map(station => station.humidity))
  const [wind] = useState(data.map(station => station.wind))

  const [temperatureHeight] = useState(data.map(station => ({ x: station.temperature, y: station.height })))
  const [humidityHeight] = useState(data.map(station => ({ x: station.humidity, y: station.height })))
  const [windHeight] = useState(data.map(station => ({ x: station.wind, y: station.height })))

  let trendLineColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]
  const corrs = [sampleCorrelation(temperature, height), sampleCorrelation(humidity, height), sampleCorrelation(wind, height)]
  if (corrs[0] > 0.4 || corrs[0] < -0.4) { trendLineColors[0] = "rgba(0,0,0,0.5)" }
  if (corrs[1] > 0.4 || corrs[1] < -0.4) { trendLineColors[1] = "rgba(0,0,0,0.5)" }
  if (corrs[2] > 0.4 || corrs[2] < -0.4) { trendLineColors[2] = "rgba(0,0,0,0.5)" }

  const temperatureGraphData = {
    labels: id,
    datasets: [
      {
        label: "Temperature",
        data: temperatureHeight,
        backgroundColor: "rgba(0, 0, 0, 1)",
        trendlineLinear: {
          colorMin: trendLineColors[0],
          colorMax: trendLineColors[0],
          lineStyle: "dotted",
          width: 1
        }
      }
    ]
  }

  const humidityGraphData = {
    labels: id,
    datasets: [
      {
        label: "Humidity",
        data: humidityHeight,
        backgroundColor: "rgba(0, 0, 0, 1)",
        trendlineLinear: {
          colorMin: trendLineColors[1],
          colorMax: trendLineColors[1],
          lineStyle: "dotted",
          width: 1
        }
      }
    ]
  }

  const windGraphData = {
    labels: id,
    datasets: [
      {
        label: "Wind Speed",
        data: windHeight,
        backgroundColor: "rgba(0, 0, 0, 1)",
        trendlineLinear: {
          colorMin: trendLineColors[2],
          colorMax: trendLineColors[2],
          lineStyle: "dotted",
          width: 1
        }
      }
    ]
  }

  const options: any = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Height (m)"
        }
      }
    }
  }

  const checkCorrelation = (correlation: number): string => {
    if (Math.abs(correlation) < 0.2) { return "No correlation: " + Math.round(correlation * 100) / 100 }
    else if (Math.abs(correlation) < 0.4) { return "Low correlation: " + Math.round(correlation * 100) / 100 }
    else if (Math.abs(correlation) < 0.6) { return "Moderate correlation: " + Math.round(correlation * 100) / 100 }
    else if (Math.abs(correlation) < 0.8) { return "High correlation: " + Math.round(correlation * 100) / 100 }
    else { return "Very high correlation: " + correlation }
  }

  return (
    <div className="flex flex-row mt-4">
      <div className="flex flex-col items-center w-1/3 mx-2 px-4 py-2 border-2 rounded-xl">
        <p className="text-xl m-1 mb-4">Temperature (°C)</p>
        <Stats parameter={temperature} unit={"°C"} />
        <Scatter data={temperatureGraphData} options={options} />
        <p className="px-4 py-2 mt-2 border rounded-lg">{checkCorrelation(corrs[0])}</p>
      </div>
      <div className="flex flex-col items-center w-1/3 mx-2 px-4 py-2 border-2 rounded-xl">
        <p className="text-xl m-1 mb-4">Relative Humidity (%)</p>
        <Stats parameter={humidity} unit={"%"} />
        <Scatter data={humidityGraphData} options={options} />
        <p className="px-4 py-2 mt-2 border rounded-lg">{checkCorrelation(corrs[1])}</p>
      </div>
      <div className="flex flex-col items-center w-1/3 mx-2 px-4 py-2 border-2 rounded-xl">
        <p className="text-xl m-1 mb-4">Wind Gust Speed (m/s)</p>
        <Stats parameter={wind} unit={"m/s"} />
        <Scatter data={windGraphData} options={options} />
        <p className="px-4 py-2 mt-2 border rounded-lg">{checkCorrelation(corrs[2])}</p>
      </div>
    </div>
  )
}

export default Graph