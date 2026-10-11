import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { TranslationProvider } from "@/i18n/context";
import { navigation } from "./setup";

/** Render a page or component inside the i18n provider, as if at `pathname`. */
export function renderAt(ui: ReactElement, pathname = "/") {
  navigation.pathname = pathname;
  return render(<TranslationProvider>{ui}</TranslationProvider>);
}
