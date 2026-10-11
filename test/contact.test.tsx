import { screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";
import { CONTACT_EMAIL } from "@/config/contact";
import { renderAt } from "./render";

describe("Contact page", () => {
  it("renders the contact methods in English", () => {
    renderAt(<ContactPage />, "/contact/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Get in Touch");
    expect(screen.getByText("Email Us")).toBeInTheDocument();
    expect(screen.getAllByText(CONTACT_EMAIL).length).toBeGreaterThan(0);
  });

  it("renders in Arabic under /ar/", () => {
    renderAt(<ContactPage />, "/ar/contact/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("تواصل معنا");
  });
});
