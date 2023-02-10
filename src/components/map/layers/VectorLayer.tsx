import { useContext, useEffect } from 'react'
import { MapContext } from '../context'
import OLVectorLayer from 'ol/layer/Vector'
import type VectorSource from 'ol/source/Vector'
import type { StyleLike } from 'ol/style/Style'
import type { FlatStyleLike } from 'ol/style/flat'

type Props = {
  source: VectorSource
  style?: StyleLike | FlatStyleLike
  zIndex?: number
}

export const VectorLayer = ({ source, style, zIndex = 0 }: Props) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) return

    const vectorLayer = new OLVectorLayer({ source, style })
    map.addLayer(vectorLayer)
    vectorLayer.setZIndex(zIndex)

    return () => {
      if (map) {
        map.removeLayer(vectorLayer)
      }
    }
  }, [source, style])

  return null
}
