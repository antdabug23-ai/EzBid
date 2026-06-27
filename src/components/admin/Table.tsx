import * as React from "react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/shared/states";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  empty?: { title: string; description?: string };
  rowCount: number;
}

export function Table({ headers, children, empty, rowCount }: TableProps) {
  if (rowCount === 0 && empty) {
    return <EmptyState title={empty.title} description={empty.description} />;
  }
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`whitespace-nowrap px-4 py-3 text-slate-700 ${className ?? ""}`}>{children}</td>;
}
