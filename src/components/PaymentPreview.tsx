import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, styled } from "@mui/material";
import { Payment } from "../shared/models";
import React from "react";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

// Heavily borrowed from https://mui.com/base-ui/react-table-pagination/
export default function PaymentPreview (props: { payments: Payment[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.payments.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">PlaidId</TableCell>
            <TableCell align="right">Payor Name</TableCell>
            <TableCell align="right">Payor EIN</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        {<TableBody>
          {(rowsPerPage > 0
            ? props.payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.payments
          ).map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Employee.FirstName}
              </TableCell>
              <TableCell align="right">{row.Employee.LastName}</TableCell>
              <TableCell align="right">{row.Payee.PlaidId}</TableCell>
              <TableCell align="right">{row.Payor.Name}</TableCell>
              <TableCell align="right">{row.Payor.EIN}</TableCell>
              <TableCell align="right">{row.Amount}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 41 * emptyRows }}>
              <TableCell colSpan={3} aria-hidden />
            </TableRow>
          )}
        </TableBody>}
        <TableFooter>
          <TableRow>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={props.payments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;