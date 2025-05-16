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
import { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { SquarePlus, Save, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Inventory } from "@/interfaces";

const AddProductModal = ({
  mutate,
  inventory,
}: {
  mutate: () => void;
  inventory: Inventory[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [onSubmit, setOnSubmit] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: null as File | null,
    imagePreview: "" as string,
    inventory_id: "",
  });

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: null,
      imagePreview: "",
      inventory_id: "",
    });
  };

  const handleCreate = async () => {
    try {
      setOnSubmit(true);

      // Create a FormData object to properly handle file uploads
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      formData.append("price", formState.price.toString());
      formData.append("stock", formState.stock.toString());
      formData.append("inventoryId", formState.inventory_id);

      // Only append image if it exists
      if (formState.image) {
        formData.append("image", formState.image);
      }

      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Note: Do NOT set Content-Type when sending FormData
            // The browser will set it automatically with the correct boundary
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.status === true) {
        toast.success(data.message || "Product added successfully");
        mutate();
        setOnSubmit(false);
        resetForm();
        onOpenChange();
      } else {
        toast.error(data.message || "Failed to add product");
        setOnSubmit(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setOnSubmit(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the actual file object for upload
      setFormState((prev) => ({
        ...prev,
        image: file,
      }));

      // Create a preview URL for display purposes only
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className="cursor-pointer active:opacity-50 w-[150px] border rounded-md mt-4"
        aria-label="Edit inventory"
      >
        <SquarePlus size={18} />
        <span className="text-sm font-semibold text-gray-800">Add Product</span>
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
                  Add New Product
                </div>
                <div className="text-sm text-gray-500">
                  Fill in the details below to add a new product.
                </div>
              </ModalHeader>

              <Divider />

              <ModalBody className="space-y-4 text-base font-bold text-gray-800 o max-h-[60vh] overflow-y-auto">
                <label className="text-sm text-gray-600">Product Name</label>
                <Input
                  placeholder="Enter product name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full"
                />

                <label className="text-sm text-gray-600">Description</label>
                <Input
                  placeholder="Enter product description"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full"
                />

                <label className="text-sm text-gray-600">Price</label>
                <Input
                  type="number"
                  placeholder="Enter the price"
                  value={formState.price.toString()}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <label className="text-sm text-gray-600">Stock</label>
                <Input
                  type="number"
                  placeholder="Enter the stock"
                  value={formState.stock.toString()}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      stock: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <label className="text-sm text-gray-600">Inventory</label>
                <select
                  value={formState.inventory_id}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      inventory_id: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Inventory</option>
                  {inventory.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.name}
                    </option>
                  ))}
                </select>

                <label className="text-sm text-gray-600">Image</label>
                <Input
                  type="file"
                  placeholder="Choose image"
                  accept="image/*"
                  className="w-full"
                  onChange={handleImageChange}
                />

                {formState.imagePreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <Image
                      src={formState.imagePreview}
                      alt="Product preview"
                      className="max-h-40 rounded-md border border-gray-200"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </ModalBody>

              <Divider />

              <ModalFooter>
                <Button
                  color="danger"
                  className="bg-red-600 cursor-pointer"
                  onPress={onClose}
                  startContent={<XCircle size={16} />}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-blue-600 cursor-pointer"
                  startContent={<Save size={16} />}
                  onPress={() => {
                    handleCreate();
                  }}
                  isDisabled={onSubmit}
                >
                  {onSubmit ? "Processing..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProductModal;
