import React from 'react';

export default function Filters({
  labels,
  selected,
  onChange,
}: {
  labels: string[];
  selected: string | 'all';
  onChange: (s: string | 'all') => void;
}) {
  return (
    <div className="filters">
      <label className="filters-label">Filter by label:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value as any)}>
        <option value="all">All</option>
        {labels.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  );
}
