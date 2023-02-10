import { createContext } from 'react'
import { Map as OLMap } from 'ol'

export const MapContext = createContext<{ map: OLMap | null }>({ map: null })
