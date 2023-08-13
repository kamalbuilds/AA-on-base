import { useCallback, useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { Button, Skeleton, Theme } from '@mui/material'
import styled from '@emotion/styled'
import { ethers, providers, utils } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'

import AddressLabel from 'src/components/address-label/AddressLabel'
import AmountLabel from 'src/components/amount-label/AmountLabel'
import getSafeInfo from 'src/api/getSafeInfo'
import useApi from 'src/hooks/useApi'
import safeLogoLight from 'src/assets/safe-info-logo-light.svg'
import safeLogoDark from 'src/assets/safe-info-logo-dark.svg'
import usePolling from 'src/hooks/usePolling'
import { useAccountAbstraction } from 'src/store/accountAbstractionContext'
import { useTheme } from 'src/store/themeContext'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types'

type SafeInfoProps = {
  safeAddress: string
  chainId: string
}

// TODO: ADD USDC LABEL
// TODO: ADD CHAIN LABEL

function SafeInfo({ safeAddress, chainId }: SafeInfoProps) {
  const { web3Provider, chain, safeBalance, ownerAddress } = useAccountAbstraction()

  const [isDeployed, setIsDeployed] = useState<boolean>(false)
  const [isDeployLoading, setIsDeployLoading] = useState<boolean>(true)

  const { isDarkTheme } = useTheme()

  // detect if the safe is deployed with polling
  const detectSafeIsDeployed = useCallback(async () => {
    const isDeployed = await isContractAddress(safeAddress, web3Provider)

    setIsDeployed(isDeployed)
    setIsDeployLoading(false)
  }, [web3Provider, safeAddress])

  usePolling(detectSafeIsDeployed)

  // safe info from Safe transaction service (used to know the threshold & owners of the Safe if its deployed)
  const fetchInfo = useCallback(
    (signal: AbortSignal) => getSafeInfo(safeAddress, chainId, { signal }),
    [safeAddress, chainId]
  )

  const { data: safeInfo, isLoading: isGetSafeInfoLoading } = useApi(fetchInfo)

  const owners = safeInfo?.owners.length || 1
  const threshold = safeInfo?.threshold || 1
  const isLoading = isDeployLoading || isGetSafeInfoLoading

  const handleFirstTransaction = async () => {
    if (web3Provider) {
      try {
        const signer = web3Provider.getSigner();

        const destination = "0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132";
        const amount = ethers.utils.parseEther("0.001"); // Convert 1 ether to wei

        console.log("Input", web3Provider, signer, destination, amount, ownerAddress, chainId, safeBalance);

        // Submit transaction to the blockchain
        const tx = await signer.sendTransaction({
          to: destination,
          value: amount,
          maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
          maxFeePerGas: "6000000000000", // Max fee per gas
        });

        // // Wait for transaction to be mined
        const receipt = await tx.wait();

        console.log("Receipt", receipt);

        // const signer = web3Provider.getSigner();

        // const originalMessage = "YOUR_MESSAGE";

        // const signedMessage = await signer.signMessage(originalMessage);

        // console.log("Signed message", signedMessage)


        // const signer = web3Provider.getSigner()

        // const ethAdapter = new EthersAdapter({
        //   ethers,
        //   signerOrProvider: signer || web3Provider
        // })

        // const safeSDK = await Safe.create({
        //   ethAdapter,
        //   safeAddress
        // })

        // const destination = "0xCF8D2Da12A032b3f3EaDC686AB18551D8fD6c132";

        // // Create a Safe transaction with the provided parameters
        // const safeTransactionData: MetaTransactionData = {
        //   to: destination,
        //   data: '0x',
        //   value: ethers.utils.parseUnits('0.0001', 'ether').toString()
        // }

        // const safeTransaction = await safeSDK.createTransaction({ safeTransactionData })
        // console.log("safeTransaction", safeTransaction);


      } catch (error) {
        console.log("Error ", error)
      }
    } else {
      console.log("Web3 Provider is undefined")
    }

  }

  return (
    <Stack direction="row" spacing={2}>
      <div style={{ position: 'relative' }}>
        {/* Safe Logo */}
        {isLoading ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <img
            src={isDarkTheme ? safeLogoDark : safeLogoLight}
            alt="connected Safe account logo"
            height="50px"
          />
        )}

        {/* Threshold & owners label */}
        {isDeployed && (
          <SafeSettingsLabel>
            <Typography fontSize="12px" fontWeight="700" color="inherit" lineHeight="initial">
              {threshold}/{owners}
            </Typography>
          </SafeSettingsLabel>
        )}
      </div>

      <Stack direction="column" spacing={0.5} alignItems="flex-start">
        {/* Safe address label */}
        <Typography variant="body2">
          <AddressLabel address={safeAddress} showBlockExplorerLink />
        </Typography>

        {isLoading && <Skeleton variant="text" width={110} height={20} />}

        {!isDeployed && !isDeployLoading && (
          <>
            <CreationPendingLabel>
              <Tooltip title="This Safe is not deployed yet, it will be deployed when you execute the first transaction">
                <Typography fontWeight="700" fontSize="12px" color="inherit">
                  Creation pending
                </Typography>

              </Tooltip>
            </CreationPendingLabel>

            <Button onClick={handleFirstTransaction}>Send First Transaction</Button>
          </>
        )}

        {!isLoading && (
          <AmountContainer>
            {/* Safe Balance */}
            <Typography fontWeight="700">
              <AmountLabel
                amount={utils.formatEther(safeBalance || '0')}
                tokenSymbol={chain?.token || ''}
              />
            </Typography>
          </AmountContainer>
        )}

      </Stack>
    </Stack>
  )
}

export default SafeInfo

const SafeSettingsLabel = styled('div')<{
  theme?: Theme
}>(
  ({ theme }) => `
  position: absolute;
  top: -6px;
  right: -4px;
  border-radius: 50%;
  background-color: ${theme.palette.secondary.light};
  color: ${theme.palette.getContrastText(theme.palette.secondary.light)};
  padding: 5px 6px;
`
)

const CreationPendingLabel = styled('div')<{
  theme?: Theme
}>(
  ({ theme }) => `
  border-radius: 4px;
  background-color: ${theme.palette.info.light};
  color: ${theme.palette.getContrastText(theme.palette.secondary.light)}; 
  padding: 0px 10px;
`
)

const AmountContainer = styled('div')<{
  theme?: Theme
}>(
  ({ theme, onClick }) => `
  border-radius: 6px;
  background-color: ${theme.palette.background.light};
  padding: 0px 8px;
  cursor: ${!!onClick ? 'pointer' : 'initial'};
  `
)

// TODO: create a util for this?
const isContractAddress = async (
  address: string,
  provider?: providers.Web3Provider
): Promise<boolean> => {
  try {
    const code = await provider?.getCode(address)

    return code !== '0x'
  } catch (error) {
    return false
  }
}
