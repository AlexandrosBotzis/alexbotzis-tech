import { getCollection } from 'astro:content';
import { postSlug } from './site';

/** Published projects, in display order. */
export async function getProjects() {
  return (await getCollection('projects', ({ data }) => !data.draft))
    .sort((a, b) => a.data.order - b.data.order);
}

export const projectSlug = (id: string) => postSlug(id);
/** Display title: "Name: descriptor" when a descriptor is set. */
export const projectTitle = (data: { name: string; descriptor?: string }) =>
  data.descriptor ? `${data.name}: ${data.descriptor}` : data.name;

export const projectHref = (id: string) => `/projects/${projectSlug(id)}`;
