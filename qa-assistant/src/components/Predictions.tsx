import React from 'react';

type Pred = {
  id: string;
  src: string;
  predicted: string;
  confidence: number;
  corrected?: string;
  timestamp: number;
};

export default function Predictions({
  items,
  onConfirm,
  onCorrect,
}: {
  items: Pred[];
  onConfirm: (id: string) => void;
  onCorrect: (id: string, correctLabel: string) => void;
}) {
  return (
    <div className="predictions">
      {items.length === 0 && <p className="muted">No predictions yet. Upload images to get started.</p>}
      <div className="pred-grid">
        {items.map((it) => (
          <div className="pred-card" key={it.id}>
            <img src={it.src} alt={`preview-${it.id}`} />
            <div className="pred-meta">
              <div className="pred-row">
                <strong className="pred-label">{it.corrected ?? it.predicted}</strong>
                <span className="pred-confidence">{it.confidence}%</span>
              </div>
              <div className="pred-actions">
                <button className="btn" onClick={() => onConfirm(it.id)}>Confirm</button>
                <button className="btn ghost" onClick={() => {
                  const newLabel = prompt('Enter correct label for this image', it.predicted);
                  if (newLabel) onCorrect(it.id, newLabel);
                }}>Correct</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
