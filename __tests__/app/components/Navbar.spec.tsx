import Navbar from "@/app/components/Navbar";
import { render, screen, fireEvent } from "@testing-library/react";
import Image from "next/image";
import Link from "next/link";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ children, ...props }) => (
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
    const {container} = render(<Navbar />);
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
      undefined
    );
  });

  test("should render the contact button", () => {
    render(<Navbar />);
    const button = screen.getByText("Contactar");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(window.open).toHaveBeenCalledWith(
      "https://wa.me/+5493425134461?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20con%20Florencia",
      "_blank"
    );
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
    expect(Link).toHaveBeenCalledWith({"children": buttonText, "className": "text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base", "href": buttonLink}, undefined);
  });
});
