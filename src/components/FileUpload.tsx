import React, { useState } from "react";
import { Box, Button, Stack, Typography } from '@mui/material';
import { Parser } from 'xml2js';
import { Payment, PaymentFile } from "../shared/models";
import PaymentPreview from "./PaymentPreview";

export default function FileUpload(props: { submitFile: (file: File) => void, setLoading: (loading: boolean) => void }) {
  const [activeFile, setActiveFile] = useState<File>();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const fileChangeHandler = (event) => {
    if(event.target.files.length !== 1) {
      console.error('Expected 1 file');
      return;
    }

    props.setLoading(true);

    const reader = new FileReader();
    const parser = new Parser({ explicitArray:false });

    reader.onload = () => {
      parser.parseString(reader.result as string, (err, result) => {
        const typedResult = result as PaymentFile;
        if(!typedResult || !typedResult.root) {
          console.error('Unable to parse XML file');
          props.setLoading(false);
          return;
        }
        setPayments(typedResult.root.row);
        setTotalAmount(Math.round(typedResult.root.row.reduce((acc, payment) => acc + parseFloat(payment.Amount.substring(1)), 0)) / 100);
        console.log(payments)
        props.setLoading(false);
      });
    }

    reader.readAsText(event.target.files[0], 'UTF-8');

    setActiveFile(event.target.files[0] as File);
	};

  const cancelPayments = () => {
    setActiveFile(undefined);
    setPayments([]);
    setTotalAmount(0);
  }

  return (
    <Stack sx={{marginLeft: '60px', marginRight: '60px'}}>
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
        >
          Submit Payments
        </Button>
      </Box>
    </Stack>
  );
}