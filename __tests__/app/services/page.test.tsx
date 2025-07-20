import ServicesPage from "@/app/services/page";
import { render, screen, fireEvent } from "@testing-library/react";

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
    //Titles
    expect(screen.getByText("Psicooncología individual")).toBeInTheDocument();
    expect(
      screen.getByText("Talleres grupales psicoeducativos"),
    ).toBeInTheDocument();
    expect(screen.getByText("Psicoterapia en duelo")).toBeInTheDocument();
    expect(
      screen.getByText("Asesoramiento institucional en duelo"),
    ).toBeInTheDocument();

    //Content
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
        "Acompañamiento especializado frente al fallecimiento de un ser querido por cáncer. Ofrece un espacio donde transitar al duelo como un proceso único y profundamente humano, validando sus emociones y ayudándote a gestionarlas.",
      ),
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
  ])("should call $buttonText button", ({ buttonText }) => {
    const button = screen.getAllByText(buttonText);
    expect(button[0]).toBeInTheDocument();
    fireEvent.click(button[0]);
    expect(window.open).toHaveBeenCalledWith(
      "https://wa.me/+5493425134461?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20con%20Florencia",
      "_blank",
    );
  });
});
