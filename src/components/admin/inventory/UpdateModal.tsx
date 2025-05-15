import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
} from "@heroui/react";
import { Inventory } from "@/interfaces";
import { useState } from "react";
import Cookies from "js-cookie";
import { Pencil, Save, XCircle } from "lucide-react";
import toast from 'react-hot-toast';

const UpdateInventoryModal = ({ inventory, mutate }: { inventory: Inventory, mutate: ()=> void }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [onSubmit, setOnSubmit] = useState(false);
  const [formState, setFormState] = useState({
    name: inventory.name,
    description: inventory.description,
  });

  const handleUpdate = () => {
    try{
      setOnSubmit(true);
      const token = Cookies.get("token");

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${inventory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == true) {
            toast.success(data.message || "Inventory updated successfully");
            mutate();
            setOnSubmit(false);
            onOpenChange();
          } else {
            toast.error(data.message || "Failed to update inventory");
          }
        });
    }
    catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className="cursor-pointer active:opacity-50"
        aria-label="Edit inventory"
      >
        <Pencil size={18} />
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
                  Perbarui Inventori
                </div>
                <div className="text-sm text-gray-500">
                  Silakan perbarui informasi inventori di bawah ini
                </div>
              </ModalHeader>

              <Divider />

              <ModalBody className="space-y-4 text-base font-bold text-gray-800">
                <label className="text-sm text-gray-600">Inventory Name</label>
                <Input
                  placeholder="Enter inventory name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full"
                />

                <label className="text-sm text-gray-600">Description Name</label>
                <Input
                  placeholder="Enter description name"
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full"
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
                  Cancel
                </Button>
                <Button
                  color="primary"
                  className="bg-blue-600 cursor-pointer"
                  startContent={<Save size={16} />}
                  onPress={() => {
                    handleUpdate();
                  }}
                >
                  {onSubmit ? "Proccessing..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateInventoryModal;
