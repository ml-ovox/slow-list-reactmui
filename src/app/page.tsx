"use client";
import * as React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { data } from './data'; // make sure to have the correct data import

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Name', headerName: 'Name', width: 150 },
  { field: 'IsDone', headerName: 'Is Done', width: 150 },
  { field: 'FrontendDone', headerName: 'Frontend Done', width: 180 },
  { field: 'BackendDone', headerName: 'Backend Done', width: 180 },
  { field: 'Comment', headerName: 'Comment', width: 200 },
  { field: 'Type', headerName: 'Type', width: 150 },
  { field: 'Priority', headerName: 'Priority', width: 150 },
  { field: 'createdAt', headerName: 'Created At', width: 200 },
  { field: 'BaseProject', headerName: 'Base Project', width: 180 },
  { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  { field: 'Layer', headerName: 'Layer', width: 150 },
  { field: '___archived', headerName: 'Archived', width: 150 },
  { field: 'DevComment', headerName: 'Dev Comment', width: 200 },
  { field: '___ordering', headerName: 'Ordering', width: 150 },
];

export default function DataTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    setRows(data);
  }, []);

  const handleRowClick = (param: GridRowParams) => {
    setSelectedRow(param.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: '800px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
      />
      <RowModal open={open} handleClose={handleClose} row={selectedRow} />
    </div>
  );
}

type RowModalProps = {
  open: boolean;
  handleClose: () => void;
  row: any;
};

function RowModal({ open, handleClose, row }: RowModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="row-modal-title"
      aria-describedby="row-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '100%', md: '480px' },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
      }}>
        <Typography id="row-modal-title" variant="h6">
          Row Details
        </Typography>
        <Typography id="row-modal-description" sx={{ mt: 2 }}>
          {/* Render your row data here. For instance: */}
          {row && row.id} - {row && row.Name}
        </Typography>
        <Button onClick={handleClose} variant="contained" sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
