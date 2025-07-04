import {Locale} from 'next-intl';
import {host} from '@/config';
import {routing} from '@/i18n/routing';
import {getPathname} from '@/i18n/navigation';

export default function sitemap(): {
  alternates: { languages: { [p in Locale]: string } };
  url: string;
}[] {
  return [...getEntries('/')];
}


type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href): {
  url: string;
  alternates: {
    languages: Record<Locale, string>;
  };
}[] {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
          routing.locales.map((cur) => [cur, getUrl(href, cur)])
      ) as Record<Locale, string>,
    },
  }));
}


function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href});
  return host + pathname;
}
