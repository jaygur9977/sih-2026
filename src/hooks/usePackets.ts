import { useCallback, useEffect, useState } from 'react';
import { packetService } from '../services/packetService';
import type { CaptureStatus, Packet, PCAPFile } from '../types/packet';

export function usePackets(selectedPcapId?: string) {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [pcapFiles, setPcapFiles] = useState<PCAPFile[]>([]);
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [pkts, files, cap] = await Promise.all([
        packetService.getPackets(selectedPcapId),
        packetService.getPCAPFiles(),
        packetService.getCaptureStatus(),
      ]);
      setPackets(pkts);
      setPcapFiles(files);
      setCaptureStatus(cap);
      if (pkts.length > 0 && !selectedPacket) {
        setSelectedPacket(pkts[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load packet data');
    } finally {
      setLoading(false);
    }
  }, [selectedPcapId, selectedPacket]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const startCapture = async (interfaceName: string, filter: string) => {
    const res = await packetService.startCapture(interfaceName, filter);
    setCaptureStatus(res);
    return res;
  };

  const stopCapture = async () => {
    const res = await packetService.stopCapture();
    setCaptureStatus(res);
    await fetchData();
    return res;
  };

  return {
    packets,
    pcapFiles,
    captureStatus,
    selectedPacket,
    setSelectedPacket,
    loading,
    error,
    refresh: fetchData,
    startCapture,
    stopCapture,
  };
}
