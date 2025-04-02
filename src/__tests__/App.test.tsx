import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import * as catAPI from "../services/catAPI";

const mockGetCatImage = vi.spyOn(catAPI, "getCatImage");

describe("App Component", () => {
  beforeEach(() => {
    mockGetCatImage.mockResolvedValue("https://example.com/cat.jpg");
    vi.clearAllMocks();
  });

  it('should render "Loading..." initially', () => {
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render the InfoCard with the cat image after loading", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/cat.jpg"
    );
  });

  it("should render ErrorMessage if API call fails", async () => {
    mockGetCatImage.mockRejectedValue("API_ERROR");
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("API_ERROR")).toBeInTheDocument()
    );
    expect(screen.getByAltText("cat staring")).toBeInTheDocument();
  });

  it("should search for a new image when clicking the button", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "CLICK ME!" });
    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
    expect(mockGetCatImage).toHaveBeenCalledTimes(2); // One by useEffect, other by click
  });

  it("should clear the error when clicking the button and trying to fetch a new image", async () => {
    mockGetCatImage.mockRejectedValue("API_ERROR");
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("API_ERROR")).toBeInTheDocument()
    );

    mockGetCatImage.mockResolvedValue("https://example.com/new_cat.jpg");
    const button = screen.getByRole("button", { name: "CLICK ME!" });
    fireEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
    expect(screen.queryByText("API_ERROR")).toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/new_cat.jpg"
    );
  });
});
