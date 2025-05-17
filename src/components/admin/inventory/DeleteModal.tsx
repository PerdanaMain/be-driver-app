import { Inventory } from "@/utils/interfaces";
import { Button } from "@heroui/react";
import Cookies from "js-cookie";
import { SquareX } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const DeleteInventoryModal = ({
  inventory,
  mutate,
}: {
  inventory: Inventory;
  mutate: () => void;
}) => {
  const handleDelete = () => {
    try {
      const token = Cookies.get("token");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait while we delete the inventory.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/inventory/${inventory.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            Swal.close();
            if (data.status == true) {
              toast.success(data.message || "Inventory updated successfully");
              mutate();
            } else {
              toast.error(data.message || "Failed to update inventory");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            Swal.close();
            toast.error("An error occurred while deleting inventory");
          }
        }
      });
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        className="cursor-pointer active:opacity-50"
        aria-label="Edit inventory"
        onPress={handleDelete}
      >
        <SquareX size={18} />
      </Button>
    </>
  );
};

export default DeleteInventoryModal;
