import type { DashboardData } from '@/lib/data';
import { withBasePath } from '@/lib/base-path';

let dashboardDataPromise: Promise<DashboardData> | null = null;

export function loadDashboardData(): Promise<DashboardData> {
  if (!dashboardDataPromise) {
    dashboardDataPromise = fetch(withBasePath('/dashboard-data.generated.json'), {
      cache: 'force-cache',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`Dashboard data request failed with ${response.status}`);
      }
      return (await response.json()) as DashboardData;
    });
  }

  return dashboardDataPromise;
}
