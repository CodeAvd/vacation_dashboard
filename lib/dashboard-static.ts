import 'server-only';

import rawDashboardData from '@/GDD/dashboard-data.generated.json';
import type { DashboardData } from '@/lib/data';

export const dashboardData = rawDashboardData as unknown as DashboardData;
