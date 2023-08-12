import styled from '@emotion/styled'
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'
import SendIcon from '@mui/icons-material/SendRounded'
import { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { utils } from 'ethers'
import { useState } from 'react'
import { CodeBlock, atomOneDark } from 'react-code-blocks'

import AddressLabel from 'src/components/address-label/AddressLabel'
import Forms from 'src/components/form/Forms'
import GelatoTaskStatusLabel from 'src/components/gelato-task-status-label/GelatoTaskStatusLabel'
import SafeInfo from 'src/components/safe-info/SafeInfo'
import { useAccountAbstraction } from 'src/store/accountAbstractionContext'

const transferAmount = 0.01

const RelayerKitDemo = () => {
  const {
    chainId,
    chain,

    safeSelected,
    safeBalance,

    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,

    isAuthenticated,
    loginWeb3Auth
  } = useAccountAbstraction()

  const [transactionHash, setTransactionHash] = useState<string>('')

  // TODO: ADD PAY FEES USING USDC TOKEN

  const hasNativeFunds =
    !!safeBalance && Number(utils.formatEther(safeBalance || '0')) > transferAmount

  return (
    <>
      <Typography variant="h2" component="h1">
        Fund Project
      </Typography>

      <Typography marginTop="16px">
        Fund any project by just entering the project id and amount that you want to contribute.
      </Typography>

      <Divider sx={{ margin: '32px 0 28px 0' }} />

      {!isAuthenticated ? (
        <ConnectedContainer
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          <Typography variant="h4" component="h3" fontWeight="700">
            To use the Relay Kit you need to be authenticated
          </Typography>

          <Button variant="contained" onClick={loginWeb3Auth}>
            Connect
          </Button>
        </ConnectedContainer>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {/* safe Account */}
          <ConnectedContainer>
            <Typography fontWeight="700">Safe Account</Typography>

            <Typography fontSize="14px" marginTop="8px" marginBottom="32px">
              Your Safe account (Smart Contract) holds and protects your assets.
            </Typography>

            {/* Safe Info */}
            {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />}
          </ConnectedContainer>

          <ConnectedContainer>
            <Head> Fund Project </Head>
            <Forms />
          </ConnectedContainer>
        </Box>
      )}

      <Divider style={{ margin: '40px 0 30px 0' }} />





    </>
  )
}

export default RelayerKitDemo

const ConnectedContainer = styled(Box)<{
  theme?: Theme
}>(
  ({ theme }) => `
  
  border-radius: 10px;
  border: 1px solid ${theme.palette.border.light};
  padding: 40px 32px;
`
)



const Head = styled.h1`
`
