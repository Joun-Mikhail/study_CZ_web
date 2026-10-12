import { fireEvent, screen } from "@testing-library/react";
import { HelpLink } from "@/components/help-sheet";
import { checkoutLink } from "@/config/pricing";
import { REFUND_COPY } from "@/config/contact";
import { renderAt } from "./render";

describe("HelpLink", () => {
  beforeAll(() => {
    // jsdom has <dialog> but not showModal/close.
    HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  it("is a real link to the Stripe page, so it works without JavaScript", () => {
    renderAt(<HelpLink service="documentReview" source="test:docs">Check my documents</HelpLink>);
    const link = screen.getByRole("link", { name: "Check my documents" });
    expect(link).toHaveAttribute("href", checkoutLink("documentReview"));
    expect(link).toHaveAttribute("data-source", "test:docs");
  });

  it("opens the sheet with the refund rule and the payment link before Stripe", () => {
    renderAt(<HelpLink service="documentReview" source="test:docs">Check my documents</HelpLink>);
    fireEvent.click(screen.getByRole("link", { name: "Check my documents" }));
    expect(screen.getByRole("heading", { name: "Document review" })).toBeInTheDocument();
    expect(screen.getByText(REFUND_COPY.en.perService.documentReview)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continue to secure payment" })).toHaveAttribute(
      "href",
      checkoutLink("documentReview")
    );
  });

  it("speaks Arabic under /ar/", () => {
    renderAt(<HelpLink service="interviewPrep" source="test">احجز</HelpLink>, "/ar/stage/visa/");
    fireEvent.click(screen.getByRole("link", { name: "احجز" }));
    expect(screen.getByRole("heading", { name: "مقابلة السفارة التجريبية" })).toBeInTheDocument();
    expect(screen.getByText("مش دلوقتي")).toBeInTheDocument();
  });
});
