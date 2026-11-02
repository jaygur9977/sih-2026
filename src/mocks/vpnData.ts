import type { VPNConnection, VPNStatus } from '../types/vpn';

export const mockVPNStatus: VPNStatus = {
  daemonStatus: 'active',
  daemonVersion: 'strongSwan 5.9.14 (Linux 6.6.x86_64, charon daemon)',
  uptimeSeconds: 14280,
  activeTunnels: 1,
  totalTunnels: 1,
  ikeSaCount: 1,
  childSaCount: 1,
  totalIngressBytes: 428912400, // ~409 MB
  totalEgressBytes: 812492100,  // ~774 MB
  totalPackets: 981240,
  lastStateChange: '2026-09-08 19:02:14 UTC',
  labContainersOnline: 4,
  totalLabContainers: 4,
};

export const mockVPNConnections: VPNConnection[] = [
  {
    id: 'conn-lab-tunnel-1',
    name: 'lab-tunnel: net-net',
    localGateway: '10.10.0.10 (vpn-client)',
    remoteGateway: '10.10.0.20 (vpn-server)',
    localSubnet: '10.10.0.10/32',
    remoteSubnet: '10.10.0.20/32',
    status: 'ESTABLISHED',
    ikeVersion: 'IKEv2',
    ikeProposal: 'AES256-SHA256-MODP2048', // Exact working default
    espProposal: 'AES256-GCM16',          // Exact working default
    authMethod: 'PSK',
    spiIn: '0xc8a12f9b',
    spiOut: '0x43d08e1a',
    bytesIn: 428912400,
    bytesOut: 812492100,
    packetsIn: 341200,
    packetsOut: 640040,
    establishedAt: '2026-09-08 19:02:14 UTC',
    rekeyInSeconds: 2840,
    dpdActive: true,
  },
];

export const mockCharonStatusAllRaw = `Status of IKE charon daemon (strongSwan 5.9.14, Linux 6.6.x86_64, x86_64):
  uptime: 3 hours, since Sep 08 19:00:22 2026
  malloc: sbrk 2928640, mmap 0, used 745312, free 2183328
  worker threads: 11 of 16 idle, 5/0/0/0 working, job queue: 0/0/0/0, scheduled: 2
  loaded plugins: charon aes des rc2 sha2 sha1 md5 mgf1 random nonce x509 revocation constraints pubkey pkcs1 pkcs7 pkcs8 pkcs12 pgp dnskey sshkey pem openssl fips-prf gmp curve25519 xcbc cmac hmac gcm drbg attr kernel-netlink resolve socket-default stroke vici updown eap-identity eap-md5 eap-mschapv2 eap-tls eap-ttls xauth-generic

Listening IP addresses:
  10.10.0.10
  fd00:10:10::10

Connections:
  lab-tunnel:  10.10.0.10...10.10.0.20  IKEv2, dpddelay=30s
  lab-tunnel:   local:  [10.10.0.10] uses pre-shared key authentication
  lab-tunnel:   remote: [10.10.0.20] uses pre-shared key authentication
  lab-tunnel:   child:  10.10.0.10/32 === 10.10.0.20/32 TUNNEL, dpdaction=restart

Security Associations (1 up, 0 connecting):
  lab-tunnel[1]: ESTABLISHED 3 hours ago, 10.10.0.10[10.10.0.10]...10.10.0.20[10.10.0.20]
  lab-tunnel[1]: IKEv2 SPIs: 7a82b94f1c900e21_i* eb9241fc9048a132_r, pre-shared key reauthentication in 52 minutes
  lab-tunnel[1]: IKE proposal: AES_CBC_256/HMAC_SHA2_256_128/PRF_HMAC_SHA2_256/MODP_2048
  lab-tunnel{1}:  INSTALLED, TUNNEL, reqid 1, ESP in UDP SPIs: c8a12f9b_i 43d08e1a_o
  lab-tunnel{1}:  AES_GCM_16_256, 428912400 bytes_i (341200 pkts, 0s ago), 812492100 bytes_o (640040 pkts, 0s ago), rekeying in 47 minutes
  lab-tunnel{1}:   10.10.0.10/32 === 10.10.0.20/32`;
