import HomePage from "@/app/page";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Image from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.spyOn(window, "open").mockImplementation(() => {
  return {
    focus: jest.fn(),
  } as unknown as Window;
});

global.fetch = jest.fn();

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the header section", () => {
    const { container } = render(<HomePage />);
    expect(container).toHaveTextContent(
      "Acompañamiento emocional especializado en oncología",
    );
  });

  test("should render the inspirational section", () => {
    const { container } = render(<HomePage />);
    expect(container).toHaveTextContent("Un espacio seguro para sanar");
    expect(container).toHaveTextContent("Terapia especializada");
    expect(container).toHaveTextContent(
      "Para personas atravesando o que hayan vivenciado un proceso oncológico",
    );
    expect(container).toHaveTextContent("Soporte familiar");
    expect(
      screen.getByText(
        "Para cuidadores y entorno cercano a la persona diagnosticada",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Apoyo en duelo")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Para quienes se encuentren afrontando duelos por fallecimiento por cáncer",
      ),
    ).toBeInTheDocument();
  });

  test("should render the about section", () => {
    const { container } = render(<HomePage />);
    expect(container).toHaveTextContent("Hola, soy Florencia");
    expect(
      screen.getByText(
        "Psicóloga con formación de posgrado y trayectoria profesional en el ámbito de la Oncología. Durante años especialicé mi formación hacia la Psicooncología, Cuidados Paliativos y el Duelo. Me dedico al acompañamiento de personas atravesadas por la vivencia de una enfermedad oncológica. Creo profundamente en el valor de la palabra, su capacidad de ser refugio y espacio de transformación cuando la vida nos desafía.",
      ),
    ).toBeInTheDocument();
    expect(Image).toHaveBeenNthCalledWith(
      2,
      {
        src: "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//header-photo.jpeg",
        alt: "Foto profesional",
        width: 600,
        height: 800,
        className: "object-cover w-full h-full",
      },
      undefined,
    );
  });

  test("should render the TEDX talk section", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Te invito a escuchar mi charla TEDx"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Una mirada sencilla, clara y profunda acerca de algo tan vital como inevitable: el dolor. Ésta charla invita a reflexionar sobre el lugar que damos al dolor y a la persona doliente, y por qué el duelo debería incorporarse al currículum emocional, acompañándose desde distintos ámbitos de la sociedad.",
      ),
    ).toBeInTheDocument();

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/m1w9gnFD9X0?si=qL38CmxO-2ED8LwB",
    );
    expect(iframe).toHaveAttribute("width", "100%");
    expect(iframe).toHaveAttribute("height", "100%");
    expect(iframe).toHaveAttribute("frameBorder", "0");
    expect(iframe).toHaveAttribute("allowFullScreen");
    expect(iframe).toHaveAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    );
  });

  test("should render the contact section", () => {
    const { container } = render(<HomePage />);
    expect(container).toHaveTextContent("Estoy aquí para acompañarte");
    expect(container).toHaveTextContent(
      "Tu historia merece un espacio donde ser escuchada y abrazada.",
    );
    expect(container).toHaveTextContent(
      "En Hablemos de Cáncer la palabra es refugio.",
    );

    const button = screen.getAllByText("Agenda una sesión");
    expect(button[0]).toBeInTheDocument();
    fireEvent.click(button[0]);
    expect(window.open).toHaveBeenCalledWith(
      "https://wa.me/+5493425134461?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20con%20Florencia",
      "_blank",
    );
  });

  test("should render the newsletter section", () => {
    const { container } = render(<HomePage />);
    expect(container).toHaveTextContent("¿Querés recibir novedades?");
    expect(container).toHaveTextContent(
      "Suscribite a mi newsletter para recibir herramientas y reflexiones para acompañarte en tu proceso.",
    );

    const input = screen.getByPlaceholderText("Tu correo electrónico");
    expect(input).toBeInTheDocument();
  });

  test("should successfully subscribe to newsletter", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Suscripción exitosa" }),
    });

    render(<HomePage />);

    const input = screen.getByPlaceholderText("Tu correo electrónico");
    const button = screen.getByRole("button", { name: "Suscribirme" });

    fireEvent.change(input, { target: { value: "test@test.com" } });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/suscription/newsletter/susbcribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "test@test.com" }),
      },
    );

    expect(
      await screen.findByText(
        "¡Gracias por suscribirte! Revisa tu correo para confirmar.",
      ),
    ).toBeInTheDocument();
  });

  test("should handle newsletter subscription error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Error en la suscripción" }),
    });

    render(<HomePage />);

    const input = screen.getByPlaceholderText("Tu correo electrónico");
    const button = screen.getByRole("button", { name: "Suscribirme" });

    fireEvent.change(input, { target: { value: "test@test.com" } });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/suscription/newsletter/susbcribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "test@test.com" }),
      },
    );

    expect(
      await screen.findByText(
        "Hubo un error al suscribirte. Inténtalo de nuevo.",
      ),
    ).toBeInTheDocument();
  });
});
