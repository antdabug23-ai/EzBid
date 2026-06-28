import { logoutAction } from "@/lib/actions/auth";

export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={`rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 ${className}`}
      >
        Log out
      </button>
    </form>
  );
}
