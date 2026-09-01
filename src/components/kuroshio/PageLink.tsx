import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import type { PageId } from "@/data/mockData";
import { getScrollBehavior } from "@/lib/utils";

type PageLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  readonly page: PageId;
};

function getPageHref(page: PageId) {
  return page === "home" ? "#/" : `#/${page}`;
}

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && ![event.metaKey, event.ctrlKey, event.shiftKey, event.altKey].some(Boolean);
}

export function PageLink({ onClick, page, ...props }: Readonly<PageLinkProps>) {
  const href = getPageHref(page);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || !isUnmodifiedPrimaryClick(event)) {
      return;
    }

    if (window.location.hash === href) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    }
  };

  return <a href={href} onClick={handleClick} {...props} />;
}
