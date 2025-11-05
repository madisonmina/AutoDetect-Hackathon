import React, { useRef } from 'react';

type Pred = {
  id: string;
  src: string;
  predicted: string;
  confidence: number;
  corrected?: string;
  timestamp: number;
};

const DEFECTS = ['No Defect', 'Scratch', 'Crack', 'Discoloration', 'Misalignment'];

function randomPrediction() {
  const idx = Math.floor(Math.random() * DEFECTS.length);
  return DEFECTS[idx];
}

function asDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({ onAdd }: { onAdd: (p: Pred) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const src = await asDataUrl(f);
      const predicted = randomPrediction();
      const confidence = Math.round((0.6 + Math.random() * 0.4) * 100);
      const p = {
        id: `${Date.now()}-${i}`,
        src,
        predicted,
        confidence,
        timestamp: Date.now(),
      } as Pred;
      onAdd(p);
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="uploader">
      <label className="uploader-label">
        Upload product images
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} />
      </label>
      <p className="uploader-help">Drop or select images and see instant AI predictions (simulated).</p>
    </div>
  );
}
