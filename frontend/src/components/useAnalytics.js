import React from 'react'
import { useLocation } from 'react-router-dom'
import ga4 from 'react-ga4'

const TRACKING_ID = "G-YGXJZDC4J8"

const init = () => ga4.initialize(TRACKING_ID)

const sendPageview = (path) => ga4.send({ 
  hitType: 'pageview', 
  page: path 
})

export function useAnalytics() {
  const location = useLocation()

  React.useEffect(() => {
    init()
  }, [])

  React.useEffect(() => {
    const path = location.pathname + location.search
    sendPageview(path)
  }, [location])
}

export default useAnalytics

