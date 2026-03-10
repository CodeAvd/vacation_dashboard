export type DashboardSectionId =
  | 'filters'
  | 'risks'
  | 'bugs'
  | 'evidence'
  | 'actions'
  | 'psychology'
  | 'improvements'
  | 'insights'
  | 'competitors'
  | 'roadmap'
  | 'sources';

export type DashboardExpandedSectionState = Record<DashboardSectionId, boolean>;

export interface DashboardSectionManifestItem {
  id: DashboardSectionId;
  navKey?: string;
  defaultExpanded: boolean;
  lazy: 'eager' | 'visible' | 'on-demand';
  motionDelayMs: number;
  priority: 'primary' | 'secondary';
}

export const DASHBOARD_SECTION_MANIFEST: DashboardSectionManifestItem[] = [
  { id: 'filters', defaultExpanded: false, lazy: 'eager', motionDelayMs: 0, priority: 'primary' },
  { id: 'risks', navKey: 'nav_risks', defaultExpanded: true, lazy: 'eager', motionDelayMs: 40, priority: 'primary' },
  { id: 'bugs', navKey: 'nav_bugs', defaultExpanded: true, lazy: 'visible', motionDelayMs: 70, priority: 'primary' },
  { id: 'evidence', navKey: 'nav_evidence', defaultExpanded: true, lazy: 'visible', motionDelayMs: 100, priority: 'primary' },
  { id: 'actions', navKey: 'nav_actions', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 140, priority: 'primary' },
  { id: 'psychology', navKey: 'nav_psychology', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 170, priority: 'secondary' },
  { id: 'improvements', navKey: 'nav_improvements', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 200, priority: 'secondary' },
  { id: 'insights', navKey: 'nav_insights', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 230, priority: 'primary' },
  { id: 'competitors', navKey: 'nav_competitors', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 260, priority: 'secondary' },
  { id: 'roadmap', navKey: 'nav_roadmap', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 290, priority: 'primary' },
  { id: 'sources', navKey: 'nav_sources', defaultExpanded: false, lazy: 'on-demand', motionDelayMs: 320, priority: 'secondary' },
];

export const DEFAULT_EXPANDED_SECTIONS: DashboardExpandedSectionState = DASHBOARD_SECTION_MANIFEST.reduce(
  (sections, section) => ({ ...sections, [section.id]: section.defaultExpanded }),
  {} as DashboardExpandedSectionState,
);

export const DECISION_RAIL_SECTIONS = DASHBOARD_SECTION_MANIFEST.filter(
  (section) => section.navKey && section.id !== 'filters',
);

export function getSectionManifest(id: DashboardSectionId): DashboardSectionManifestItem {
  const section = DASHBOARD_SECTION_MANIFEST.find((candidate) => candidate.id === id);
  if (!section) {
    throw new Error(`Unknown dashboard section: ${id}`);
  }
  return section;
}
