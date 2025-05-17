import { Order } from "@/interfaces";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import DetailOrderModal from "./DetailModal";

// Komponen Badge untuk status
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-green-100";
  let textColor = "text-green-800";

  if (status === "success") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (status === "failed") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

// Komponen khusus untuk pagination
const CustomPagination = ({
  page,
  total,
  onChange,
}: {
  page: number;
  total: number;
  onChange: (page: number) => void;
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Menampilkan nomor halaman dengan batasan
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(total, startPage + maxVisiblePages - 1);

    // Menyesuaikan startPage jika endPage terlalu dekat dengan total
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Tombol Previous
    pages.push(
      <Button
        key="prev"
        size="sm"
        className={`border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 min-w-[80px] ${
          page <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onPress={() => page > 1 && onChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>
    );

    // Nomor halaman
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          size="sm"
          className={`min-w-[40px] ${
            i === page
              ? "bg-blue-50 text-blue-600 border border-blue-200 font-medium"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onPress={() => onChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Tombol Next
    pages.push(
      <Button
        key="next"
        size="sm"
        className={`border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 min-w-[80px] ${
          page >= total ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onPress={() => page < total && onChange(page + 1)}
        disabled={page >= total}
      >
        Next
      </Button>
    );

    return pages;
  };

  return (
    <div className="flex items-center gap-2 justify-end">
      {renderPageNumbers()}
    </div>
  );
};

// Komponen SearchInput yang diperindah
const SearchInput = ({
  value,
  onValueChange,
  onClear,
}: {
  value: string;
  onValueChange: (value?: string) => void;
  onClear: () => void;
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Search by customer name..."
        className="block w-full p-2 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
      />
      {value && (
        <button
          onClick={onClear}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

// Komponen untuk Avatar
const Avatar = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase();
  let bgColor = "bg-blue-100";

  // Warna berbeda berdasarkan huruf awal
  if (["A", "B", "C", "D", "E"].includes(initial)) {
    bgColor = "bg-blue-100";
  } else if (["F", "G", "H", "I", "J"].includes(initial)) {
    bgColor = "bg-blue-100";
  } else if (["K", "L", "M", "N", "O"].includes(initial)) {
    bgColor = "bg-purple-100";
  } else if (["P", "Q", "R", "S", "T"].includes(initial)) {
    bgColor = "bg-pink-100";
  } else {
    bgColor = "bg-indigo-100";
  }

  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-blue-700 font-semibold`}
    >
      {initial}
    </div>
  );
};

const OrderList = ({
  orders,
  isLoading,
}: //   mutate,
{
  orders: Order[];
  isLoading: boolean;
  mutate: () => void;
}) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  // Filter data
  const filteredItems = React.useMemo(() => {
    let filteredData = [...orders];
    if (hasSearchFilter && filteredData.length !== 0) {
      filteredData = filteredData.filter((item) =>
        item.cart.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredData;
  }, [filterValue, hasSearchFilter, orders]);

  // Hitung total halaman
  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  // Pagination dari data yang sudah difilter
  const paginatedItems = React.useMemo(() => {
    return filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  }, [filteredItems, page, rowsPerPage]);

  // Reset page ke 1 saat filter atau rowsPerPage berubah
  React.useEffect(() => {
    setPage(1);
  }, [filterValue, rowsPerPage]);

  const columns = [
    {
      uid: "customerName",
      sortable: true,
      name: "CUSTOMER NAME",
    },
    {
      uid: "status",
      sortable: true,
      name: "STATUS",
    },
    {
      uid: "totalItems",
      sortable: true,
      name: "TOTAL ITEMS",
    },
    {
      uid: "totalAmount",
      sortable: true,
      name: "TOTAL AMOUNT",
    },
    {
      uid: "actions",
      sortable: false,
      name: "ACTIONS",
    },
  ];

  const renderCell = React.useCallback(
    (item: Order, columnKey: string | number) => {
      const cellValue = item[columnKey as keyof Order];

      switch (columnKey) {
        case "customerName":
          return (
            <div className="flex items-center gap-2">
              <Avatar name={item.cart.name} />
              <span className="font-medium">{item.cart.name}</span>
            </div>
          );
        case "status":
          return <StatusBadge status={String(cellValue)} />;
        case "totalItems":
          return (
            <span className="font-medium justify-center">
              {item.cart.cart_items.reduce(
                (acc: number, item: { quantity: number }) =>
                  acc + item.quantity,
                0
              )}
            </span>
          );
        case "totalAmount":
          return (
            <span className="font-semibold text-gray-900">
              Rp.{" "}
              {item.total_amount.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          );
        case "actions":
          return (
            <div className="">
              <DetailOrderModal order={item} />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value !== undefined) {
      setFilterValue(value);
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
    },
    []
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-white">
        <div className="w-full sm:max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Orders
          </label>
          <SearchInput
            value={filterValue}
            onValueChange={onSearchChange}
            onClear={onClear}
          />
        </div>
        <div className="flex items-end">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Rows:</span>
            <select
              className="p-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value={`${orders.length}`}>All</option>
            </select>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    onClear,
    onRowsPerPageChange,
    orders.length,
    onSearchChange,
    rowsPerPage,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-700">
          Total <span className="font-medium">{filteredItems.length}</span> data
          {hasSearchFilter && ` (filtered from ${orders.length})`}
        </span>

        <CustomPagination page={page} total={pages} onChange={setPage} />
      </div>
    );
  }, [filteredItems.length, orders.length, hasSearchFilter, page, pages]);

  const emptyContent = (
    <div className="text-center py-10">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No orders found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {hasSearchFilter
          ? "Try adjusting your search filters"
          : "Start by creating a new order"}
      </p>
    </div>
  );

  const TableSkeleton = () => {
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="py-4 px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((item) => (
                <th
                  key={item.uid}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[150px]"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-4 px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {topContent}
        <Table
          aria-label="Order table"
          className="w-full"
          bottomContent={bottomContent}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 text-left border-b border-gray-200"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={paginatedItems} emptyContent={emptyContent}>
            {(item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {(columnKey) => (
                  <TableCell className="px-4 py-4 whitespace-nowrap border-b border-gray-200">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OrderList;
