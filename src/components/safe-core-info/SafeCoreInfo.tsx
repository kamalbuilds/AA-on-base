import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'

import introVideo from 'src/assets/intro-chip.webm'
import introImage from 'src/assets/intro-chip.png'

const SafeCoreInfo = () => {
  return (
    <div>
      {/* video loop */}
      <video autoPlay loop muted height="500px" width="500px">
        <source src={introVideo} />
      </video>
    </div>
  )
}

export default SafeCoreInfo
