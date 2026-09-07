import { Account, StoreSettings } from '../types/account';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLocks(priceIdr: number, dlRate: number = 3500): { dl: number; bgl: number; text: string } {
  if (!priceIdr || priceIdr <= 0) {
    return { dl: 0, bgl: 0, text: '0 DL' };
  }

  const totalDl = Math.round(priceIdr / dlRate);
  const bgl = Math.floor(totalDl / 100);
  const remDl = totalDl % 100;

  let text = '';
  if (bgl > 0) {
    text = remDl > 0 ? `${bgl} BGL ${remDl} DL` : `${bgl} BGL`;
  } else {
    text = `${totalDl} DL`;
  }

  return { dl: totalDl, bgl, text };
}

export function generateWhatsAppOrderUrl(
  account: Account,
  settings: StoreSettings,
  paymentMethod: string = 'QRIS / Direct Bank'
): string {
  const lockInfo = formatLocks(account.priceIdr, settings.dlRateIdr);
  const priceRpStr = formatRupiah(account.priceIdr);

  const rawMessage = `Halo Admin, saya mau order Akun Growtopia [${account.id} - ${account.title}] - Tipe Login: [Log ${account.loginType}] - Harga: ${priceRpStr} / ${lockInfo.text}. Saya ingin bayar via [${paymentMethod}]. Apakah masih ada?`;

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(rawMessage)}`;
}

export function generateDiscordProfileUrl(discordId: string): string {
  return `https://discord.com/users/${discordId || '1199509687918399588'}`;
}

export function generateDiscordOrderMessage(
  account: Account,
  settings: StoreSettings,
  paymentMethod: string = 'QRIS / Bank',
  lang: 'en' | 'id' = 'en'
): string {
  const lockInfo = formatLocks(account.priceIdr, settings.dlRateIdr);
  const priceRpStr = formatRupiah(account.priceIdr);

  if (lang === 'id') {
    return `Halo Admin wicstore, saya ingin order Akun Growtopia:
• Kode: #${account.id}
• Judul: ${account.title}
• Tipe: Log Legacy (GrowID + Pass)
• Harga: ${priceRpStr} (~${lockInfo.text})
• Rencana Pembayaran: ${paymentMethod}
Mohon info ketersediaan & alur transaksi MM Discord GTID/GTMART atau Direct. Terima kasih!`;
  }

  return `Hello wicstore Admin, I would like to order this Growtopia Account:
• Code: #${account.id}
• Title: ${account.title}
• Type: Log Legacy (GrowID + Pass)
• Price: ${priceRpStr} (~${lockInfo.text})
• Payment Plan: ${paymentMethod}
Please let me know if it is available and how to proceed with Discord Middleman (GTID/GTMART) or Direct. Thank you!`;
}

export function generatePostTemplate(
  account: Account,
  settings: StoreSettings,
  mode: 'full' | 'short' = 'full'
): string {
  const lockInfo = formatLocks(account.priceIdr, settings.dlRateIdr);
  const priceRpStr = formatRupiah(account.priceIdr);

  if (mode === 'short') {
    return `🔥 WTS AKUN GROWTOPIA LEGACY [${account.id}]
💎 ${account.title}
⭐ Level: ${account.level} | Role: ${account.role}
🔑 Login: [LOG LEGACY] (${account.emailStatus})
💰 Harga: ${priceRpStr} / ${lockInfo.text}
🛡️ Menerima Direct / MM GTID & GTMART Discord
🎮 Discord: https://discord.com/users/${settings.discordId} (ID: ${settings.discordId})`;
  }

  const itemsList = account.questItems.map(item => `  • ${item}`).join('\n');
  const untradeableList = account.untradeableHighlights.map(item => `  • ${item}`).join('\n');

  return `╔══════════════════════════════════════╗
   💎 WICSTORE GROWTOPIA LEGACY STORE 💎
╚══════════════════════════════════════╝

📌 KODE AKUN: ${account.id}
🎮 JUDUL: ${account.title}
⚡ STATUS: ${account.isAvailable ? 'READY STOCK ✅' : 'TERJUAL (SOLD OUT) ❌'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SPESIFIKASI DETAIL AKUN:
• Tipe Login : [LOG LEGACY (GrowID + Pass)]
• Status Email : ${account.emailStatus}
• Level / Exp : Lv. ${account.level} (${account.expPercent ?? 0}%)
• Format GrowID: ${account.growIdFormat}
• Status Supporter: ${account.role}
• Tahun Pembuatan: ${account.accountYear}
• Backpack Slots : ${account.backpackSlots} Slots
• Jumlah World   : ${account.worldCount} Worlds

🏆 QUEST & RINGMASTER ITEMS:
${itemsList || '  • Standard Quest'}

✨ HIGHLIGHTS LAINNYA:
${untradeableList || '  • No Minus'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 HARGA:
💵 Rupiah (IDR): ${priceRpStr}
💠 Lock Rate   : ${lockInfo.text} (Kurs 1 DL = ${formatRupiah(settings.dlRateIdr)})

💳 METODE PEMBAYARAN:
• QRIS (All E-Wallet: GoPay, Dana, OVO, ShopeePay, LinkAja)
• Transfer Bank (BCA, Mandiri, BRI, BNI)
• In-Game DL / BGL

🛡️ KEAMANAN TRANSAKSI & REKBER DISCORD:
• Siap Direct (Amanah & Fast Response)
• Siap Rekber / Middleman Resmi via Discord:
  - GTMART Discord Official
  - GTID Discord Official
*(Fee Rekber / MM ditanggung pembeli atau sesuai kesepakatan)*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 HUBUNGI ADMIN WICSTORE:
🎮 Discord Profile: https://discord.com/users/${settings.discordId}
🆔 Discord ID: ${settings.discordId} (${settings.discordUsername})
🌐 Official Catalog: wicstore`;
}
