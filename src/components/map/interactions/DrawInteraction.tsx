import { useContext, useEffect } from 'react'
import OLDrawInteraction, {
  type DrawEvent,
  type Options,
} from 'ol/interaction/Draw'
import { MapContext } from '../context'

type Props = {
  options: Options
  onDrawStart?: (e: DrawEvent) => void
  onDrawEnd?: (e: DrawEvent) => void
  onDrawAbort?: (e: DrawEvent) => void
}

export const DrawInteraction = ({
  options,
  onDrawStart,
  onDrawEnd,
  onDrawAbort,
}: Props) => {
  const { map } = useContext(MapContext)

  useEffect(() => {
    if (!map) return

    const interaction = new OLDrawInteraction(options)
    if (onDrawStart) {
      interaction.on('drawstart', onDrawStart)
    }
    if (onDrawEnd) {
      interaction.on('drawend', onDrawEnd)
    }
    if (onDrawAbort) {
      interaction.on('drawabort', onDrawAbort)
    }

    map.addInteraction(interaction)

    return () => {
      if (map) {
        map.removeInteraction(interaction)
      }
    }
  }, [options, onDrawStart, onDrawEnd, onDrawAbort])

  return null
}
