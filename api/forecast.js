
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const url =
      "https://randaberg-vaervarsel-24t.vercel.app/api/forecast";

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20000)
    });

    if (!response.ok) {
      return res.status(502).json({
        error: "Prognose-API svarte med feil",
        status: response.status
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({
      error: "Kunne ikke hente værprognosen",
      detail: error.message
    });
  }
}
