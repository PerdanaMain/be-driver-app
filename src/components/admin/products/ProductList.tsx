import { Inventory, Product } from "@/interfaces";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React from "react";
import { Toaster } from "react-hot-toast";

import AddProductModal from "./AddModal";
import DeleteProductModal from "./DeleteModal";
import DetailProductModal from "./DetailModal";
import UpdateProductModal from "./UpdateModal";

const ProductList = ({
  products,
  inventory,
  isLoading,
  mutate,
}: {
  products: Product[];
  inventory: Inventory[];
  isLoading: boolean;
  mutate: () => void;
}) => {
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "description",
      label: "DESCRIPTION",
    },
    {
      key: "stock",
      label: "STOCK",
    },
    {
      key: "price",
      label: "PRICE",
    },
    {
      key: "inventory",
      label: "INVENTORY",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = React.useCallback(
    (item: Product, columnKey: string | number) => {
      const cellValue = item[columnKey as keyof Product];

      switch (columnKey) {
        case "name":
          return String(cellValue);
        case "description":
          return String(cellValue);
        case "stock":
          return String(cellValue);
        case "price":
          return String(cellValue);
        case "inventory":
          return item.inventory?.name ?? "";
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <DetailProductModal product={item} />
              <UpdateProductModal
                product={item}
                mutate={mutate}
                inventory={inventory}
              />
              <DeleteProductModal product={item} mutate={mutate} />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [mutate, inventory]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-start">
        <AddProductModal mutate={mutate} inventory={inventory} />
      </div>
    );
  }, [mutate, inventory]);

  const TableSkeleton = () => {
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="py-4 px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((item) => (
                <th
                  key={item.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item.label}
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
      </div>
    );
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Toaster />
      <Table
        aria-label="Inventory table"
        className="w-full"
        topContent={topContent}
      >
        <TableHeader columns={columns} className="border-b border-gray-200">
          {(column) => (
            <TableColumn
              key={column.key}
              className="text-left border-b border-gray-200"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={products}
          emptyContent={"No rows to display."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="border-b border-gray-200">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductList;
