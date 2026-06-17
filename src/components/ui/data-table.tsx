"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface DataTableProps<T> {
  columns: {
    header: string
    accessorKey: keyof T | ((item: T) => React.ReactNode)
    className?: string
  }[]
  data: T[]
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyMessage = "No results found",
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={cn("font-semibold text-slate-600", col.className)}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item: any) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "hover:bg-slate-50/50 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col, index) => (
                  <TableCell key={index} className={col.className}>
                    {typeof col.accessorKey === 'function' 
                        ? col.accessorKey(item)
                        : (item[col.accessorKey] as React.ReactNode)
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
