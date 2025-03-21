import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(id);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-700">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
          {name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price)}
        </p>
        <div className="mt-auto">
          <Button variant="primary" fullWidth onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
