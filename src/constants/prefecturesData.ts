export const AREA_NAME = [
  "北海道・東北",
  "関東",
  "北陸・甲信越",
  "中部",
  "関西",
  "中国",
  "四国",
  "九州・沖縄",
];

// 各都道府県のコードは大エリアマスタAPIから取得
//エンドポイント http://webservice.recruit.co.jp/hotpepper/large_area/v1/?format=json&key=*****
export const PREFECTURES_DATA = [
  [
    { params: "Z041", name: "北海道" },
    { params: "Z051", name: "青森" },
    { params: "Z052", name: "岩手" },
    { params: "Z053", name: "宮城" },
    { params: "Z054", name: "秋田" },
    { params: "Z055", name: "山形" },
    { params: "Z056", name: "福島" },
  ],
  [
    { params: "Z015", name: "茨城" },
    { params: "Z016", name: "栃木" },
    { params: "Z017", name: "群馬" },
    { params: "Z013", name: "埼玉" },
    { params: "Z014", name: "千葉" },
    { params: "Z011", name: "東京" },
    { params: "Z012", name: "神奈川" },
  ],
  [
    { params: "Z061", name: "新潟" },
    { params: "Z062", name: "富山" },
    { params: "Z063", name: "石川" },
    { params: "Z064", name: "福井" },
    { params: "Z065", name: "山梨" },
    { params: "Z066", name: "長野" },
  ],
  [
    { params: "Z031", name: "岐阜" },
    { params: "Z032", name: "静岡" },
    { params: "Z033", name: "愛知" },
    { params: "Z034", name: "三重" },
  ],
  [
    { params: "Z021", name: "滋賀" },
    { params: "Z022", name: "京都" },
    { params: "Z023", name: "大阪" },
    { params: "Z024", name: "兵庫" },
    { params: "Z025", name: "奈良" },
    { params: "Z026", name: "和歌山" },
  ],
  [
    { params: "Z071", name: "鳥取" },
    { params: "Z072", name: "島根" },
    { params: "Z073", name: "岡山" },
    { params: "Z074", name: "広島" },
    { params: "Z075", name: "山口" },
  ],
  [
    { params: "Z081", name: "徳島" },
    { params: "Z082", name: "香川" },
    { params: "Z083", name: "愛媛" },
    { params: "Z084", name: "高知" },
  ],
  [
    { params: "Z091", name: "福岡" },
    { params: "Z092", name: "佐賀" },
    { params: "Z093", name: "長崎" },
    { params: "Z094", name: "熊本" },
    { params: "Z095", name: "大分" },
    { params: "Z096", name: "宮崎" },
    { params: "Z097", name: "鹿児島" },
    { params: "Z098", name: "沖縄" },
  ],
];
