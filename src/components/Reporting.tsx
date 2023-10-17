import { Box } from "@mui/material";
import CsvList from "./CsvList";
import { DBPaymentFile, REPORT_TYPE } from "../shared/models";
import { useEffect, useState } from "react";
import { getBranchAmounts, getPaymentFiles, getPayments, getSourceAmounts } from "../services/MethodService";
import { mkConfig, generateCsv, download } from "export-to-csv";

export default function Reporting(props: { setLoading: (loading: boolean) => void }) {
  const [paymentFiles, setPaymentFiles] = useState<DBPaymentFile[]>([]);

  const loadPaymentFiles = async () => {
    const response = await getPaymentFiles();
    
    if(!response.ok) {
      console.error('Could not load payment files');
      return;
    }
    
    const body = await response.json();
    setPaymentFiles(body);
  }

  const getReport = async (fileUuid: string, reportType: REPORT_TYPE) => {
    props.setLoading(true);
    switch(reportType) {
      case REPORT_TYPE.BRANCH: {
        const response = await getBranchAmounts(fileUuid);
        if(!response.ok) {
          console.error('Could not retrieve branch report');
          break;
        }
        let branches = await response.json();

        if(!branches || branches.length === 0) {
          console.error('No branches found');
          break;;
        }
        
        branches = branches.map((branch) => ({
          source_branch: branch.src_brnch,
          amount: branch.amt
        }));

        const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: 'branch_report' });
        const csv = generateCsv(csvConfig)(branches);
        download(csvConfig)(csv);
        break;
      }
      case REPORT_TYPE.SOURCE: {
        const response = await getSourceAmounts(fileUuid);
        if(!response.ok) {
          console.error('Could not retrieve source report');
          break;
        }
        let sources = await response.json();

        if(!sources || sources.length === 0) {
          console.error('No sources found');
          break;
        }
        
        sources = sources.map((source) => ({
          source_account: source.src_acct,
          amount: source.amt
        }));

        const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: 'source_report' });
        const csv = generateCsv(csvConfig)(sources);
        download(csvConfig)(csv);
        break;
      }
      default: {
        const response = await getPayments(fileUuid);
        if(!response.ok) {
          console.error('Could not retrieve payments');
          break;
        }

        let payments = await response.json();

        if(!payments || payments.length === 0) {
          console.error('No payments found');
          break;
        }
        
        const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: 'payment_report' });
        const csv = generateCsv(csvConfig)(payments);
        download(csvConfig)(csv);
        break;
      }
   }
   props.setLoading(false);
  }

  useEffect(() => {
    loadPaymentFiles();
  }, []);

  return (
    <Box sx={{ marginTop: '20px', marginLeft: '60px', marginRight: '60px' }}>
      <CsvList files={paymentFiles} getReport={getReport}/>
    </Box>
  );
}
