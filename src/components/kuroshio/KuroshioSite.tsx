import { SiteShell } from "@/components/kuroshio/SiteShell";
import { AboutPage } from "@/components/kuroshio/pages/AboutPage";
import { ContactPage } from "@/components/kuroshio/pages/ContactPage";
import { HomePage } from "@/components/kuroshio/pages/HomePage";
import { IndustriesPage } from "@/components/kuroshio/pages/IndustriesPage";
import { PlatformPage } from "@/components/kuroshio/pages/PlatformPage";
import { useActivePage } from "@/hooks/useActivePage";
import type { PageId } from "@/data/mockData";

const pages = {
  home: HomePage,
  platform: PlatformPage,
  industries: IndustriesPage,
  about: AboutPage,
  contact: ContactPage,
} satisfies Record<PageId, (props: { readonly onNavigate: (page: PageId) => void }) => JSX.Element>;

export interface KuroshioSiteProps {}

export function KuroshioSite(_props: Readonly<KuroshioSiteProps>) {
  const { activePage, navigate } = useActivePage();
  const ActivePage = pages[activePage];

  return (
    <SiteShell activePage={activePage} onNavigate={navigate}>
      <ActivePage onNavigate={navigate} />
    </SiteShell>
  );
}
