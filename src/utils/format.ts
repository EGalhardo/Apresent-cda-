export function formatAOA(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B AOA`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M AOA`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K AOA`;
    return `${value.toLocaleString('pt-AO')} AOA`;
  }
  return `${value.toLocaleString('pt-AO')} AOA`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '—';
  const [y, m, d] = dateString.split('-');
  return `${d}/${m}/${y}`;
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}

export function getMonthLabel(dateString: string): string {
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const d = new Date(dateString);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
