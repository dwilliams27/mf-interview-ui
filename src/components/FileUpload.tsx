import React, { useState } from "react";
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { Parser } from 'xml2js';
import { Payment, PaymentFile } from "../shared/models";
import PaymentPreview from "./PaymentPreview";
import { addPaymentFile } from "../services/MethodService";

export default function FileUpload(props: { submitFile: (file: File) => void, setLoading: (loading: boolean) => void }) {
  const [activeFile, setActiveFile] = useState<File>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>();

  const fileChangeHandler = async (event) => {
    if(event.target.files.length !== 1) {
      console.error('Expected 1 file');
      return;
    }

    props.setLoading(true);

    const reader = new FileReader();
    const parser = new Parser({ explicitArray:false });

    reader.onload = () => {
      parser.parseString(reader.result as string, async (err, result) => {
        const typedResult = result as PaymentFile;
        if(!typedResult || !typedResult.root) {
          console.error('Unable to parse XML file');
          props.setLoading(false);
          return;
        }

        if(!Array.isArray(typedResult.root.row)) {
          // If there is only one row, the parser will not return an array
          typedResult.root.row = [typedResult.root.row as unknown as Payment];
        }
        setPayments(typedResult.root.row);
        setTotalAmount(Math.round(typedResult.root.row.reduce((acc, payment) => acc + parseFloat(payment.Amount.substring(1)), 0) * 100) / 100);

        props.setLoading(false);
      });
    }

    reader.readAsText(event.target.files[0], 'UTF-8');

    setActiveFile(event.target.files[0] as File);
	};

  const submitPayments = async () => {
    if(!activeFile) { 
      console.error('No active file');
      return;
    }

    // Inform backend of new payment file
    const addResponse = await addPaymentFile(activeFile.name, payments);
    if(addResponse.ok) {
      setStatusMessage('Successfully added payment file');
    } else {
      setStatusMessage(`Error: Failed to upload file`);
    }
    setActiveFile(undefined);
    setPayments([]);
    setTotalAmount(0);
  }

  const cancelPayments = () => {
    setActiveFile(undefined);
    setPayments([]);
    setTotalAmount(0);
  }

  return (
    <Stack sx={{marginLeft: '60px', marginRight: '60px'}}>
      {statusMessage && <Alert sx={{ marginTop: '20px', marginBottom: '20px' }} severity={statusMessage.startsWith('Error:') ? 'error' : 'success'}>{statusMessage}</Alert>}
      <Button
        variant="contained"
        component="label"
        sx={{
          width: '50%',
          marginTop: '20px',
          marginBottom: '20px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Upload File
        <input
          type="file"
          onChange={fileChangeHandler}
          hidden
        />
      </Button>
      <PaymentPreview payments={payments} />
      <Typography component="h3" sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}>Total Amount: ${totalAmount}</Typography>
      <Box sx={{ 
            display: 'flexbox', 
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: 'auto', 
            marginRight: 'auto', 
            width: '50%'
      }}>
        <Button
          variant="contained"
          component="label"
          disabled={payments.length === 0}
          sx={{
            width: '48%',
            float: 'left'
          }}
          onClick={cancelPayments}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          component="label"
          disabled={payments.length === 0}
          sx={{
            width: '48%',
            float: 'right'
          }}
          onClick={submitPayments}
        >
          Submit Payments
        </Button>
      </Box>
    </Stack>
  );
}