// Minimal typing for the Netlify Functions runtime global, so the functions
// need no extra npm package for types.
declare const Netlify: {
  env: { get(name: string): string | undefined };
};
