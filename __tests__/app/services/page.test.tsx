import { render, screen } from "@testing-library/react";
import ServicesPage from "@/app/services/page";

describe("Services Page", () => {
  beforeEach(() => {
    jest.spyOn(window, "open").mockImplementation(() => {
      return {
        focus: jest.fn(),
      } as unknown as Window;
    });
    render(<ServicesPage />);
  });

  test("should render the services page", () => {
    expect(screen.getByText("Psicooncología individual")).toBeInTheDocument();
    expect(
      screen.getByText("Talleres grupales psicoeducativos"),
    ).toBeInTheDocument();
    expect(screen.getByText("Psicoterapia en duelo")).toBeInTheDocument();
    expect(
      screen.getByText("Asesoramiento institucional en duelo"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Un espacio personalizado, cálido y confidencial para explorar tus emociones y necesidades durante el proceso oncológico, brindándote herramientas para tu bienestar. Sesiones de terapia virtual desde la comodidad de tu hogar.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Encuentros temáticos estructurados que combinan información útil y herramientas emocionales. El grupo ofrece un espacio de contención, intercambio y aprendizaje compartido, resultando enriquecedor y fortalecedor de la red de apoyo.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Acompañamiento especializado frente al fallecimiento de un ser querido por cáncer. Ofrece un espacio donde transitar el duelo como un proceso único y profundamente humano, validando tus emociones y ayudándote a gestionarlas."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Capacitación de grupos/líderes de grupo en herramientas para contener, comunicar y acompañar a sus integrantes en el afrontamiento de una pérdida, actual o potencial. Abarca situaciones de crisis, comunicación de malas noticias, primeros auxilios psicológicos y protocolos de duelo.",
      ),
    ).toBeInTheDocument();
  });

  test.each([
    { buttonText: "Agendar Sesión" },
    { buttonText: "Solicitar información" },
  ])(
    "should render $buttonText link with correct attributes",
    ({ buttonText }) => {
      const link = screen.getAllByText(buttonText)[0];
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute("target", "_blank");
      expect(link.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
      expect(link.closest("a")).toHaveAttribute(
        "href",
        expect.stringContaining("https://wa.me/+5493425134461?text="),
      );
    },
  );
});
