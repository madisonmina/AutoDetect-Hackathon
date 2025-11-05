import React, { useEffect, useState } from 'react';

type Stats = { label: string; count: number };

function loadHistory(): Stats[] {
	try {
		const raw = localStorage.getItem('qa_history');
		if (!raw) return [];
		return JSON.parse(raw) as Stats[];
	} catch { return []; }
}

export default function Dashboard() {
	const [history, setHistory] = useState<Stats[]>(() => loadHistory());
	const [modelVersion, setModelVersion] = useState(() => localStorage.getItem('model_version') ?? 'v1');
	const [isRetraining, setRetraining] = useState(false);

	useEffect(() => {
		localStorage.setItem('qa_history', JSON.stringify(history));
	}, [history]);

	function simulateRetrain() {
		setRetraining(true);
		setTimeout(() => {
			const next = `v${Number(modelVersion.replace(/^v/, '')) + 1}`;
			setModelVersion(next);
			localStorage.setItem('model_version', next);
			setRetraining(false);
		}, 1200);
	}

	return (
		<section className="page">
			<h1>Dashboard</h1>
			<p>Overview, metrics, and quick actions will appear here.</p>

			<div className="card-row">
				<div className="card">Total Predictions: <strong>{history.reduce((s, x) => s + x.count, 0)}</strong></div>
				<div className="card">Distinct Labels: <strong>{history.length}</strong></div>
				<div className="card">Model: <strong>{modelVersion}</strong></div>
			</div>

			<div style={{ marginTop: 18 }}>
				<h3>Defect trend (recent labels)</h3>
				{history.length === 0 && <p className="muted">No labeled data yet — upload images and confirm/correct predictions to populate trends.</p>}
				<div className="trend-chart">
					{history.map((h) => (
						<div key={h.label} className="trend-row">
							<div className="trend-label">{h.label}</div>
							<div className="trend-bar" style={{ width: `${Math.min(100, h.count)}%` }}>{h.count}</div>
						</div>
					))}
				</div>

				<div style={{ marginTop: 12 }}>
					<button className="btn" onClick={simulateRetrain} disabled={isRetraining}>{isRetraining ? 'Retraining…' : 'Retrain model (simulate)'}</button>
					<small style={{ marginLeft: 12, color: 'var(--muted)' }}>Retraining will simulate a new version and persist to localStorage.</small>
				</div>
			</div>
		</section>
	);
}

