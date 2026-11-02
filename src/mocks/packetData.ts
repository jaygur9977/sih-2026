import type { CaptureStatus, Packet, PCAPFile } from '../types/packet';

export const mockCaptureStatus: CaptureStatus = {
  isCapturing: true,
  activeInterface: 'eth0 (Bridge vpn-net)',
  activeFilter: 'esp or udp port 500 or udp port 4500',
  capturedPacketsCount: 14820,
  capturedBytes: 18450120,
  bufferUsagePercent: 32,
  startedAt: '2026-09-08 22:10:00 UTC',
};

export const mockPCAPFiles: PCAPFile[] = [
  {
    id: 'pcap-001',
    filename: 'lab_ipsec_traffic_run1.pcap',
    sizeBytes: 18450120,
    packetCount: 14820,
    capturedAt: '2026-09-08 22:15:30 UTC',
    durationSeconds: 330,
    interfaceName: 'eth0',
    filterUsed: 'esp or udp port 500 or udp port 4500',
    status: 'READY',
  },
  {
    id: 'pcap-002',
    filename: 'ikev2_sa_negotiation_full.pcap',
    sizeBytes: 245080,
    packetCount: 420,
    capturedAt: '2026-09-08 19:02:15 UTC',
    durationSeconds: 15,
    interfaceName: 'eth0',
    filterUsed: 'udp port 500 or udp port 4500',
    status: 'READY',
  },
  {
    id: 'pcap-003',
    filename: 'voip_g711_encrypted_stream.pcap',
    sizeBytes: 6810200,
    packetCount: 9500,
    capturedAt: '2026-09-08 21:45:00 UTC',
    durationSeconds: 190,
    interfaceName: 'xfrm0',
    filterUsed: 'proto 50',
    status: 'READY',
  },
];

export const mockPackets: Packet[] = [
  {
    id: 'pkt-1001',
    frameNumber: 1,
    timestamp: '22:15:01.004120',
    relativeTime: 0.00412,
    sourceIp: '10.10.0.10',
    destinationIp: '10.10.0.20',
    protocol: 'ESP',
    length: 1442,
    spi: '0xc8a12f9b',
    sequenceNumber: 1042,
    info: 'ESP (SPI=0xc8a12f9b, Seq=1042) [Encrypted payload: AES-256-GCM, ICV=16B]',
    isEncryptedPayload: true,
    rawHexDump: `0000   02 42 0a 0a 00 14 02 42 0a 0a 00 0a 08 00 45 00   .B.....B......E.
0010   05 a2 b1 c8 40 00 40 32 c4 21 0a 0a 00 0a 0a 0a   ....@.@2.!......
0020   00 14 c8 a1 2f 9b 00 00 04 12 7b 88 d9 41 90 e4   ..../.....{..A..
0030   33 a1 e7 4b 01 99 2f c0 a4 dd 91 82 73 64 55 12   3..K../.....sdU.
0040   a3 b2 c1 d4 e5 f6 07 18 29 3a 4b 5c 6d 7e 8f 90   ........):K\\m~..
0050   11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff 00   ."3DUfw.........
0060   ea 44 91 b2 c0 11 af 32 de 81 7a 90 f4 33 21 00   .D.....2..z..3!.
0070   9c 31 e2 a7 fb 82 10 49 a2 7b cd 08 19 28 37 46   .1.....I.{...(7F`,
    layers: [
      {
        layerName: 'Frame 1: 1442 bytes on wire (11536 bits)',
        summary: 'Arrival Time: Sep 8, 2026 22:15:01.004120 UTC, Frame Length: 1442 bytes',
        fields: [
          { name: 'Interface id', value: '0 (eth0)' },
          { name: 'Encapsulation type', value: 'Ethernet (1)' },
          { name: 'Arrival Time', value: '2026-09-08 22:15:01.004120' },
          { name: 'Frame Number', value: 1 },
          { name: 'Frame Length', value: '1442 bytes' },
        ],
      },
      {
        layerName: 'Ethernet II, Src: vpn-client (02:42:0a:0a:00:0a), Dst: vpn-server (02:42:0a:0a:00:14)',
        summary: 'Destination: 02:42:0a:0a:00:14, Source: 02:42:0a:0a:00:0a, Type: IPv4 (0x0800)',
        fields: [
          { name: 'Destination MAC', value: '02:42:0a:0a:00:14' },
          { name: 'Source MAC', value: '02:42:0a:0a:00:0a' },
          { name: 'Type', value: 'IPv4 (0x0800)' },
        ],
      },
      {
        layerName: 'Internet Protocol Version 4, Src: 10.10.0.10, Dst: 10.10.0.20',
        summary: 'IPv4 Header: 20 bytes, Protocol: ESP (50), Header Checksum: 0xc421',
        fields: [
          { name: 'Version', value: 4 },
          { name: 'Header Length', value: '20 bytes (5)' },
          { name: 'Total Length', value: 1428 },
          { name: 'Identification', value: '0xb1c8 (45512)' },
          { name: 'Time to Live (TTL)', value: 64 },
          { name: 'Protocol', value: 'ESP (50)' },
          { name: 'Source Address', value: '10.10.0.10' },
          { name: 'Destination Address', value: '10.10.0.20' },
        ],
      },
      {
        layerName: 'Encapsulating Security Payload (ESP)',
        summary: 'ESP SPI: 0xc8a12f9b (3365973915), Seq: 1042',
        fields: [
          { name: 'Security Parameters Index (SPI)', value: '0xc8a12f9b' },
          { name: 'Sequence Number', value: 1042 },
          { name: 'Initialization Vector (IV)', value: '7b88d94190e433a1 (8 bytes salt/counter)' },
          { name: 'Encrypted Payload', value: '1378 bytes [AES-GCM-256 Ciphertext]' },
          { name: 'Authentication Data (ICV)', value: '9c31e2a7fb821049a27bcd0819283746 (16 bytes)' },
        ],
      },
    ],
  },
  {
    id: 'pkt-1002',
    frameNumber: 2,
    timestamp: '22:15:01.005310',
    relativeTime: 0.00531,
    sourceIp: '10.10.0.20',
    destinationIp: '10.10.0.10',
    protocol: 'ESP',
    length: 128,
    spi: '0x43d08e1a',
    sequenceNumber: 814,
    info: 'ESP (SPI=0x43d08e1a, Seq=814) [Encrypted TCP ACK inside ESP]',
    isEncryptedPayload: true,
    rawHexDump: `0000   02 42 0a 0a 00 0a 02 42 0a 0a 00 14 08 00 45 00   .B.....B......E.
0010   00 70 a0 14 40 00 40 32 b2 88 0a 0a 00 14 0a 0a   .p..@.@2........
0020   00 0a 43 d0 8e 1a 00 00 03 2e a1 f9 83 20 1b 4c   ..C.......... .L
0030   44 19 8c e2 00 14 8f 31 cc 9a 10 22 34 56 78 9a   D......1..."4Vx.
0040   bc de f0 12 34 56 78 9a 01 02 03 04 06 00 00 00   ....4Vx.........
0050   3d 91 fa 22 18 c0 9a eb 41 82 73 90 fa 12 34 56   =.."....A.s...4V`,
    layers: [
      {
        layerName: 'Frame 2: 128 bytes on wire',
        summary: 'Arrival Time: Sep 8, 2026 22:15:01.005310 UTC, Length: 128 bytes',
        fields: [
          { name: 'Frame Number', value: 2 },
          { name: 'Frame Length', value: '128 bytes' },
        ],
      },
      {
        layerName: 'Internet Protocol Version 4, Src: 10.10.0.20, Dst: 10.10.0.10',
        summary: 'Protocol: ESP (50)',
        fields: [
          { name: 'Protocol', value: 'ESP (50)' },
          { name: 'Source Address', value: '10.10.0.20' },
          { name: 'Destination Address', value: '10.10.0.10' },
        ],
      },
      {
        layerName: 'Encapsulating Security Payload (ESP)',
        summary: 'ESP SPI: 0x43d08e1a, Seq: 814',
        fields: [
          { name: 'SPI', value: '0x43d08e1a' },
          { name: 'Sequence Number', value: 814 },
          { name: 'Payload Status', value: 'Encrypted (AES-GCM-16)' },
        ],
      },
    ],
  },
  {
    id: 'pkt-1003',
    frameNumber: 3,
    timestamp: '22:15:01.008920',
    relativeTime: 0.00892,
    sourceIp: '10.10.0.10',
    destinationIp: '10.10.0.20',
    protocol: 'IKEv2',
    length: 480,
    ikeExchangeType: 'IKE_AUTH',
    ikeMessageId: 1,
    info: 'IKEv2 IKE_AUTH Response [Encrypted & Authenticated: IDr, AUTH, SA, TSi, TSr]',
    isEncryptedPayload: true,
    rawHexDump: `0000   02 42 0a 0a 00 14 02 42 0a 0a 00 0a 08 00 45 00   .B.....B......E.
0010   01 e0 12 34 40 00 40 11 e4 10 0a 0a 00 0a 0a 0a   ...4@.@.........
0020   00 14 11 94 11 94 01 cc 00 00 7a 82 b9 4f 1c 90   ..........z..O..
0030   0e 21 eb 92 41 fc 90 48 a1 32 2e 20 23 20 00 00   .!..A..H.2. # ..
0040   00 01 00 00 01 b0 24 00 01 a8 81 29 4c 10 9b f2   ......$....)L...`,
    layers: [
      {
        layerName: 'Internet Protocol Version 4, Src: 10.10.0.10, Dst: 10.10.0.20',
        summary: 'Protocol: UDP (17), Src Port: 4500, Dst Port: 4500 (IPsec NAT-Traversal)',
        fields: [
          { name: 'Protocol', value: 'UDP (17)' },
          { name: 'Source Port', value: 4500 },
          { name: 'Destination Port', value: 4500 },
        ],
      },
      {
        layerName: 'Internet Key Exchange Version 2 (IKEv2)',
        summary: 'Exchange: IKE_AUTH (35), Flags: Initiator, Response, Message ID: 1',
        fields: [
          { name: 'Initiator SPI', value: '0x7a82b94f1c900e21' },
          { name: 'Responder SPI', value: '0xeb9241fc9048a132' },
          { name: 'Next Payload', value: 'Encrypted and Authenticated (46)' },
          { name: 'Major Version', value: 2 },
          { name: 'Minor Version', value: 0 },
          { name: 'Exchange Type', value: 'IKE_AUTH (35)' },
          { name: 'Message ID', value: 1 },
          { name: 'Length', value: 432 },
        ],
      },
    ],
  },
  {
    id: 'pkt-1004',
    frameNumber: 4,
    timestamp: '22:15:01.012100',
    relativeTime: 0.01210,
    sourceIp: '10.10.0.10',
    destinationIp: '10.10.0.20',
    protocol: 'ESP',
    length: 1442,
    spi: '0xc8a12f9b',
    sequenceNumber: 1043,
    info: 'ESP (SPI=0xc8a12f9b, Seq=1043) [Encrypted payload: AES-256-GCM, ICV=16B]',
    isEncryptedPayload: true,
    rawHexDump: `0000   02 42 0a 0a 00 14 02 42 0a 0a 00 0a 08 00 45 00   .B.....B......E.
0010   05 a2 b1 c9 40 00 40 32 c4 20 0a 0a 00 0a 0a 0a   ....@.@2. ......
0020   00 14 c8 a1 2f 9b 00 00 04 13 8c 91 a0 42 91 f5   ..../........B..
0030   44 b2 e8 5c 02 aa 3f d1 b5 ee a2 93 84 75 66 23   D..\\..?......uf#`,
    layers: [
      {
        layerName: 'Internet Protocol Version 4, Src: 10.10.0.10, Dst: 10.10.0.20',
        summary: 'Protocol: ESP (50)',
        fields: [
          { name: 'Source Address', value: '10.10.0.10' },
          { name: 'Destination Address', value: '10.10.0.20' },
        ],
      },
      {
        layerName: 'Encapsulating Security Payload (ESP)',
        summary: 'ESP SPI: 0xc8a12f9b, Seq: 1043',
        fields: [
          { name: 'SPI', value: '0xc8a12f9b' },
          { name: 'Sequence Number', value: 1043 },
        ],
      },
    ],
  },
];
