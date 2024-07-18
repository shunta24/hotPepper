import { getShopsData } from "@/functions/communicateApi";

export async function POST(request: Request) {
  const areaCode = await request.json();
  const res = await getShopsData(areaCode);

  return Response.json(res);
}
