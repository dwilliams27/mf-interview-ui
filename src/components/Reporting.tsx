import { Box } from "@mui/material";
import CsvList from "./CsvList";
import { DBPaymentFile } from "../shared/models";
import { useEffect, useState } from "react";
import { getPaymentFiles } from "../services/MethodService";

export default function Reporting() {
  const [paymentFiles, setPaymentFiles] = useState<DBPaymentFile[]>([]);

  const loadPaymentFiles = async () => {
    const response = await getPaymentFiles();
    
    if(!response.ok) {
      console.error('Could not load payment files');
      return;
    }
    
    const body = await response.json();
    console.log(body)
    setPaymentFiles(body);
  }

  useEffect(() => {
    loadPaymentFiles();
  }, []);
  

  return (
    <Box sx={{ marginTop: '20px', marginLeft: '60px', marginRight: '60px' }}>
      <CsvList files={paymentFiles}/>
    </Box>
  );
}