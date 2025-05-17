import { Inventory } from "@/interfaces";
import React from "react";
import { Toaster } from "react-hot-toast";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import AddInventoryModal from "./AddModal";
import DeleteInventoryModal from "./DeleteModal";
import UpdateInventoryModal from "./UpdateModal";

const TableSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="py-4 px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["NAME", "DESCRIPTION", "ACTIONS"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
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

export default function InventoryList({
  inventory,
  isLoading,
  mutate,
}: {
  inventory: Inventory[];
  isLoading: boolean;
  mutate: () => void;
}) {
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
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const renderCell = React.useCallback(
    (item: Inventory, columnKey: string | number) => {
      const cellValue = item[columnKey as keyof Inventory];

      switch (columnKey) {
        case "name":
          return <div className="font-medium text-gray-900">{cellValue}</div>;
        case "description":
          return (
            <div className="text-gray-500">
              {cellValue ? (
                cellValue
              ) : (
                <span className="text-gray-400 italic">No description</span>
              )}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <UpdateInventoryModal inventory={item} mutate={mutate} />
              <DeleteInventoryModal inventory={item} mutate={mutate} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [mutate]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between p-4">
        <AddInventoryModal mutate={mutate} />
      </div>
    );
  }, [mutate]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {topContent}
        <Table aria-label="Inventory table" className="w-full">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 text-left border-b border-gray-200"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={inventory}
            emptyContent={"No inventory items found."}
            loadingContent={
              <div className="py-10 flex justify-center">
                <Spinner color="primary" label="Loading inventory..." />
              </div>
            }
            isLoading={false} // We're handling loading state separately
          >
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
}
