// Traffic panel *content* (labels, embed URLs) now comes from the CMS
// (see src/lib/cms/traffic-panels.ts). This type is kept here since
// several components reference it for props.
export interface TrafficPanel {
  id: string;
  label: string;
  sublabel: string;
  src: string;
}
