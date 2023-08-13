import React, { useState } from "react"
// import {
//     Grid,
//     makeStyles,
//     Card,
//     CardContent,
//     MenuItem,
//     InputLabel,
//     Select,
//     CardActions,
//     Button,
//     CardHeader,
//     FormControl,
// } from "@material-ui/core"
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/SendRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded'



import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { useAccountAbstraction } from "src/store/accountAbstractionContext";
import { ethers, utils } from "ethers";
import { LinearProgress, Link, Stack, Typography } from "@mui/material";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import { MetaTransactionData, MetaTransactionOptions, OperationType } from "@safe-global/safe-core-sdk-types";
import styled from "@emotion/styled";
import AddressLabel from "../address-label/AddressLabel";
import GelatoTaskStatusLabel from "../gelato-task-status-label/GelatoTaskStatusLabel";
import { useTheme } from "src/store/themeContext";

import Safe, { EthersAdapter, getSafeContract } from '@safe-global/protocol-kit'


// const useStyle = makeStyles((theme) => ({
//     padding: {
//         padding: theme.spacing(3),
//     },
//     button: {
//         margin: theme.spacing(1),
//     },
// }))

//Data
// const initialValues = {
//     projectName: "",
//     projectId: "",
//     amount: 0,
// }

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
    projectName: Yup.string(),
    projectId: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
})

const Forms = () => {

    const {
        chainId,
        chain,

        safeSelected,
        safeBalance,

        web3Provider,
        isAuthenticated,
        loginWeb3Auth
    } = useAccountAbstraction()

    const { switchThemeMode, isDarkTheme } = useTheme()

    const [isRelayerLoading, setIsRelayerLoading] = useState<boolean>(false);
    const [gelatoTaskId, setGelatoTaskId] = useState<string>();
    const [transactionHash, setTransactionHash] = useState<string>('')

    const [values, setValues] = useState({
        projectName: "",
        projectId: "",
        amount: 0,
    })

    const transferAmount = values.amount;
    const hasNativeFunds =
        !!safeBalance && Number(utils.formatEther(safeBalance || '0')) > transferAmount

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    console.log("Valued", values)


    const onSubmit = () => {
        let everythingisGood = true;
        if (everythingisGood) {
            console.log("Add relay transaction here");
        }

        relayTransaction();

    }

    const relayTransaction = async () => {
        if (web3Provider) {
            setIsRelayerLoading(true)

            try {
                const signer = web3Provider.getSigner()
                const relayPack = new GelatoRelayPack("AhpvwW_9pgPZC5rDqyv6FYAoITd02NNnPEhouGmQUXM_")
                // const relayPack = new GelatoRelayPack("dDF2bVuCxf4A7mUNsmlstNZEiZkVjGWbyiJ2a64P11M_")
                const safeAccountAbstraction = new AccountAbstraction(signer)

                await safeAccountAbstraction.init({ relayPack })

                // we use a dump safe transfer as a demo transaction
                const dumpSafeTransafer: MetaTransactionData[] = [
                    {
                        to: values.projectId,
                        data: '0x',
                        value: utils.parseUnits(values.amount.toString(), 'ether').toString(),
                        operation: OperationType.Call,
                    }
                ]

                const options: MetaTransactionOptions = {
                    isSponsored: true,
                    gasLimit: '600000', // in this alfa version we need to manually set the gas limit
                    gasToken: ethers.constants.AddressZero // native token
                }

                const gelatoTaskId = await safeAccountAbstraction.relayTransaction(dumpSafeTransafer, options)
                console.log("GelatoTaskId", gelatoTaskId);



                /**  Sending transaction to the contract */

                // const safeTransactionData: MetaTransactionData = {
                //     to: values.projectId,
                //     data: '0x',
                //     value: utils.parseUnits(values.amount.toString(), 'ether').toString(),
                //     operation: OperationType.Call
                // }

                // console.log("dumpSafeTransafer", dumpSafeTransafer, safeSelected)

                // const safeAddress = "0x2ff5542f19fE9FA268dBae68E18f93C6A449f0aF";

                // const options: MetaTransactionOptions = {
                //     isSponsored: true,
                //     gasLimit: '600000', // in this alfa version we need to manually set the gas limit
                //     gasToken: ethers.constants.AddressZero // native token
                // }

                // const ethAdapter = new EthersAdapter({
                //     ethers,
                //     signerOrProvider: signer
                // })

                // const safeSDK = await Safe.create({
                //     ethAdapter,
                //     safeAddress
                // })

                // console.log("Sagfe", safeSDK, ethAdapter)

                // const safeTransaction = await safeSDK.createTransaction({ safeTransactionData });

                // console.log("safeTransaction", safeTransaction)

                // const signedSafeTx = await safeSDK.signTransaction(safeTransaction)
                // console.log("signedSafeTx", signedSafeTx)
                // const safeSingletonContract = await getSafeContract({
                //     ethAdapter,
                //     safeVersion: await safeSDK.getContractVersion()
                // });
                // console.log("safeSingletonContract", safeSingletonContract)
                // const encodedTx = safeSingletonContract.encode('execTransaction', [
                //     signedSafeTx.data.to,
                //     signedSafeTx.data.value,
                //     signedSafeTx.data.data,
                //     signedSafeTx.data.operation,
                //     signedSafeTx.data.safeTxGas,
                //     signedSafeTx.data.baseGas,
                //     signedSafeTx.data.gasPrice,
                //     signedSafeTx.data.gasToken,
                //     signedSafeTx.data.refundReceiver,
                //     signedSafeTx.encodedSignatures()
                // ])

                // console.log("Encode Tx", encodedTx, safeSingletonContract, signedSafeTx, safeTransaction);

                // const relayTransaction: any = {
                //     target: safeAddress,
                //     encodedTransaction: encodedTx,
                //     chainId,
                //     options
                // }
                // const response = await relayPack.relayTransaction(relayTransaction)

                // console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`)



                setGelatoTaskId(gelatoTaskId)
            } catch (error) {
                console.log("Error", error);
            }

            setIsRelayerLoading(false)


        }
    }



    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item md={8}>
                <Card >
                    <CardHeader title="Fund Your Favourite Project"></CardHeader>
                    <FormContainer>
                        <InputForms>

                            <InputContainer>
                                <label>Project Name</label>
                                <Input
                                    style={{ color: isDarkTheme ? 'white' : 'black' }}
                                    type='text'
                                    name="projectName"
                                    value={values.projectName}
                                    onChange={handleChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <label>Project Id</label>
                                <Input
                                    style={{ color: isDarkTheme ? 'white' : 'black' }}
                                    type='text'
                                    name="projectId"
                                    value={values.projectId}
                                    onChange={handleChange}
                                />
                            </InputContainer>

                            <InputContainer>
                                <label>Amount</label>
                                <Input
                                    style={{ color: isDarkTheme ? 'white' : 'black' }}
                                    type='text'
                                    name="amount"
                                    value={values.amount}
                                    onChange={handleChange}
                                />
                            </InputContainer>

                        </InputForms>

                        {!isRelayerLoading && !gelatoTaskId && (
                            <ButtonContainer>
                                {/* send fake transaction to Gelato relayer */}
                                <Button
                                    startIcon={<SendIcon />}
                                    variant="contained"
                                    disabled={!hasNativeFunds}
                                    onClick={onSubmit}
                                >
                                    Send Transaction
                                </Button>

                                {!hasNativeFunds && chain?.faucetUrl && (
                                    <Link href={chain.faucetUrl} target="_blank">
                                        Request 0.5 {chain.token}.
                                    </Link>
                                )}

                                <Stack gap={0.5} display="flex" flexDirection="column">
                                    <Typography>
                                        Transfer {values.amount} {chain?.token}
                                    </Typography>

                                    {(values.projectId !== "") && safeSelected && (
                                        <Stack gap={0.5} display="flex" flexDirection="row">
                                            <AddressLabel address={safeSelected} showCopyIntoClipboardButton={false} />

                                            <ArrowRightAltRoundedIcon />

                                            <AddressLabel address={values.projectId} showCopyIntoClipboardButton={false} />
                                        </Stack>
                                    )}
                                </Stack>

                            </ButtonContainer>
                        )}

                        {isRelayerLoading && <LinearProgress sx={{ alignSelf: 'stretch' }} />}

                        {gelatoTaskId && (
                            <GelatoTaskStatusLabel
                                gelatoTaskId={gelatoTaskId}
                                chainId={chainId}
                                setTransactionHash={setTransactionHash}
                                transactionHash={transactionHash}
                            />
                        )}


                    </FormContainer>


                </Card>
            </Grid>
        </Grid>
    )
}

export default Forms


const ButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 15px;
`

const FormContainer = styled.div`
    padding:10px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const InputForms = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;

`


const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:6px;

`

const Input = styled.input`
    background-color: transparent;
    border: 1px solid whitesmoke;
    height: 50px;
    width: 100%;
    outline:none;
    color:white;
    border-color: #636669;
    border-radius:6px;
    padding: 5px 10px;
    font-size:18px;

    &:focus{
        border-color:#12FF80;
    }

    &:focus-visibile{
        outline:none;
    }

`