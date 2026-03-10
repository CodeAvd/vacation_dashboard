import { DashboardClient } from '@/components/dashboard-client';
import { getDashboardBootstrap } from '@/lib/dashboard-bootstrap';

export const dynamic = 'error';

export default function Page() {
  return <DashboardClient bootstrap={getDashboardBootstrap()} />;
}
