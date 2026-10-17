export const SECTION_IDS = ['home', 'about', 'skills', 'project', 'blog', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_CHANGE_EVENT = 'portfolio:section-change';

export function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

export function navigateTo(id: string) {
  const sectionId = id.replace(/^#/, '');
  if (!isSectionId(sectionId)) return;
  window.history.pushState(null, '', `#${sectionId}`);
  window.dispatchEvent(new CustomEvent<SectionId>(SECTION_CHANGE_EVENT, { detail: sectionId }));
}
