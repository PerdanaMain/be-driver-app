import React from "react";
import { Toaster } from "react-hot-toast";
import { Inventory, Product } from "@/interfaces";
import AddProductModal from "./products/AddModal";
import DetailProductModal from "./products/DetailModal";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import DeleteProductModal from "./products/DeleteModal";

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
              {/* <UpdateInventoryModal inventory={item} mutate={mutate} /> */}
              <DeleteProductModal product={item} mutate={mutate} />
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    [mutate]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-start">
        <AddProductModal mutate={mutate} inventory={inventory} />
      </div>
    );
  }, [mutate, inventory]);

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
};

export default ProductList;
