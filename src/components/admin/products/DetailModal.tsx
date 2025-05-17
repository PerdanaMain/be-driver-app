import { Product } from "@/utils/interfaces";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Info, XCircle } from "lucide-react";
import Image from "next/image";

const DetailProductModal = ({ product }: { product: Product }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className="cursor-pointer active:opacity-50"
        aria-label="Edit inventory"
      >
        <Info size={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900/50 to-zinc-900/30 backdrop-blur-md backdrop-opacity-30",
          base: "bg-white rounded-lg shadow-lg border border-zinc-200",
          header: "border-b border-zinc-200 py-4",
          body: "py-4",
          footer: "border-t border-zinc-200 py-4",
          closeButton: "hover:bg-zinc-200/80 active:bg-zinc-200/80",
        }}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              opacity: 0,
              y: 20,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="text-xl font-bold text-gray-800">
                  Detail Product
                </div>
                <div className="text-sm text-gray-500">
                  {product.name} - {product.inventory?.name}
                </div>
              </ModalHeader>

              <Divider />

              <ModalBody className="space-y-4 text-base font-bold text-gray-800 o max-h-[60vh] overflow-y-auto">
                {product.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <Image
                      src={product.image}
                      alt="Product preview"
                      className="max-h-40 rounded-md border border-gray-200"
                      width={100}
                      height={100}
                    />
                  </div>
                )}

                <label className="text-sm text-gray-600">Product Name</label>
                <Input
                  placeholder="Enter product name"
                  value={product.name}
                  isDisabled
                  className="w-full"
                />

                <label className="text-sm text-gray-600">Description</label>
                <Input
                  placeholder="Enter product description"
                  value={product.description}
                  isDisabled
                  className="w-full"
                />

                <label className="text-sm text-gray-600">Price</label>
                <Input
                  type="number"
                  placeholder="Enter the price"
                  value={product.price.toString()}
                  isDisabled
                  className="w-full"
                />
                <label className="text-sm text-gray-600">Stock</label>
                <Input
                  type="number"
                  placeholder="Enter the stock"
                  value={product.stock.toString()}
                  isDisabled
                  className="w-full"
                />
                <label className="text-sm text-gray-600">Inventory</label>
                <Input
                  type="text"
                  placeholder="Enter the stock"
                  value={product.inventory?.name}
                  className="w-full"
                  isDisabled
                />
              </ModalBody>

              <Divider />

              <ModalFooter>
                <Button
                  color="danger"
                  className="bg-red-600 cursor-pointer"
                  onPress={onClose}
                  startContent={<XCircle size={16} />}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailProductModal;
