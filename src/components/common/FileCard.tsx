import React from 'react';
import { Download, FileCode, Play } from 'lucide-react';
import type { PCAPFile } from '../../types/packet';
import { formatBytes } from '../../utils/formatters';

interface FileCardProps {
  file: PCAPFile;
  onAnalyze?: (file: PCAPFile) => void;
  onDownload?: (file: PCAPFile) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onAnalyze, onDownload }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 border border-blue-100">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-800 truncate max-w-[200px]" title={file.filename}>
                {file.filename}
              </h4>
              <p className="text-[11px] text-slate-500">{file.capturedAt}</p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            {file.interfaceName}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">File Size</span>
            <span className="text-slate-800 font-semibold">{formatBytes(file.sizeBytes)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Packets</span>
            <span className="text-slate-800 font-semibold">{file.packetCount.toLocaleString()} pkts</span>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Filter</span>
            <span className="text-slate-600 text-[11px] truncate block font-mono" title={file.filterUsed}>
              {file.filterUsed}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100">
        {onAnalyze && (
          <button
            onClick={() => onAnalyze(file)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-colors shadow-sm"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Analyze PCAP
          </button>
        )}
        {onDownload && (
          <button
            onClick={() => onDownload(file)}
            title="Download PCAP file"
            className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
