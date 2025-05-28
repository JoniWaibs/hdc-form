import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import NewResourcePage from "@/app/admin/resources/create/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NewResourcePage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with all required fields", () => {
    render(<NewResourcePage />);

    expect(screen.getByText("Crear nuevo recurso")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre del recurso")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de Inicio")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de Fin")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio")).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad de Encuentros")).toBeInTheDocument();
    expect(screen.getByLabelText("URL de la Reunión")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Descargo de Responsabilidad")
    ).toBeInTheDocument();
  });

  test("shows validation errors for required fields", async () => {
    const { container } = render(<NewResourcePage />);

    const submitButton = screen.getByText("Crear recurso");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(container).toHaveTextContent("El nombre es requerido");
      expect(container).toHaveTextContent("Debe ser una URL válida");
    });
  });

  test("submits form with valid data", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
      })
    );

    render(<NewResourcePage />);

    fireEvent.change(screen.getByLabelText("Nombre del recurso"), {
      target: { value: "Test Resource" },
    });

    fireEvent.change(screen.getByLabelText("URL de la Reunión"), {
      target: { value: "https://meet.google.com/test" },
    });

    fireEvent.change(screen.getByLabelText("Precio"), {
      target: { value: "100" },
    });

    fireEvent.change(screen.getByLabelText("Cantidad de Encuentros"), {
      target: { value: "5" },
    });

    const submitButton = screen.getByText("Crear recurso");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/resources", {
        method: "POST",
        body: expect.any(String),
      });

      expect(mockPush).toHaveBeenCalledWith("/admin/resources");
    });
  });

  test("handles API error on form submission", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 400, error: "API Error" }),
      })
    );

    render(<NewResourcePage />);

    fireEvent.change(screen.getByLabelText("Nombre del recurso"), {
      target: { value: "Test Resource" },
    });

    fireEvent.change(screen.getByLabelText("URL de la Reunión"), {
      target: { value: "https://meet.google.com/test" },
    });

    const submitButton = screen.getByText("Crear recurso");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error al crear recurso:",
        "API Error"
      );
    });

    consoleSpy.mockRestore();
  });
});
