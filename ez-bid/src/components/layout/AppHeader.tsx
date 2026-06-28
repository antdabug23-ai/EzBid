import { getCurrentUser, dashboardPathForRole } from "@/lib/auth/current-user";
import { AppNav } from "./AppNav";

/**
 * Global top navigation, rendered once in the root layout.
 * Reads the session server-side and passes only the safe dashboard path
 * (never raw session data) to the client nav.
 */
export async function AppHeader() {
  const user = await getCurrentUser();
  const dashboardPath = user ? dashboardPathForRole(user.role) : null;

  return <AppNav dashboardPath={dashboardPath} />;
}

export default AppHeader;
