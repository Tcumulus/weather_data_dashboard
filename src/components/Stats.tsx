import React from "react"
import { average, min, max, standardDeviation } from 'simple-statistics'

interface Props {
  parameter: number[],
  unit: string
}

const Stats: React.FC<Props> = ({ parameter, unit }) => {
  return (
    <div className="flex flex-row justify-between w-full mb-4 mx-2">
      <div className="flex flex-col items-center w-1/4 px-2 border rounded-md">
        <p className="text-sm text-gray-500">Avg</p>
        <p>{Math.round(average(parameter) * 10) / 10 + unit}</p>
      </div>
      <div className="flex flex-col items-center w-1/4 px-2 ml-1 border rounded-md">
        <p className="text-sm text-gray-500">Std</p>
        <p>{Math.round(standardDeviation(parameter) * 10) / 10 + unit}</p>
      </div>
      <div className="flex flex-col items-center w-1/4 px-2 ml-1 border rounded-md">
        <p className="text-sm text-gray-500">Min</p>
        <p>{min(parameter) + unit}</p>
      </div>
      <div className="flex flex-col items-center w-1/4 px-2 ml-1 border rounded-md">
        <p className="text-sm text-gray-500">Max</p>
        <p>{max(parameter) + unit}</p>
      </div>
    </div>
  )
}

export default Stats