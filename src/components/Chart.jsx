import * as echarts from 'echarts'
import { useAppSelector } from '../hooks/store'
import { useEffect, useRef } from 'react'
import { DEFAULT_VALUE } from '../contants'

export default function Chart () {
  const devices = useAppSelector(state => state.devices.devices)
  const isLoading = useAppSelector(state => state.devices.isDeviceLoading)

  // filtramos los usuarios que tengan por lo menos la fecha de installacion o la ultima lectura
  const filteredDevices = devices.filter(device => device.installationDate || device.lastRead)

  const undefinedDate = date => date?.toDate() ?? DEFAULT_VALUE.date

  const devicesId = filteredDevices.map(device => device.id)
  const devicesInstallationDate = filteredDevices.map(device => undefinedDate(device.installationDate))
  const devicesLastRead = filteredDevices.map(device => undefinedDate(device.lastRead))

  const option = {
    title: {
      text: ''
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      position: ['40%', '50%'],
      textStyle: {
        fontFamily: 'monospace',
        fontSize: 12
      },
      overflow: 'truncate'
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: ['20%', '20%'],
      axisLabel: {
        formatter: function (value, index) {
          // Formatea las fechas como mes-día (MM-dd)
          const date = new Date(value)
          const month = date.getMonth() + 1 // Los meses comienzan desde 0
          const day = date.getDate()
          return month + '-' + day
        },
        interval: 50,
        rotate: 45
      }
    },
    yAxis: {
      type: 'category',
      data: devicesId
    },
    series: [
      {
        name: 'Refill',
        type: 'bar',
        data: devicesInstallationDate
      },
      {
        name: 'Empty',
        type: 'bar',
        data: devicesLastRead
      }
    ]
  }

  const chartRef = useRef(null)

  useEffect(() => {
    if (!isLoading && chartRef.current) {
      const myChart = echarts.init(chartRef.current)

      myChart.setOption(option)

      return () => {
        myChart.dispose()
      }
    }
  }, [isLoading])

  return (
    <>
      <div ref={chartRef} style={{ width: 'auto', height: '500px', marginTop: '50px' }}></div>
    </>
  )
}
