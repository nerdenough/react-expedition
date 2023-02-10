import { useContext, useEffect } from 'react'
import { MapContext } from '../context'
import OLZoomControl, { type Options } from 'ol/control/Zoom'

interface Props {
  options: Options
}

export const ZoomControl = ({ options }: Props) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) {
      return
    }

    const control = new OLZoomControl(options)
    map.addControl(control)

    return () => {
      if (map) {
        map.removeControl(control)
      }
    }
  }, [map, options])

  return null
}
