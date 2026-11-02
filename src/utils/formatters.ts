export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatBitrate(bps: number, decimals: number = 2): string {
  if (bps === 0) return '0 bps';
  const k = 1000;
  const sizes = ['bps', 'Kbps', 'Mbps', 'Gbps'];
  const i = Math.floor(Math.log(bps) / Math.log(k));
  return `${parseFloat((bps / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function formatHexSpi(spi: string | number): string {
  if (typeof spi === 'number') {
    return '0x' + spi.toString(16).padStart(8, '0');
  }
  if (!spi.startsWith('0x')) {
    return '0x' + spi;
  }
  return spi;
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
