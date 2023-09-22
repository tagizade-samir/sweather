import React, {FC} from 'react'

import {DetailRow} from '../../components/detailRow'
import {unitsSelector, useAppStore} from '../../store'
import {TUnits} from '../../types/enums'
import {ICurrent} from '../../types/interfaces'
import {getFeelsLike} from '../../utils'

interface CityInfoBlockProps {
  current: ICurrent
}

export const CityInfoBlock: FC<CityInfoBlockProps> = ({current}) => {
  const tempUnits = useAppStore(unitsSelector)
  const feelsLikeValue = `${getFeelsLike(current, tempUnits)} ${
    tempUnits === TUnits.celsius ? '°C' : '°F'
  }`

  return (
    <>
      <DetailRow title="Condition" value={current.condition.text} />
      <DetailRow title="Feels like" value={feelsLikeValue} />
      <DetailRow title="Humidity" value={`${current.humidity} %`} />
      <DetailRow title="Precipitation" value={`${current.precip_mm} mm`} />
      <DetailRow title="Pressure" value={`${current.pressure_mb} mb`} />
      <DetailRow title="Visibility" value={`${current.vis_km} km`} />
      <DetailRow title="UV index" value={current.uv} />
      <DetailRow title="Wind" value={`${current.wind_mph} mph`} />
      <DetailRow title="Gusts" value={`${current.gust_mph} mph`} />
    </>
  )
}
