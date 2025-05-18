import { Order } from "@/utils/interfaces";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@heroui/react";
import {
  Calendar,
  Clock,
  CreditCard,
  Info,
  Phone,
  User
} from "lucide-react";

const DetailOrderModal = ({ order }: { order: Order }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "bg-green-100";
    let textColor = "text-green-800";

    if (status === "success") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "pending") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status === "failed") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat("en-EN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        className="cursor-pointer active:opacity-50"
        aria-label="Detail Order"
      >
        <Info size={18} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        size="2xl"
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
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xl font-bold text-gray-800">
                      Detail Order #{order.id.substring(0, 8)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDate(order.createdAt)}
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                  {order.isExpired && (
                    <Tooltip content="Order Expired">
                      <Chip
                        variant="flat"
                        color="danger"
                        startContent={<Clock size={14} />}
                        className="bg-gray-600 px-4"
                      >
                        Expired:{" "}
                        {new Date(order.expiredAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Chip>
                    </Tooltip>
                  )}
                </div>
              </ModalHeader>

              <ModalBody className="space-y-6 text-base text-gray-800 max-h-[60vh] overflow-y-auto">
                {/* Customer Information */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <User size={18} className="text-blue-600" />
                    Customer Information
                  </h3>
                  <Card shadow="sm" className="bg-gray-50">
                    <CardBody className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{order.cart.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{order.cart.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone size={14} />
                            Phone
                          </p>
                          <p className="font-medium">{order.cart.phone}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <CreditCard size={18} className="text-green-600" />
                    Order Summary
                  </h3>
                  <Card className="bg-gray-50 w-full max-w-2xl mx-auto">
                    <CardBody className="p-4">
                      <div className="space-y-2">
                        {/* Header baris dengan lebar tetap untuk setiap kolom */}
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                          <div className="text-neutral-800">Product</div>
                          <div className="text-neutral-800 text-right">
                            Price
                          </div>
                          <div className="text-neutral-800 text-center">
                            Quantity
                          </div>
                          <div className="text-neutral-800 text-right">
                            Sub Total
                          </div>
                        </div>

                        {/* Mapping item dengan grid yang sama untuk konsistensi */}
                        {order.cart.cart_items.map((item) => (
                          <div
                            className="grid grid-cols-4 gap-2 text-sm"
                            key={item.id}
                          >
                            <div className="text-gray-600 truncate">
                              {item.product.name}
                            </div>
                            <div className="text-gray-600 text-right">
                              {formatCurrency(item.product.price)}
                            </div>
                            <div className="text-gray-600 text-center">
                              {item.quantity}
                            </div>
                            <div className="text-gray-600 text-right">
                              {formatCurrency(item.sub_total)}
                            </div>
                          </div>
                        ))}

                        <Divider className="my-2" />

                        {/* Total dengan penempatan yang tepat */}
                        <div className="flex justify-between">
                          <div className="font-bold">Total</div>
                          <div className="font-bold text-lg">
                            {formatCurrency(order.total_amount)}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Product Details */}
              </ModalBody>

              <ModalFooter className="flex justify-between">
                <div className="flex justify-end w-full">
                  <Button
                    color="default"
                    className="bg-gray-600 cursor-pointer px-12 rounded-lg"
                    onPress={onClose}
                  >
                    Tutup
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailOrderModal;
