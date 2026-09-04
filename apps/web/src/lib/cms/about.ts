import type { CoreValue, TeamMember, TimelineEntry } from "@/types";
import { cmsFetch } from "./config";
import { resolveIcon } from "./icons";

interface ApiCoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface ApiTimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
}

interface ApiTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoAsset: { url: string } | null;
}

export interface PageSection {
  sectionKey: string;
  eyebrow: string | null;
  heading: string;
  body: string;
  iconName: string | null;
}

interface ApiAboutResponse {
  coreValues: ApiCoreValue[];
  timeline: ApiTimelineEntry[];
  team: ApiTeamMember[];
  sections: PageSection[];
}

export interface AboutData {
  coreValues: CoreValue[];
  timeline: TimelineEntry[];
  team: TeamMember[];
  sections: Map<string, PageSection>;
}

export async function getAboutData(): Promise<AboutData> {
  const data = await cmsFetch<ApiAboutResponse>("/api/v1/about");
  return {
    coreValues: data.coreValues.map((v) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      icon: resolveIcon(v.iconName),
    })),
    timeline: data.timeline.map((t) => ({
      id: t.id,
      year: t.year,
      title: t.title,
      description: t.description,
    })),
    team: data.team.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: m.bio,
      photo: m.photoAsset?.url ?? "",
    })),
    sections: new Map(data.sections.map((s) => [s.sectionKey, s])),
  };
}
