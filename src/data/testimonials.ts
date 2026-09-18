export interface Testimonial {
  quote: string;
  firstName: string;
  originCountry: string;
  year: number | string;
  serviceUsed: string;
  /** Path under /public, e.g. "/images/testimonials/xxx.jpg" — usually a blurred WhatsApp screenshot. */
  screenshotPath?: string;
}

// Populate this array with real, permission-granted testimonials only.
// Leave it empty until then — the Testimonials component renders nothing
// at all when this array is empty (no placeholder, no "coming soon").
//
// Shape of each entry:
// {
//   quote: "The exact words the student said, in whatever language they said it.",
//   firstName: "Mahmoud",
//   originCountry: "Egypt",
//   year: 2026,
//   serviceUsed: "Document Review",
//   screenshotPath: "/images/testimonials/mahmoud-2026.jpg",
// }
export const testimonials: Testimonial[] = [];
