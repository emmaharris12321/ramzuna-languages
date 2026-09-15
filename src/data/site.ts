/**
 * Site Data Loader
 * Loads site configuration from YAML content collections.
 * Edit your content in: src/content/config/site.yaml
 */
import { getEntry } from 'astro:content';

export async function getSite() {
  const entry = await getEntry('config', 'site');
  return entry!.data;
}

export async function getNav() {
  const entry = await getEntry('config', 'site');
  return entry!.data.nav;
}

export async function getHeader() {
  const entry = await getEntry('config', 'site');
  return entry!.data.header;
}

export async function getHomepage() {
  const entry = await getEntry('homepage', 'index');
  return entry!.data;
}

export async function getPage(slug: string) {
  const entry = await getEntry('pages', slug);
  return entry?.data;
}
