/**
 * Root marketing route (`/`): loads homepage content from the Nest BFF in a Server Component and
 * renders Strapi dynamic-zone sections. Data fetching stays on the server (`get-homepage.ts`).
 */

import { getHomepage } from '@/features/homepage/api/get-homepage';
import { HomepageSections } from '@/features/homepage/sections/HomepageSections';

export default async function Index() {
  const homepage = await getHomepage();
  return <HomepageSections sections={homepage.sections} />;
}
