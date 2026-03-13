export async function GET() {
  return Response.json({ preview: false, message: "Preview endpoint placeholder" });
}

export async function POST() {
  return Response.json({ preview: true, message: "Preview endpoint placeholder" });
}
