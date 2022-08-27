import ga4 from 'react-ga4'
const env = process.env;

const TRACKING_ID = "G-YGXJZDC4J8"

const init = () => ga4.initialize(TRACKING_ID)

export function useAnalytics() {
    if (env.NODE_ENV === 'production') { init() }
}

export default useAnalytics

