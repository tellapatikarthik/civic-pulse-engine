import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { importCsvRows } from "@/lib/demo-data";

export const Route = createFileRoute("/data")({
  component: DataPage,
});

function DataPage() {
  const [report, setReport] = useState<ReturnType<typeof importCsvRows> | null>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const rows: Record<string, string>[] = text
      .split(/\r?\n/)
      .filter(Boolean)
      .slice(1)
      .map((line) => {
        const [id, region, category, value] = line.split(",");
        return {
          id: id ?? "",
          region: region ?? "",
          category: category ?? "",
          value: value ?? "",
        };
      });

    const imported = importCsvRows(rows);
    setReport(imported);
  };

  return (
    <AppShell>
      <main className="page-wrap">
        <div className="page-heading">
          <div>
            <div className="eyebrow">Admin / Data</div>
            <h1 className="title">CSV ingestion</h1>
          </div>
        </div>

        <div className="section-panel">
          <div className="panel-head">
            <div>
              <div className="eyebrow">Import data</div>
              <h3 className="panel-title">Citizen requests, demographics, infrastructure, facilities and investment plans</h3>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <input type="file" accept=".csv" onChange={handleFile} />
            <div className="citizen-actions" style={{ marginTop: 14 }}>
              <button className="secondary-button" type="button">Download sample CSV</button>
            </div>
          </div>
        </div>

        {report && (
          <div className="section-panel" style={{ marginTop: 22 }}>
            <div className="panel-head">
              <div>
                <div className="eyebrow">Upload summary</div>
                <h3 className="panel-title">Validation result</h3>
              </div>
            </div>
            <div style={{ padding: 20, display: "grid", gap: 12 }}>
              <div><strong>File uploaded:</strong> {report.fileUploaded}</div>
              <div><strong>Rows detected:</strong> {report.rowsDetected}</div>
              <div><strong>Columns detected:</strong> {report.columnsDetected}</div>
              <div><strong>Validation:</strong> {report.validation}</div>
              <div><strong>Records imported:</strong> {report.recordsImported}</div>
              <div><strong>Errors:</strong> {report.errors}</div>
              <div><strong>Summary:</strong> {report.summary}</div>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}
