import Link from "next/link";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
}

export function StatCard({ label, value, hint, href }: StatCardProps) {
  const inner = (
    <Card className="p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </Card>
  );
  if (href) {
    return (
      <Link href={href} className="block transition-transform hover:-translate-y-0.5">
        {inner}
      </Link>
    );
  }
  return inner;
}
