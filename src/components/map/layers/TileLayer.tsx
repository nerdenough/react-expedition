import { useContext, useEffect } from 'react'
import { MapContext } from '../context'
import OLTileLayer from 'ol/layer/Tile'
import type OSM from 'ol/source/OSM'

interface ITileLayerProps {
  source: OSM
  zIndex?: number
}

export const TileLayer = ({ source, zIndex = 0 }: ITileLayerProps) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) {
      return
    }

    const tileLayer = new OLTileLayer({ source, zIndex })
    map.addLayer(tileLayer)
    tileLayer.setZIndex(zIndex)

    return () => {
      if (map) {
        map.removeLayer(tileLayer)
      }
    }
  }, [map, source, zIndex])

  return null
}
