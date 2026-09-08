import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const urls = ['https://api.gtid.pro/price', 'https://gtid.pro/price'];
    let data: any = null;
    let lastError: any = null;

    for (const url of urls) {
      try {
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'User-Agent': 'Wicstore-Catalog/1.0',
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(5000),
        });

        if (res.ok) {
          data = await res.json();
          if (data && typeof data.buy === 'number' && typeof data.sell === 'number') {
            break;
          }
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!data) {
      throw lastError || new Error('Gagal mengambil data kurs dari server GTID');
    }

    const buy = Math.round(data.buy);
    const sell = Math.round(data.sell);
    const average = Math.round((buy + sell) / 2);
    const buyBgl = Math.round(data.buyBgl || buy * 100);
    const sellBgl = Math.round(data.sellBgl || sell * 100);

    return NextResponse.json({
      success: true,
      data: {
        buy,
        sell,
        average,
        buyBgl,
        sellBgl,
        spread: data.spread || { dl: sell - buy, bgl: sellBgl - buyBgl },
        posts24h: data.posts24h,
        sources: data.sources,
        updatedAt: data.updatedAt || new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Gagal menghubungi server API GTID',
      },
      { status: 502 }
    );
  }
}
