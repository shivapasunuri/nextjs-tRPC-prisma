import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../pages/api/backend";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
