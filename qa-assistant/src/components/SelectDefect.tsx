import React, { useEffect, useMemo, useState } from 'react';
import ImageUploader from './ImageUploader';
import Predictions from './Predictions';
import Filters from './Filters';

type Pred = {
	id: string;
	src: string;
	predicted: string;
	confidence: number;
	corrected?: string;
	timestamp: number;
};

function loadPreds(): Pred[] {
	try { return JSON.parse(localStorage.getItem('qa_preds') || '[]'); } catch { return []; }
}

function savePreds(list: Pred[]) {
	localStorage.setItem('qa_preds', JSON.stringify(list));
}

export default function SelectDefect() {
	const [items, setItems] = useState<Pred[]>(() => loadPreds());
	const [filter, setFilter] = useState<string | 'all'>('all');

	useEffect(() => { savePreds(items); }, [items]);

	function handleAdd(p: Pred) {
		setItems((s) => [p, ...s]);
	}

	function handleConfirm(id: string) {
		// track confirmed as labeled (use predicted if not corrected)
		setItems((s) => s.map((it) => it.id === id ? ({ ...it }) : it));
		// update history counts
		const pred = items.find((x) => x.id === id);
		if (pred) updateHistory(pred.corrected ?? pred.predicted);
	}

	function updateHistory(label: string) {
		const raw = localStorage.getItem('qa_history');
		let h = raw ? JSON.parse(raw) as { label: string; count: number }[] : [];
		const idx = h.findIndex((x) => x.label === label);
		if (idx >= 0) h[idx].count += 1; else h.unshift({ label, count: 1 });
		localStorage.setItem('qa_history', JSON.stringify(h));
	}

	function handleCorrect(id: string, label: string) {
		setItems((s) => s.map((it) => it.id === id ? ({ ...it, corrected: label }) : it));
		updateHistory(label);
	}

	const labels = useMemo(() => {
		const set = new Set<string>();
		items.forEach((it) => { set.add(it.predicted); if (it.corrected) set.add(it.corrected); });
		return Array.from(set);
	}, [items]);

	const visible = items.filter((it) => filter === 'all' ? true : (it.corrected ?? it.predicted) === filter);

	return (
		<section className="page">
			<h1>Select Defect</h1>
			<p>Upload images and confirm or correct AI predictions to improve results.</p>

			<ImageUploader onAdd={handleAdd} />

			<div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
				<Filters labels={labels} selected={filter} onChange={(s) => setFilter(s)} />
				<div style={{ marginLeft: 'auto', color: 'var(--muted)' }}>Stored items: {items.length}</div>
			</div>

			<Predictions items={visible} onConfirm={handleConfirm} onCorrect={handleCorrect} />
		</section>
	);
}
