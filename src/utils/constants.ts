import type { LabNode, VPNConfiguration } from '../types/vpn';

export const APP_NAME = "AEGIS-IPsec // CyberSec Traffic Intelligence";

// Actual Docker lab network nodes per environment specification
export const DEFAULT_LAB_NODES: LabNode[] = [
  {
    id: 'node-client',
    name: 'vpn-client',
    role: 'client',
    ipv4: '10.10.0.10',
    ipv6: 'fd00:10:10::10',
    containerState: 'running',
    uptimeSeconds: 14280,
    cpuPercent: 1.4,
    memoryUsageMb: 42.5,
  },
  {
    id: 'node-server',
    name: 'vpn-server',
    role: 'server',
    ipv4: '10.10.0.20',
    ipv6: 'fd00:10:10::20',
    containerState: 'running',
    uptimeSeconds: 14280,
    cpuPercent: 2.1,
    memoryUsageMb: 48.2,
  },
  {
    id: 'node-traffic-gen',
    name: 'traffic-generator',
    role: 'generator',
    ipv4: '10.10.0.30',
    ipv6: 'fd00:10:10::30',
    containerState: 'running',
    uptimeSeconds: 9340,
    cpuPercent: 6.8,
    memoryUsageMb: 64.0,
  },
  {
    id: 'node-tap',
    name: 'passive-tap (PCAP Sensor)',
    role: 'tap',
    ipv4: '10.10.0.254',
    ipv6: 'fd00:10:10::fe',
    containerState: 'running',
    uptimeSeconds: 14280,
    cpuPercent: 3.5,
    memoryUsageMb: 92.1,
    isOptionalMonitor: true, // Conceptual/demo passive monitoring node only
  },
];

// Preserved working configuration
export const WORKING_VPN_CONFIGURATION: VPNConfiguration = {
  id: 'cfg-active-default',
  name: 'strongswan-working-lab',
  description: 'Production-validated IKEv2 site-to-site IPsec tunnel between vpn-client and vpn-server',
  isActive: true,
  version: 'IKEv2',
  authType: 'PSK',
  preSharedKey: 'LabSecret_SecureKey2026!#StrongSwan',
  ikeProposal: 'AES256-SHA256-MODP2048',
  espProposal: 'AES256-GCM16',
  availableIkeProposals: [
    'AES256-SHA256-MODP2048', // Default working
    'AES256-SHA384-ECP384',
    'CHACHA20_POLY1305-SHA256-CURVE25519',
    'AES128-SHA256-MODP2048',
  ],
  availableEspProposals: [
    'AES256-GCM16',          // Default working
    'CHACHA20_POLY1305',
    'AES256-SHA256',
    'AES128-GCM16',
  ],
  localTrafficSelector: '10.10.0.10/32',
  remoteTrafficSelector: '10.10.0.20/32',
  rawConfig: `# /etc/swanctl/conf.d/ipsec-lab.conf
# StrongSwan 5.9 Swanctl Configuration - Working Docker Lab

connections {
   lab-tunnel {
      version = 2
      local_addrs  = 10.10.0.10
      remote_addrs = 10.10.0.20

      local {
         auth = psk
         id = 10.10.0.10
      }
      remote {
         auth = psk
         id = 10.10.0.20
      }

      children {
         net-net {
            local_ts  = 10.10.0.10/32
            remote_ts = 10.10.0.20/32
            esp_proposals = aes256gcm16
            dpd_action = restart
            mode = tunnel
         }
      }

      proposals = aes256-sha256-modp2048
   }
}

secrets {
   ike-lab {
      secret = "LabSecret_SecureKey2026!#StrongSwan"
   }
}
`,
  lastUpdated: '2026-09-08 21:45:00 UTC',
};
