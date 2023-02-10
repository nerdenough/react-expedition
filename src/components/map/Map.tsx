import { useEffect, useRef, useState } from 'react'
import { Map as OLMap, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import type { Coordinate } from 'ol/coordinate'
import type { Extent } from 'ol/extent'
import { get, type Projection } from 'ol/proj.js'

import { MapContext } from './context'

type Props = {
  /**
   * Child elements for the map such as layers, interactions, and controls.
   */
  children?: any
  /**
   * Class name to apply to the map's root div.
   */
  className?: string
  /**
   * Width of the map.
   */
  width?: number
  /**
   * Height of the map.
   */
  height?: number
  /**
   * Coordinate for the viewport to center.
   */
  center?: Coordinate
  /**
   * Viewport zoom of the map.
   */
  zoom?: number
  /**
   * Extent of the map.
   */
  extent?: Extent
}

const defaultExtent = (get('EPSG:3857') as Projection).getExtent().slice()

/**
 * Map component powered by OpenLayers.
 */
export const Map = ({
  children,
  className,
  width = 640,
  height = 480,
  center = [0, 0],
  zoom = 1,
  extent = defaultExtent,
}: Props) => {
  const mapRef = useRef<any>()
  const [map, setMap] = useState<OLMap | null>(null)

  useEffect(() => {
    const mapObject = new OLMap({
      controls: [],
      target: mapRef.current,
      layers: [],
      view: new View({
        center,
        zoom,
        extent,
      }),
    })

    setMap(mapObject)
    return () => mapObject.setTarget(undefined)
  }, [])

  useEffect(() => {
    map && map.getView().setCenter(fromLonLat(center))
  }, [map, center])

  useEffect(() => {
    map && map.getView().setZoom(zoom)
  }, [map, zoom])

  return (
    <MapContext.Provider value={{ map }}>
      <div className={className} ref={mapRef} style={{ width, height }}>
        {children}
      </div>
    </MapContext.Provider>
  )
}
