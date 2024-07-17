export async function POST(request: Request) {
  const areaCode = await request.json();
  const res = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY}&middle_area=${areaCode}`
  )
    .then((a) => a.json())
    .catch((a) => a.json());

  return Response.json(res);
}
