import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import EmailCell from "./EmailCell";

const renderCell = (emails: string[], width: number) => {
  return render(<EmailCell emails={emails} currentWidth={width} />);
};

describe("EmailCell basic behavior", () => {
  test("menampilkan '–' jika email kosong", () => {
    renderCell([], 200);
    expect(screen.getByText("–")).toBeInTheDocument();
  });

  test("menampilkan email panjang dengan ellipsis", () => {
    const longEmail = "super-long-email-address-that-will-overflow@example.com";

    renderCell([longEmail], 80); // width kecil

    const el = screen.getByText(longEmail);

    expect(el).toBeInTheDocument();
    expect(el).toHaveStyle({
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    });
  });

  test("menampilkan email pendek tanpa ellipsis", () => {
    const shortEmail = "a@test.com";

    renderCell([shortEmail], 200);

    expect(screen.getByText(shortEmail)).toBeInTheDocument();
  });
});
