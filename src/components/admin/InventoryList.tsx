import React from "react";
import { Inventory } from "@/app/admin/inventory/page";
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
}: {
  inventory: Inventory[];
  isLoading: boolean;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "name":
          return cellValue;
        case "description":
          return cellValue;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <UpdateInventoryModal />
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
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
      <TableBody items={inventory} emptyContent={"No rows to display."} loadingContent={"Loading..."} isLoading={isLoading}>
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
  );
}
