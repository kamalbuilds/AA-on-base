import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import styled from '@emotion/styled'
import { Theme } from '@mui/material'

import safeLogo from 'src/assets/safe-logo.svg'
import ChainSelector from 'src/components/chain-selector/ChainSelector'

type IntroProps = {
  setStep: (newStep: number) => void
}

const Intro = ({ setStep }: IntroProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      paddingTop="72px"
      paddingLeft="100px"
    >

      <Typography variant="body1">
        Powered By Safe and Web3Auth
      </Typography>

      <Typography variant="h1" fontSize="64px" lineHeight="76px">
        Account Abstraction on Base + 5 chains
      </Typography>

      <Typography variant="body1">
        You can follow the steps to create account and fund for you project in 2 easy steps. No need for any wallet or any other things. You can login via google.
      </Typography>

      {/* Kit list */}
      <Box display="flex" gap={2} marginTop="36px">
        <Box display="flex" gap={1}>
          <OrderLabel fontSize="10px" fontWeight="700">
            01
          </OrderLabel>
          <Typography fontWeight="700" fontSize="20px">
            Create Safe
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <OrderLabel fontSize="10px" fontWeight="700">
            02
          </OrderLabel>
          <Typography fontWeight="700" fontSize="20px">
            Fund Project
          </Typography>
        </Box>
      </Box>

      <Divider style={{ alignSelf: 'stretch', margin: '42px 0' }} />

      <Typography variant="h2" fontWeight="700" fontSize="20px">
        Select the network from the drop Down
      </Typography>

      <Box display="flex" gap={2} marginTop="32px" alignItems="center">
        <ChainSelector />

        <Button variant="contained" onClick={() => setStep(1)}>
          Let's Gooooo
        </Button>
      </Box>
    </Box>
  )
}

export default Intro

const OrderLabel = styled(Typography)<{
  theme?: Theme
}>(
  ({ theme }) => `
  border: 1px solid ${theme.palette.text.primary};
  border-radius: 4px;
  padding: 4px 6px;
  line-height: 12px;
`
)
