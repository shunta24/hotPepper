export const AREA_API_END_POINT = `http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?format=json&key=${process.env.HOT_PEPPER_API_KEY}`;
export const SHOPS_API_END_POINT = AREA_API_END_POINT.replace(
  "middle_area",
  "gourmet"
);
export const DEFAULT_GET_DATA_COUNT = 20;

// 予算マスタAPIからコードを取得
//エンドポイント http://webservice.recruit.co.jp/hotpepper/budget/v1/?format=json&key=*****
export const BUDGET_DATA = [
  { code: "", value: "なし" },
  { code: "B009,B010", value: "1000円以下" },
  { code: "B011,B001", value: "1000~2000円" },
  { code: "B002,B003", value: "2000~4000円" },
  { code: "B008,B004", value: "4000~7000円" },
  { code: "B005,B006", value: "7000~15000円" },
  { code: "B012,B013", value: "15000~30000円" },
  { code: "B014", value: "30000円以上" },
];

// ジャンルマスタAPIからデータ取得 ジャンルを追加したい場合はAPIで確認する
//エンドポイント http://webservice.recruit.co.jp/hotpepper/genre/v1/?format=json&key=*****
export const GENRE_DATA = [
  { code: "G001", value: "居酒屋" },
  { code: "G002", value: "ダイニングバー・バル" },
  { code: "G003", value: "創作料理" },
  { code: "G004", value: "和食" },
  { code: "G005", value: "洋食" },
  { code: "G006", value: "イタリアン・フレンチ" },
  { code: "G007", value: "中華" },
  { code: "G008", value: "焼肉・ホルモン" },
  { code: "G012", value: "バー・カクテル" },
  { code: "G013", value: "ラーメン" },
  { code: "G014", value: "カフェ・スイーツ" },
  { code: "G016", value: "お好み焼き・もんじゃ" },
  { code: "G017", value: "韓国料理" },
  { code: "G015", value: "その他グルメ" },
];

// 特集マスタAPIからデータ取得 追加したい場合はAPIで確認する　季節毎で変わる特集もあるので定期で確認必要
//エンドポイント http://webservice.recruit.co.jp/hotpepper/special/v1/?format=json&key=*****
export const CATEGORY_DATA = [
  { code: "LT0091", value: "3時間以上滞在可能" },
  { code: "LT0093", value: "合コンにおすすめ" },
  { code: "LU0002", value: "貸切パーティー" },
  { code: "LU0014", value: "ソファーでゆっくり" },
  { code: "LY0081", value: "こだわりのビール" },
  { code: "LU0011", value: "おしゃれなBAR" },
  { code: "LU0029", value: "デートにおすすめ" },
  { code: "LU0021", value: "ダーツ・カラオケあり" },
  { code: "LU0019", value: "誕生日・記念日サービスあり" },
  { code: "LU0030", value: "カップルシートあり" },
  { code: "LU0040", value: "贅沢グルメ" },
  { code: "LY0094", value: "ワイン・シャンパンの種類が豊富" },
  { code: "LU0018", value: "焼酎・日本酒の種類が豊富" },
  { code: "LU0054", value: "肉を食べたい" },
  { code: "LU0056", value: "海鮮を食べたい" },
  { code: "LY0083", value: "デザート・スイーツのバイキングがある" },
  { code: "LY0065", value: "テラス席がある" },
  { code: "LZ0032", value: "辛いものが食べたい" },
  { code: "LZ0046", value: "チーズが食べたい" },
  { code: "LZ0044", value: "おひとり様歓迎" },
  { code: "LZ0045", value: "完全個室のお店" },
  { code: "LZ0047", value: "昼飲みができるお店" },
  { code: "LU0031", value: "夜景を楽しむ" },
];

export const OTHER_OPTIONS_DATA = [
  { code: "course=1", value: "コースあり" },
  { code: "free_drink=1", value: "飲み放題あり" },
  { code: "free_food=1", value: "食べ放題あり" },
  { code: "private_room=1", value: "個室あり" },
  { code: "tatami=1", value: "座敷あり" },
  { code: "parking=1", value: "駐車場あり" },
  { code: "lunch=1", value: "ランチあり" },
  { code: "midnight=1", value: "23時以降も営業" },
  { code: "pet=1", value: "ペット可" },
];

export const DISTANCE_DATA = [
  { code: "1", value: "300m以内" },
  { code: "2", value: "500m以内" },
  { code: "3", value: "1km以内" },
  { code: "4", value: "2km以内" },
  { code: "5", value: "3km以内" },
];
