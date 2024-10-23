/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // NOTE:外部から画像を読み込む際には対象のURLを記載する
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgfp.hotp.jp",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
