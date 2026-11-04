/**
 * Permanent redirects from the old WordPress site's URLs (still indexed by Google) to their
 * closest page on this site, so search results and old links don't land on a 404.
 *
 * The list comes from the Wayback Machine's capture index of adventophile.com (Nov 2026).
 * Leftover theme/shop pages with no equivalent (/checkout, /my-account, /sample-page, /icons …)
 * are deliberately left to 404 so Google drops them rather than treating them as soft-404s.
 *
 * Old URLs ended in "/"; Next.js strips the trailing slash first, so sources here omit it.
 */
type Redirect = { source: string; destination: string; permanent: true };

const map: Record<string, string> = {
  // Company pages
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/our-services": "/services",
  "/add_services": "/services",
  "/privacy-policy": "/privacy",
  "/term-and-conditions": "/terms",
  "/terms-conditions": "/terms",
  "/faq": "/contact",

  // Theme listing/demo pages
  "/tours-list-view": "/tours",
  "/tours-list-sidebar/:path*": "/tours",
  "/tours-list-top-search/:path*": "/tours",
  "/all-items": "/tours",
  "/search-result": "/tours",
  "/categories/:path*": "/tours",
  "/brw_tour_types/:path*": "/tours",
  "/product-category/:path*": "/tours",
  "/product-tag/:path*": "/tours",
  "/to_book/:path*": "/tours",
  "/destination-list": "/destinations",
  "/destination-list-2": "/destinations",
  "/cat_destination/:path*": "/destinations",

  // Destination package pages
  "/andaman-tour-packages": "/destinations/andaman-nicobar",
  "/arunachal-pradesh-tour-packages": "/destinations/arunachal-pradesh",
  "/dubai-tour-packages": "/destinations/dubai",
  "/dubai": "/destinations/dubai",
  "/dubai-29750": "/destinations/dubai",
  "/dubai-44890": "/destinations/dubai",
  "/dubai-52750": "/destinations/dubai",
  "/dubai-54900": "/destinations/dubai",
  "/kashmir-tour-packages": "/destinations/kashmir",
  "/meghalaya-tour-packages": "/destinations/meghalaya",
  "/rajasthan-tour-packages": "/destinations/rajasthan",
  "/sikkim-tour-packages": "/destinations/sikkim",
  "/singapore-tour-packages": "/destinations/singapore",
  "/thailand-tour-packages": "/destinations/thailand",
  "/vietnam-tour-packages": "/destinations/vietnam",

  // Individual old packages → closest new tour (or destination when there's no close tour)
  "/andaman-island-explorer-a-complete-tour-package": "/tours/andaman-port-blair-havelock-neil",
  "/dreamy-escapad-to-the-island-of-andaman": "/tours/andaman-port-blair-havelock-neil",
  "/lavish-tropical-retreat-in-the-andamans": "/tours/andaman-port-blair-havelock-neil",
  "/underwater-romance-in-andaman": "/tours/andaman-port-blair-havelock-neil",
  "/blissful-kashmir-couple-special-free-houseboat-stay": "/tours/kashmir-srinagar-gulmarg-pahalgam",
  "/exclusive-kashmir-honeymoon-free-candlelight-dinner": "/tours/kashmir-srinagar-gulmarg-pahalgam",
  "/kashmir-family-gateway-free-shikara-ride": "/tours/kashmir-srinagar-gulmarg-pahalgam",
  "/kashmir-retreat-romantic-escape-to-doodhpathri-20000": "/tours/kashmir-srinagar-gulmarg-pahalgam",
  "/srinagar-pahalgam-gulmarg-with-abc-valley": "/tours/kashmir-srinagar-gulmarg-pahalgam",
  "/escape-to-vietnam-free-halong-bay-cruise-excusion": "/tours/vietnam-hanoi-halong-danang-saigon",
  "/exclusive-vietnam-with-fansipan-mountain-trek-cave-excursion": "/tours/vietnam-hanoi-halong-danang-saigon",
  "/instagrammable-vietnam-free-golden-hand-bridge-cable-car-tickets": "/tours/vietnam-hanoi-halong-danang-saigon",
  "/the-vietnam-adventure-for-18-35-years-young-adults": "/tours/vietnam-hanoi-halong-danang-saigon",
  "/vietnam-couple-exclusive-free-candle-light-dinner": "/tours/vietnam-hanoi-halong-danang-saigon",
  "/best-of-singapore-free-universal-studio-tickets": "/destinations/singapore",
  "/glimpse-of-singapore-flights-included": "/destinations/singapore",
  "/instagrammable-singapore-with-free-ride-to-singapore-flyer": "/destinations/singapore",
  "/the-singapore-adventure-for-18-35-years-young-adults": "/destinations/singapore",
  "/singapore-malaysia-with-free-night-safari-experience": "/destinations/singapore",
  "/jaipur-jodhpur-jaisalmer-free-desert-safari": "/tours/jaisalmer-golden-city-desert-camp",
  "/jaipur-jodhpur-udaipur-free-speed-boat-ride-tickets": "/tours/royal-rajasthan-jaipur-jodhpur-udaipur",
  "/jaipur-udaipur-jodhpur-jaisalmer-free-romantic-lakeview-dinner-2": "/tours/royal-rajasthan-jaipur-jodhpur-udaipur",
  "/udaipur-mount-abu-free-boat-ride-at-lake-pichola": "/tours/royal-rajasthan-jaipur-jodhpur-udaipur",
  "/golden-triangle-free-photoshoot-at-taj-mahal": "/tours",
  "/ultimate-beach-vacations-for-family": "/tours",

  // Old blog posts (each existed twice, with and without a "-2" suffix) → matching new post
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/change-your-place-and-get-the-fresh-air:dup(-2)?": "/blog/change-your-place-and-get-the-fresh-air",
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/introducing-this-amazing-city:dup(-2)?": "/blog/introducing-this-amazing-city",
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/pack-wisely-before-traveling:dup(-2)?": "/blog/pack-wisely-before-traveling",
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/the-surfing-man-will-blow-your-mind:dup(-2)?": "/blog/the-surfing-man-will-blow-your-mind",
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/how-to-travel-with-paper-map:dup(-2)?": "/blog/how-to-travel-with-a-paper-map",
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/pityful-a-rethoric-question-ran:dup(-2)?": "/blog/a-rethoric-question-worth-asking-before-you-book",
  // Any other dated post, and the old blog archive pages
  "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug": "/blog",
  "/category/:path*": "/blog",
  "/tag/:path*": "/blog",
  "/author/:path*": "/blog",
  "/event_tag/:path*": "/blog",
};

export const legacyRedirects: Redirect[] = Object.entries(map).map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}));
