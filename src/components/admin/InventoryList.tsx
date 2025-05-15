import React from "react";
import { Inventory } from "@/interfaces";
import { Toaster } from "react-hot-toast";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import UpdateInventoryModal from "./inventory/UpdateModal";

import { DeleteIcon } from "lucide-react";

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
          return cellValue;
        case "description":
          return cellValue;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <UpdateInventoryModal inventory={item} mutate={mutate} />
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [mutate]
  );

  return (
    <>
      <Toaster />
      <Table aria-label="Inventory table" isStriped className="w-full">
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
          items={inventory}
          emptyContent={"No rows to display."}
          loadingContent={"Loading..."}
          isLoading={isLoading}
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
}
