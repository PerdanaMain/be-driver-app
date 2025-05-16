import { Inventory } from "@/interfaces";
import React from "react";
import { Toaster } from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import DeleteInventoryModal from "./inventory/DeleteModal";
import UpdateInventoryModal from "./inventory/UpdateModal";
import AddInventoryModal from "./inventory/AddModal";

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
      <div className="flex items-center justify-start mx-10">
        <AddInventoryModal mutate={mutate} />
      </div>
    );
  }, [mutate]);

  return (
    <>
      <Toaster />
      <Table aria-label="Inventory table" isStriped className="w-full" topContent={topContent}>
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
