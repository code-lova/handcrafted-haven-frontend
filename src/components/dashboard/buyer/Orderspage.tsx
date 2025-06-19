"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Orders } from "@/service/request/order/type";
import { getUserOrders } from "@/service/request/order";
import OrderDetailsModal from "./modal/OrderDetailsModal";
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { TableSkeleton } from "@/components/core/skeleton";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Orders[]>({
    queryKey: ["orders"],
    queryFn: getUserOrders,
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<ColumnDef<Orders>[]>(
    () => [
      {
        header: "Story Name",
        accessorFn: (row) => row.items.map((item) => item.name).join(", "),
        cell: (info) => info.getValue(),
      },
      {
        header: "Seller",
        accessorFn: (row) =>
          row.items
            .map((item) => item.storyId?.sellerId?.name || "Unknown")
            .filter((v, i, a) => a.indexOf(v) === i)
            .join(", "),
        cell: (info) => info.getValue(),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className={`capitalize font-semibold ${
                value === "paid"
                  ? "text-green-600"
                  : value === "pending"
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: (info) => {
          const dateValue = info.getValue() as string | number | Date;
          return format(new Date(dateValue), "PPpp");
        },
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setSelectedOrder(row.original)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Apply status filter
  React.useEffect(() => {
    table.setColumnFilters(
      statusFilter ? [{ id: "status", value: statusFilter }] : []
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-playfair mb-6">Your Orders 🎉</h1>
        <TableSkeleton />
      </div>
    );
  }
  if (error)
    return (
      <p className="text-red-600 text-center py-6">Failed to load orders</p>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-playfair mb-6">Your Orders 🎉</h1>

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow max-h-[400px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
