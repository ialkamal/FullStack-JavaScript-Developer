import request from "supertest";

const BASE = "https://rickandmortyapi.com";

describe("Rick & Morty API /api/character", () => {
  it("returns a paged list (200 + JSON)", async () => {
    const res = await request(BASE)
      .get("/api/character")
      .expect(200)
      .expect("content-type", /json/i);

    expect(res.body.info).toBeDefined();
    expect(res.body.info).toEqual(
      jasmine.objectContaining({
        count: jasmine.any(Number),
        pages: jasmine.any(Number),
      })
    );
    expect(Array.isArray(res.body.results)).toBeTrue();
  });

  it("supports filtering by name", async () => {
    const res = await request(BASE)
      .get("/api/character")
      .query({ name: "Rick" })
      .expect(200);

    const names = (res.body.results as Array<{ name: string }>).map((c) =>
      c.name.toLowerCase()
    );
    expect(names.every((n) => n.includes("rick"))).toBeTrue();
  });

  it("returns 404 for non-existent character id", async () => {
    await request(BASE).get("/api/character/99999999").expect(404);
  });
});
