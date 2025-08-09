import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/Footer";

jest.spyOn(window, "open").mockImplementation(() => {
  return {
    focus: jest.fn(),
  } as unknown as Window;
});

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the content", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "© 2025 Hablemos de Cáncer. Todos los derechos reservados.",
      ),
    ).toBeInTheDocument();
  });

  test("should render the youtube link", () => {
    render(<Footer />);
    const youtubeLink = screen.getByTestId("youtube-link");
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveAttribute(
      "href",
      "https://www.youtube.com/embed/m1w9gnFD9X0?si=qL38CmxO-2ED8LwB",
    );
  });

  test("should render the instagram link", () => {
    render(<Footer />);
    const instagramLink = screen.getByTestId("instagram-link");
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/hablemos.de.cancer/",
    );
  });
});
