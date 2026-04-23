"use client";

import { useState } from "react";
import Navbar from "@/components/semilla/Navbar";

export default function StockDemoPage() {
  const [items, setItems] = useState([
    { name: "Aceite esencial", qty: 12 },
    { name: "Velas aromáticas", qty: 3 },
    { name: "Toallas", qty: 8 },
    { name: "Cremas", qty: 2 },
  ]);
    const [updatedIndex, setUpdatedIndex] = useState<number | null>(null);

  const updateQty = (index: number, delta: number) => {
  const newItems = [...items];
  newItems[index].qty = Math.max(0, newItems[index].qty + delta);
  setItems(newItems);

  setUpdatedIndex(index);

  setTimeout(() => {
    setUpdatedIndex(null);
  }, 800);
};

  return (
    <main className="min-h-screen bg-[#F5F3EB] pb-24 px-5 pt-6">
      
      <h1 className="text-2xl font-semibold text-[#2F4F2F] mb-2">
        Gestión de stock
      </h1>

      <p className="text-[#5C6F5C] mb-6">
        Ajustá cantidades en tiempo real.
      </p>

      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-md flex justify-between items-center"
          >
            <div>
  <div className="text-[#2F4F2F] font-medium flex items-center gap-2">
    {item.name}

    {updatedIndex === i && (
      <span className="text-xs text-green-600 animate-pulse">
        actualizado
      </span>
    )}
  </div>
              <div
                className={`text-sm ${
                  item.qty <= 3 ? "text-red-500" : "text-[#5C6F5C]"
                }`}
              >
                {item.qty} unidades
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(i, -1)}
                className="w-8 h-8 rounded-lg bg-[#E5E3DA]"
              >
                -
              </button>

              <button
                onClick={() => updateQty(i, +1)}
                className="w-8 h-8 rounded-lg bg-[#2F4F2F] text-white"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </main>
  );
}