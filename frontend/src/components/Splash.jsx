import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ReferenceLogo } from "./Logo"

const INTRO_MS = 4800

function Splash({ onDone }) {
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const timer = window.setTimeout(() => onDoneRef.current(), INTRO_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <motion.section
      className="front-page"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Wanderly intro"
    >
      <ReferenceLogo className="front-page-logo" />
    </motion.section>
  )
}

export default Splash
