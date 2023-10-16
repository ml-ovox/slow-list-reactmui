"use client";
import styles from "./page.module.css";
import React, {
  useMemo,
  useState,
  useRef,
  // useReducer,
  useCallback,
  useEffect,
} from "react";
import { Box, Modal, Typography, useTheme } from "@mui/material";
import MaterialReactTable, {
  MRT_TableInstance,
  MRT_Virtualizer,
  MRT_SortingState,
  MRT_ColumnFiltersState,
  MRT_ColumnDef,
} from "material-react-table";
import { data } from "./data";
const columns = [
  {
    id: 1,
    name: "id",
  },
  {
    id: 2,
    name: "Name",
  },
  {
    id: 3,
    name: "IsDone",
  },
  {
    id: 4,
    name: "Frontend Done",
  },
  {
    id: 5,
    name: "Backend done",
  },
  {
    id: 6,
    name: "Comment",
  },
  {
    id: 7,
    name: "Type",
  },
  {
    id: 8,
    name: "Priority",
  },
  {
    id: 9,
    name: "createdAt",
  },
  {
    id: 10,
    name: "Base Project",
  },
  {
    id: 11,
    name: "updatedAt",
  },
  {
    id: 12,
    name: "Layer",
  },
  {
    id: 13,
    name: "___archived",
  },
  {
    id: 14,
    name: "Dev comment",
  },
  {
    id: 15,
    name: "___ordering",
  },
];
export default function Home() {
  const [rows, setRows] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRowData, setSelectedRowData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 200,
  });
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const tableInstanceRef = useRef<MRT_TableInstance<any>>(null);
  const [selectedContentId, setSelectedContentId] = useState<number>();

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  // const booleanList = ["Yes", "No"];
  const [readContents, setReadContents] = useState<number[]>([]);

  const isReadContent = (contentId: number) => {
    return readContents.includes(contentId);
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getColumns = (dataColumns: any[]) => {
    return dataColumns.map((dataColumn: any) => {
      return {
        accessorKey: `${dataColumn.name}`,
        header: dataColumn.name,
        Header: ({ column }: any) => (
          <Box sx={{ display: "flex" }} key={column.id}>
            <Box
              sx={{
                minWidth: "100px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {column.columnDef.header}
            </Box>
          </Box>
        ),
        Cell: ({ renderedCellValue, row }: any) => {
          function renderFieldData(dataColumn: any, cellValue: any) {
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue}
              </Box>
            );
          }
          return renderFieldData(dataColumn, renderedCellValue);
        },
        minSize: 100,
        maxSize: 400,
        size: 200,
        filterFn: (row: any, id: number, filterValue: string) =>
          row.getValue(id).toLowerCase().includes(filterValue.toLowerCase()),
      };
    });
  };

  const columnsTable = useMemo<any>(() => {
    return getColumns(columns);
  }, [columns]);

  const editRow = (row: any) => {
    setOpen(true);
    setSelectedRowData([rows[row.index]]);
    setSelectedContentId(rows[row.index].id);
    setReadContents((prev) => [...prev, rows[row.index].id]);
  };

  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
  const muiTableHeadCellProps = useMemo(() => {
    return {
      sx: () => ({
        py: 0.7,
        height: showColumnFilters ? 84 : 40,
      }),
    };
  }, []);

  const muiTableFooterCellProps = useMemo(() => {
    return {
      sx: () => ({
        p: 0,
      }),
    };
  }, []);

  const muiBottomToolbarProps = useMemo(() => {
    return {
      sx: () => ({
        height: "55px",
      }),
    };
  }, []);

  const muiTableHeadCellFilterTextFieldProps = useMemo(() => {
    return {
      sx: {
        px: 1,
        height: 40,
        marginTop: "12px",
      },
    };
  }, []);

  const muiTableContainerProps = useMemo(() => {
    return {
      sx: {
        height: {
          height: "100%",
        },
        width: { lg: "100vw" },
        // minHeight: "300px",
        "& .MuiTableHead-root": {
          width: "100%",
        },
        "& .MuiTableRow-root": {
          boxShadow: "none",
        },
      },
    };
  }, []);

  const muiTablePaperProps = useMemo(() => {
    return {
      sx: { height: "100%" },
    };
  }, []);

  const muiTableBodyRowProps = (row: any) => {
    return {
      onClick: () => {
        editRow(row);
      },
      sx: {
        cursor: "pointer",
        position: "relative",
        overflowY: "hidden",
        "& :first-of-type::before": {
          content: "''",
          position: "absolute",
          width: "4px",
          height: "32px",
          transform: "translate(-4px,-50%)",
          left: "0",
          top: "50%",
          background:
            selectedContentId === row.id
              ? "rgb(84, 166, 251)"
              : !isReadContent(row.id)
              ? "rgb(84, 166, 251, 0.5)"
              : "none",
        },
      },
    };
  };

  const muiTableBodyCellProps = (row: any) => {
    return {
      sx: () => ({
        // color: theme.palette.palette_style.text.primary,
        py: 0,
        height: 32,
        fontWeight: isReadContent(row.id) ? "normal" : "bold",
        background:
          selectedContentId === row.id
            ? "rgba(84, 166, 251, 0.2)"
            : !isReadContent(row.id)
            ? "rgba(84, 166, 251, 0.05)"
            : "none",
      }),
    };
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main className={styles.main}>
      {/* <MaterialReactTable columns={columns} data={data} /> */}
      <MaterialReactTable
        tableInstanceRef={tableInstanceRef}
        columns={columnsTable}
        data={rows}
        enableStickyHeader={true}
        muiTablePaperProps={muiTablePaperProps}
        muiTableContainerProps={muiTableContainerProps}
        manualSorting={true}
        manualFiltering={true}
        enableRowSelection={true}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enablePagination={true}
        enableColumnResizing
        rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
        rowVirtualizerProps={{ overscan: 5 }}
        columnVirtualizerProps={{ overscan: 10 }}
        muiSelectCheckboxProps={{
          color: "primary",
        }}
        muiTableBodyRowProps={({ row }: any) => muiTableBodyRowProps(row)}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        onColumnFiltersChange={setColumnFilters}
        state={{
          pagination,
          rowSelection,
          showColumnFilters,
          sorting,
          columnFilters,
        }}
        getRowId={(row) => row.id}
        onRowSelectionChange={setRowSelection}
        onShowColumnFiltersChange={(updater: any) => {
          setShowColumnFilters((prev) =>
            updater instanceof Function ? updater(prev) : updater
          );
          // queueMicrotask(rerender);
        }}
        muiTableHeadCellProps={muiTableHeadCellProps}
        muiTableFooterCellProps={muiTableFooterCellProps}
        muiTableBodyCellProps={({ row }: any) => muiTableBodyCellProps(row)}
        muiBottomToolbarProps={muiBottomToolbarProps}
        muiTableHeadCellFilterTextFieldProps={
          muiTableHeadCellFilterTextFieldProps
        }
      />
      <CentralModal
        open={open}
        handleClose={handleClose}
        rowData={selectedRowData}
        zIndex={1200}
      >
        <Typography variant="h6">A Very Slow Modal Yo</Typography>
      </CentralModal>
    </main>
  );
}
type CentralModalProps = {
  open: boolean;
  handleClose: () => void;
  children?: any;
  zIndex?: number;
  rowData?: any;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: "480px" },
  backgroundColor: "white",
  py: 2,
  px: { xs: 0.5, md: 2 },
  boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px",
  border: "none",
};
function CentralModal({
  open,
  handleClose,
  rowData,
  children,
  zIndex,
}: CentralModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: (theme) => (zIndex ? zIndex : theme.zIndex.drawer) }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
