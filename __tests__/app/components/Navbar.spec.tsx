import Navbar from "@/app/components/Navbar";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

import Image from "next/image";
import Link from "next/link";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(({ children, ...props }) => (
      <a {...props}>{children}</a>
    )),
}));

jest.spyOn(window, "open").mockImplementation(() => {
  return {
    focus: jest.fn(),
  } as unknown as Window;
});

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the logo", () => {
    const { container } = render(<Navbar />);
    expect(container).toHaveTextContent("Hablemos de Cáncer");

    expect(Image).toHaveBeenNthCalledWith(
      1,
      {
        src: "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png",
        alt: "Hablemos de Cáncer Logo",
        width: 32,
        height: 32,
        className: "rounded-full sm:w-10 sm:h-10",
      },
      undefined,
    );
  });

  test("should handle logo visibility correctly on services page", () => {
    (usePathname as jest.Mock).mockReturnValue("/services");
    const { container } = render(<Navbar />);

    const logoContainer = container.querySelector(
      ".flex.items-center.space-x-2",
    );
    expect(logoContainer).toHaveClass("hidden");
    expect(logoContainer).toHaveClass("sm:flex");

    expect(Image).toHaveBeenCalledWith(
      {
        src: "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png",
        alt: "Hablemos de Cáncer Logo",
        width: 32,
        height: 32,
        className: "rounded-full sm:w-10 sm:h-10",
      },
      undefined,
    );
  });

  test("should render the contact link", () => {
    render(<Navbar />);
    const link = screen.getByText("Contactar");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/+5493425134461?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20con%20Florencia",
    );
    expect(link.closest("a")).toHaveAttribute("target", "_blank");
    expect(link.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  test.each([
    { buttonText: "Inicio", buttonLink: "/#header" },
    { buttonText: "Sobre mí", buttonLink: "/#about" },
    { buttonText: "Servicios", buttonLink: "/services" },
    { buttonText: "Contacto", buttonLink: "/#contact" },
  ])("should render the $buttonText button", ({ buttonText, buttonLink }) => {
    render(<Navbar />);
    const link = screen.getByText(buttonText);
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(Link).toHaveBeenCalledWith(
      {
        children: buttonText,
        className:
          "text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base",
        href: buttonLink,
      },
      undefined,
    );
  });

  describe("Back button", () => {
    test("should not show back button on home page", () => {
      (usePathname as jest.Mock).mockReturnValue("/");
      render(<Navbar />);
      expect(screen.queryByText("Volver")).not.toBeInTheDocument();
    });

    test("should not show back button on header anchor", () => {
      (usePathname as jest.Mock).mockReturnValue("/#header");
      render(<Navbar />);
      expect(screen.queryByText("Volver")).not.toBeInTheDocument();
    });

    test("should show back button on services page", () => {
      (usePathname as jest.Mock).mockReturnValue("/services");
      render(<Navbar />);
      const backLink = screen.getByText("Volver");
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest("a")).toHaveAttribute("href", "/");
      expect(backLink.closest("a")).toHaveClass("sm:hidden");
    });
  });
});
