import { Noto_Sans_JP } from "next/font/google";
import { ApolloProvider } from "@/components/AppoProvider";
import Link from "next/link";
import "@/styles/globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Proposy - 営業提案文作成ツール",
  description: "最短30秒で顧客に刺さる提案文を完成させる営業特化ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        <ApolloProvider>
          <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <Link
                      href="/"
                      className="text-2xl font-bold text-stone-900"
                    >
                      Proposy
                    </Link>
                  </div>
                  <nav className="flex space-x-8 items-center">
                    <Link
                      href="/"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      ホーム
                    </Link>
                    <Link
                      href="/customers"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      顧客管理
                    </Link>
                    <Link
                      href="/proposals"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      提案履歴
                    </Link>
                    <Link
                      href="/proposals/new"
                      className="bg-stone-900 text-white px-4 py-2 rounded-md hover:bg-stone-800 transition-colors"
                    >
                      提案文作成
                    </Link>
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}
