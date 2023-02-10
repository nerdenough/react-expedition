import { useContext, useEffect } from 'react'
import { MapContext } from '../context'
import OLAttribution, { type Options } from 'ol/control/Attribution'

interface Props {
  options: Options
}

export const AttributionControl = ({ options }: Props) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) {
      return
    }

    const control = new OLAttribution(options)
    map.addControl(control)

    return () => {
      if (map) {
        map.removeControl(control)
      }
    }
  }, [map, options])

  return null
}
