import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy } from "lucide-react";

/** Public address of the portfolio (Netlify). */
const PORTFOLIO_URL = "https://ilma-muskan.netlify.app";

/** QR code + copyable link pointing at the portfolio's public address. */
export default function ShareQR({ size = 132, compact = false }: { size?: number; compact?: boolean }) {
  const url = PORTFOLIO_URL;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      data-testid={compact ? "footer-qr" : "share-qr-card"}
      className="flex flex-col items-center gap-4 sm:flex-row sm:items-center"
    >
      <div className="rounded-2xl border border-line bg-white p-3 shadow-soft">
        <QRCodeSVG
          data-testid={compact ? "footer-qr-code" : "share-qr-code"}
          value={url}
          size={size}
          fgColor="#3D2413"
          bgColor="#FFFFFF"
          level="M"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-heading text-lg font-bold text-cocoa">Scan to open this portfolio</p>
        <p className="mt-1 text-sm text-muted-ink">Point any phone camera at the code to view it online.</p>
        <p data-testid={compact ? "footer-qr-url" : "share-qr-url"} className="mt-2 break-all text-sm font-semibold text-amber-deep">
          {url}
        </p>
        {!compact && (
          <button
            data-testid="share-copy-link-button"
            onClick={copy}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-cocoa transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-cocoa print:hidden"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Link copied" : "Copy link"}
          </button>
        )}
      </div>
    </div>
  );
}
