import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  ComposedChart,
  ReferenceLine,
  ReferenceArea,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  Eye,
  Activity,
  Globe,
  Box,
  DollarSign,
  Leaf,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Menu,
  CloudLightning,
  Smartphone,
  TrendingUp,
  BarChart2,
  Anchor,
  Ship,
  Zap,
  Target,
  ShieldAlert,
  MapPin,
  Truck,
  Droplet,
  PackageCheck,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  PieChart as PieIcon,
  TreeDeciduous,
  Wind,
  Store,
  ShoppingCart,
  Layers,
  Coins,
  TrendingDown,
  Factory,
  Plane,
  Award,
  Navigation,
  Fuel,
  Recycle,
  Map as MapIcon,
  FlaskConical,
} from 'lucide-react';

// --- DATA OPERASIONAL (Mock Data) ---

// 1. Demand Sensing Data
const demandData = [
  {
    week: 'M1',
    plan: 100,
    reality: 101,
    ai: null,
    online: 30,
    offline: 71,
    weather: 'Normal',
    sentiment: 'Netral',
    deviation: 1,
  },
  {
    week: 'M2',
    plan: 105,
    reality: 104,
    ai: null,
    online: 32,
    offline: 72,
    weather: 'Normal',
    sentiment: 'Netral',
    deviation: -0.9,
  },
  {
    week: 'M3',
    plan: 102,
    reality: 115,
    ai: null,
    online: 40,
    offline: 75,
    weather: 'Hangat',
    sentiment: 'Positif',
    deviation: 12.7,
  },
  {
    week: 'M4',
    plan: 108,
    reality: 120,
    ai: null,
    online: 45,
    offline: 75,
    weather: 'Panas',
    sentiment: 'Trending',
    deviation: 11.1,
  },
  {
    week: 'M5 (Skrg)',
    plan: 110,
    reality: 135,
    ai: 135,
    online: 55,
    offline: 80,
    weather: 'Heatwave',
    sentiment: '#RambutBadai Viral',
    deviation: 22.7,
  },
  {
    week: 'M6',
    plan: 112,
    reality: null,
    ai: 155,
    online: 65,
    offline: 90,
    weather: 'Panas',
    sentiment: 'Tinggi',
    deviation: 38.4,
  },
  {
    week: 'M7',
    plan: 115,
    reality: null,
    ai: 165,
    online: 70,
    offline: 95,
    weather: 'Normal',
    sentiment: 'Normal',
    deviation: 43.5,
  },
];

const dcLocations = [
  {
    id: 'DC-JKT',
    name: 'Jakarta DC',
    x: 200,
    y: 150,
    demand: 45000,
    status: 'Normal',
    color: '#22c55e',
  },
  {
    id: 'DC-SBY',
    name: 'Surabaya DC',
    x: 450,
    y: 200,
    demand: 68000,
    status: 'Surge',
    color: '#a855f7',
  },
  {
    id: 'DC-MDN',
    name: 'Medan DC',
    x: 80,
    y: 50,
    demand: 22000,
    status: 'Normal',
    color: '#22c55e',
  },
  {
    id: 'DC-MKS',
    name: 'Makassar DC',
    x: 600,
    y: 120,
    demand: 18000,
    status: 'Warning',
    color: '#eab308',
  },
];

// 2. Procurement Status
const procurementStatus = [
  {
    id: 'PO-TH-2501',
    material: 'Dimethicone (Silikon)',
    supplier: 'Dow Chemical (Thailand)',
    qty: '50 Ton',
    eta: '3 Hari',
    status: 'Sailing',
    risk: 'Low',
    compliance: 'ATIGA Verified',
    route: 'Laem Chabang -> Tj. Priok',
  },
  {
    id: 'PO-MY-2505',
    material: 'SLES (Surfactant)',
    supplier: 'KLK Oleo (Malaysia)',
    qty: '120 Ton',
    eta: '2 Hari',
    status: 'Customs Clearance',
    risk: 'Low',
    compliance: 'Halal / MSPO',
    route: 'Port Klang -> Tj. Priok',
  },
  {
    id: 'PO-AU-2504',
    material: 'Sweet Almond Oil',
    supplier: 'Select Harvests (Australia)',
    qty: '12 Ton',
    eta: '6 Hari',
    status: 'Loading',
    risk: 'Medium',
    compliance: 'IA-CEPA Verified',
    route: 'Melbourne -> Tj. Priok',
  },
  {
    id: 'PO-ID-2510',
    material: 'Mineral Oil Grade A',
    supplier: 'Pertamina (Cilacap)',
    qty: '80 Ton',
    eta: '4 Jam',
    status: 'Trucking',
    risk: 'Low',
    compliance: 'SNI / Halal',
    route: 'Cilacap -> Cikarang',
  },
  {
    id: 'PO-ID-2515',
    material: 'rPET Resin (Bottle)',
    supplier: 'Veolia (Pasuruan)',
    qty: '200 Ton',
    eta: '1 Hari',
    status: 'In Production',
    risk: 'Low',
    compliance: 'Recycled Cert.',
    route: 'Pasuruan -> Cikarang',
  },
  {
    id: 'PO-ID-2512',
    material: 'Patchouli Oil (Atsiri)',
    supplier: 'Koperasi Aceh (ARC)',
    qty: '500 Kg',
    eta: '1 Hari',
    status: 'Consolidation',
    risk: 'Low',
    compliance: 'Traceability QR',
    route: 'Banda Aceh -> Cikarang',
  },
];

// 3. Cost Prediction Trends
const costTrendData = [
  { month: 'Jan', oilPrice: 75, costIndex: 100, prediction: null },
  { month: 'Feb', oilPrice: 78, costIndex: 102, prediction: null },
  { month: 'Mar', oilPrice: 82, costIndex: 105, prediction: null },
  { month: 'Apr (FC)', oilPrice: 88, costIndex: null, prediction: 112 },
  { month: 'May (FC)', oilPrice: 92, costIndex: null, prediction: 118 },
  { month: 'Jun (FC)', oilPrice: 90, costIndex: null, prediction: 115 },
];

// 4. Stacked Inventory Levels
const stackedInventoryData = [
  { name: 'RM', safe: 3000, excess: 500, risk: 0 },
  { name: 'WIP', safe: 2500, excess: 200, risk: 0 },
  { name: 'FG', safe: 4500, excess: 1000, risk: 0 },
  { name: 'Dist', safe: 2000, excess: 0, risk: 1500 },
  { name: 'Toko', safe: 800, excess: 0, risk: 1200 },
];

// 5. Sustainability Data
const liveEmissionTracking = [
  {
    id: 'TRK-001',
    route: 'Thailand -> ID',
    material: 'Silikon',
    distance: 2300,
    mode: 'Laut (Efisien)',
    load: 50,
    emission: 1150,
    efficiency: 'High',
    savingSource: 'Rute Optimal (ASEAN Shield)',
  },
  {
    id: 'TRK-002',
    route: 'Lokal (Cilacap)',
    material: 'Mineral Oil',
    distance: 400,
    mode: 'Darat (Efisien)',
    load: 80,
    emission: 1920,
    efficiency: 'High',
    savingSource: 'Eliminasi Impor Jauh',
  },
];

const emissionReductionSource = [
  { name: 'Optimasi Rute', value: 65, fill: '#22c55e' },
  { name: 'Demand Sensing', value: 25, fill: '#3b82f6' },
  { name: 'Smart Inventory', value: 10, fill: '#eab308' },
];

// 6. Financial Projection
const financialProjection = [
  { month: 'Jan', revenue: 734, cost: 600, profit: 134 },
  { month: 'Feb', revenue: 750, cost: 580, profit: 170 },
  { month: 'Mar (Proj)', revenue: 780, cost: 550, profit: 230 },
  { month: 'Apr (Proj)', revenue: 810, cost: 540, profit: 270 },
];

// 7. Finance Metrics
const financeMetrics = [
  {
    metric: 'Biaya Bahan Baku (Raw Mat)',
    value: 'IDR 450M',
    change: '-12%',
    trend: 'down',
    status: 'positive',
    desc: 'Efek Sourcing Lokal & ATIGA',
  },
  {
    metric: 'Biaya Logistik & Distribusi',
    value: 'IDR 120M',
    change: '-18%',
    trend: 'down',
    status: 'positive',
    desc: 'Optimasi Rute & Moda',
  },
  {
    metric: 'Biaya Inventory Carrying',
    value: 'IDR 85M',
    change: '-8%',
    trend: 'down',
    status: 'positive',
    desc: 'Dampak Perputaran Stok Cepat',
  },
  {
    metric: 'Cost-to-Serve (CTS)',
    value: '12%',
    change: '-2.5%',
    trend: 'down',
    status: 'positive',
    desc: '% dari Penjualan Bersih',
  },
  {
    metric: 'Gross Margin (Operasional)',
    value: '38%',
    change: '+3.5%',
    trend: 'up',
    status: 'positive',
    desc: 'Peningkatan Profitabilitas',
  },
];

// 8. Cost Breakdown Data (Pie Chart)
const costBreakdownData = [
  { name: 'Bahan Baku', value: 55, fill: '#3b82f6' },
  { name: 'Produksi', value: 20, fill: '#8b5cf6' },
  { name: 'Logistik', value: 15, fill: '#22c55e' },
  { name: 'Tarif/Pajak', value: 2, fill: '#eab308' },
  { name: 'Lainnya', value: 8, fill: '#64748b' },
];

// --- Komponen UI ---

const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg transition-all hover:border-slate-500 hover:translate-y-[-2px] cursor-pointer overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-900 text-blue-200 border-blue-700',
    purple: 'bg-purple-900 text-purple-200 border-purple-700',
    green: 'bg-green-900 text-green-200 border-green-700',
    red: 'bg-red-900 text-red-200 border-red-700',
    amber: 'bg-amber-900 text-amber-200 border-amber-700',
    slate: 'bg-slate-700 text-slate-200 border-slate-600',
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded border ${
        colors[color] || colors.blue
      }`}
    >
      {children}
    </span>
  );
};

// --- Custom Tooltip ---
const CustomDemandTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-600 p-3 rounded shadow-xl text-xs z-50 min-w-[220px]">
        <p className="font-bold text-white mb-2 border-b border-slate-700 pb-1 flex justify-between">
          <span>{label}</span>
          {data.deviation > 5 && (
            <span className="text-red-400 font-bold animate-pulse">
              !! DEVIA {data.deviation}% !!
            </span>
          )}
        </p>
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Rencana:</span>
            <span className="text-white font-mono">{data.plan}</span>
          </div>
          {data.reality && (
            <div className="flex justify-between gap-4">
              <span className="text-blue-400 font-bold">Realita:</span>
              <span className="text-blue-400 font-mono font-bold">
                {data.reality}
              </span>
            </div>
          )}
          {data.ai && (
            <div className="flex justify-between gap-4 bg-purple-900/20 p-1 rounded -mx-1">
              <span className="text-purple-400 font-bold">Prediksi AI:</span>
              <span className="text-purple-400 font-mono font-bold">
                {data.ai}
              </span>
            </div>
          )}
        </div>
        {data.online && (
          <div className="mb-3 bg-slate-800 p-2 rounded border border-slate-700">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
              <Layers size={10} /> Pemisahan Kanal
            </p>
            <div className="flex justify-between gap-2 text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>{' '}
                Online: {data.online}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>{' '}
                Offline: {data.offline}
              </span>
            </div>
          </div>
        )}
        <div className="pt-2 border-t border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
            Pemicu Eksternal
          </p>
          <div className="flex items-center justify-between mb-1 bg-slate-800 p-1.5 rounded border border-slate-700">
            <div className="flex items-center gap-2">
              <CloudLightning
                size={12}
                className={
                  data.weather === 'Heatwave'
                    ? 'text-amber-500'
                    : 'text-slate-500'
                }
              />
              <span className="text-slate-300">Cuaca</span>
            </div>
            <span
              className={
                data.weather === 'Heatwave'
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-300'
              }
            >
              {data.weather}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-800 p-1.5 rounded border border-slate-700">
            <div className="flex items-center gap-2">
              <Smartphone
                size={12}
                className={
                  data.sentiment.includes('Viral')
                    ? 'text-pink-500'
                    : 'text-slate-500'
                }
              />
              <span className="text-slate-300">Sosial</span>
            </div>
            <span
              className={
                data.sentiment.includes('Viral')
                  ? 'text-pink-400 font-bold'
                  : 'text-slate-300'
              }
            >
              {data.sentiment}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const DistributionMap = () => {
  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 p-2 rounded border border-slate-600">
        <h4 className="text-white font-bold text-sm flex items-center gap-2">
          <MapIcon size={14} className="text-purple-400" /> Peta Panas
          Permintaan Regional
        </h4>
      </div>
      <svg viewBox="0 0 800 400" className="w-full h-full">
        <path
          d="M50,100 L150,50 L200,80 L180,150 Z"
          fill="#1e293b"
          stroke="#334155"
        />{' '}
        {/* Sumatera */}
        <path
          d="M220,180 L450,200 L480,250 L250,240 Z"
          fill="#1e293b"
          stroke="#334155"
        />{' '}
        {/* Jawa */}
        <path
          d="M500,100 L600,80 L580,180 L520,150 Z"
          fill="#1e293b"
          stroke="#334155"
        />{' '}
        {/* Kalimantan */}
        <path
          d="M620,150 L700,120 L720,200 L650,220 Z"
          fill="#1e293b"
          stroke="#334155"
        />{' '}
        {/* Sulawesi */}
        {dcLocations.map((dc) => (
          <g key={dc.id} transform={`translate(${dc.x}, ${dc.y})`}>
            {dc.status === 'Surge' && (
              <circle r="25" fill={dc.color} opacity="0.3">
                <animate
                  attributeName="r"
                  from="10"
                  to="35"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.4"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <circle r="8" fill={dc.color} stroke="white" strokeWidth="2" />
            <rect
              x="-40"
              y="-35"
              width="80"
              height="25"
              rx="4"
              fill="rgba(30, 41, 59, 0.9)"
              stroke={dc.color}
              strokeWidth="1"
            />
            <text
              x="0"
              y="-23"
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="bold"
            >
              {dc.name}
            </text>
            <text
              x="0"
              y="-12"
              textAnchor="middle"
              fill={dc.color}
              fontSize="8"
              fontWeight="bold"
            >
              {dc.status === 'Surge'
                ? 'LONJAKAN!'
                : `${(dc.demand / 1000).toFixed(1)}k Unit`}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 bg-slate-800/95 p-3 rounded border border-slate-600 backdrop-blur-sm shadow-xl">
        <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold">
          Status Permintaan
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] text-slate-300">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-[10px] text-slate-300">Meningkat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-[10px] text-purple-300 font-bold">
              Lonjakan (Surge)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupplyChainMap = () => {
  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
      <div className="absolute top-4 left-4 z-10 bg-slate-900/90 p-2 rounded border border-slate-600">
        <h4 className="text-white font-bold text-sm flex items-center gap-2">
          <Globe size={14} className="text-blue-400" /> Pelacak Arus Material
          (Live)
        </h4>
        <p className="text-[10px] text-slate-400">Update Terakhir: 10:42 WIB</p>
      </div>
      <svg viewBox="0 0 800 400" className="w-full h-full">
        {/* Peta Dasar Sederhana */}
        <path
          d="M300,50 Q400,100 450,80 L480,150 L400,180 Z"
          fill="#1e293b"
          stroke="#334155"
        />
        <path
          d="M420,180 L480,250 L460,280 L400,220 Z"
          fill="#1e293b"
          stroke="#334155"
        />
        <path
          d="M470,260 L650,280 L640,310 L480,290 Z"
          fill="#1e293b"
          stroke="#334155"
        />
        <path
          d="M550,380 Q650,350 750,380 L720,440 L580,440 Z"
          fill="#1e293b"
          stroke="#334155"
        />
        {/* Jalur Logistik */}
        <path
          id="route-thai"
          d="M440,120 Q550,180 580,260"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle r="4" fill="#3b82f6">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M440,120 Q550,180 580,260"
          />
        </circle>
        <path
          id="route-my"
          d="M450,160 Q520,200 580,260"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle r="4" fill="#3b82f6">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M450,160 Q520,200 580,260"
          />
        </circle>
        <path
          id="route-aus"
          d="M650,380 Q620,320 580,260"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle r="4" fill="#f59e0b">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M650,380 Q620,320 580,260"
          />
        </circle>
        <path
          id="route-java"
          d="M520,290 L580,260"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />
        <path
          id="route-eastjava"
          d="M620,280 L580,260"
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />
        <path
          id="route-sumatra"
          d="M420,190 Q480,220 580,260"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
        <circle r="3" fill="#10b981">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M420,190 Q480,220 580,260"
          />
        </circle>
        {/* Nodes */}
        <g transform="translate(440, 120)">
          <circle r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="-10" y="-15" fill="#93c5fd" fontSize="10" fontWeight="bold">
            Dow (Thai)
          </text>
        </g>
        <g transform="translate(450, 160)">
          <circle r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="-10" y="20" fill="#93c5fd" fontSize="10" fontWeight="bold">
            KLK (MY)
          </text>
        </g>
        <g transform="translate(650, 380)">
          <circle r="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="10" y="5" fill="#fcd34d" fontSize="10" fontWeight="bold">
            Melbourne
          </text>
        </g>
        <g transform="translate(520, 290)">
          <circle r="4" fill="#10b981" />
          <text
            x="-5"
            y="15"
            textAnchor="end"
            fill="#86efac"
            fontSize="10"
            fontWeight="bold"
          >
            Cilacap
          </text>
        </g>
        <g transform="translate(620, 280)">
          <circle r="4" fill="#10b981" />
          <text
            x="10"
            y="5"
            textAnchor="start"
            fill="#86efac"
            fontSize="10"
            fontWeight="bold"
          >
            Pasuruan
          </text>
        </g>
        <g transform="translate(420, 190)">
          <circle r="4" fill="#10b981" />
          <text
            x="-5"
            y="-5"
            textAnchor="end"
            fill="#86efac"
            fontSize="10"
            fontWeight="bold"
          >
            Aceh
          </text>
        </g>
        <g transform="translate(580, 260)">
          <circle r="12" fill="#a855f7" stroke="white" strokeWidth="3" />
          <text x="20" y="5" fill="white" fontSize="12" fontWeight="bold">
            DOVE HUB
          </text>
        </g>
      </svg>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-800/95 p-3 rounded border border-slate-600 backdrop-blur-sm shadow-xl w-64">
        <p className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold border-b border-slate-700 pb-1">
          Legenda Peta
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-[10px] text-slate-300">Laut (ASEAN)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-[10px] text-slate-300">Laut (IA-CEPA)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-slate-300">Darat (Lokal)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 border border-white"></div>
            <span className="text-[10px] text-slate-300">Pusat Manufaktur</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Aplikasi Utama ---

export default function DoveEyeApp() {
  const [activeView, setActiveView] = useState('dashboard');
  const [replenishmentStatus, setReplenishmentStatus] = useState('pending');

  const handleReplenish = (e) => {
    e.stopPropagation();
    setReplenishmentStatus('processing');
    setTimeout(() => setReplenishmentStatus('dispatched'), 2000);
  };

  const NavButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveView(id)}
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1
        ${
          activeView === id
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  // --- Halaman ---

  const DashboardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min pb-6">
      {/* Widget 1: Pulse of Demand (Updated) */}
      <Card
        className="col-span-1 md:col-span-2 row-span-1 relative group overflow-hidden cursor-pointer hover:border-purple-500/50"
        onClick={() => setActiveView('demand')}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="text-purple-400" /> Pulse of Demand
            </h3>
            <p className="text-xs text-slate-400">
              Demand Sensing & Sentimen Real-Time
            </p>
          </div>
          <Badge color="purple">Prediksi AI: Aktif</Badge>
        </div>
        <div className="h-48 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={demandData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                hide
              />
              <Tooltip content={<CustomDemandTooltip />} />
              <Line
                type="monotone"
                dataKey="plan"
                stroke="#64748b"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="reality"
                stroke="#ffffff"
                strokeWidth={2}
                dot={{ r: 3, fill: 'white' }}
              />
              <Line
                type="monotone"
                dataKey="ai"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 4, fill: '#a855f7' }}
              />
              <ReferenceArea
                x1="M4"
                x2="M6"
                y1={0}
                y2={200}
                fill="rgba(168, 85, 247, 0.1)"
                strokeOpacity={0}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* Mini Alert Overlay */}
        <div className="absolute top-16 right-4 bg-slate-900/80 p-2 rounded border border-purple-500/30 backdrop-blur-sm text-xs">
          <p className="text-slate-400">Deviasi</p>
          <p className="text-red-400 font-bold">+22% (Jatim)</p>
        </div>
        {/* Takeaway */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-purple-300 font-bold uppercase mb-1 flex items-center gap-1">
            <Zap size={10} /> Takeaway
          </p>
          <p className="text-[10px] text-slate-400">
            Lonjakan permintaan terdeteksi di Jawa Timur akibat tren viral.
            Disarankan replenismen stok segera untuk mencegah lost sales.
          </p>
        </div>
      </Card>

      {/* Widget 2: Supply Network (Ringkas) */}
      <Card
        className="col-span-1 md:col-span-1 row-span-1 cursor-pointer hover:border-blue-500/50"
        onClick={() => setActiveView('supply')}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="text-blue-400" /> Supply Network
          </h3>
          <p className="text-xs text-slate-400 text-right">
            Inbound: <span className="text-white font-bold">6 PO</span>
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-xs items-center bg-slate-700/30 p-2 rounded">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{' '}
              Thailand (Silikon)
            </span>
            <span className="text-green-400 font-bold flex items-center gap-1">
              <CheckCircle size={10} /> On Track
            </span>
          </div>
          <div className="flex justify-between text-xs items-center bg-slate-700/30 p-2 rounded">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{' '}
              Lokal (Min. Oil)
            </span>
            <span className="text-green-400 font-bold flex items-center gap-1">
              <CheckCircle size={10} /> Arrived
            </span>
          </div>
          <div className="flex justify-between text-xs items-center bg-slate-700/30 p-2 rounded">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{' '}
              Australia (Almond)
            </span>
            <span className="text-blue-300 font-bold flex items-center gap-1">
              <Clock size={10} /> Loading
            </span>
          </div>
        </div>
        {/* Takeaway */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-blue-300 font-bold uppercase mb-1 flex items-center gap-1">
            <Zap size={10} /> Takeaway
          </p>
          <p className="text-[10px] text-slate-400">
            Rantai pasok stabil berkat diversifikasi ke ASEAN & Lokal. Risiko
            keterlambatan dari rute jarak jauh telah diminimalkan.
          </p>
        </div>
      </Card>

      {/* Widget 3: Cost Prediction & Inventory (Fixed & Compact) */}
      <Card
        className="col-span-1 md:col-span-1 row-span-1 cursor-pointer hover:border-amber-500/50"
        onClick={() => setActiveView('cost_inventory')}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-amber-400" /> Cost & Inv.
          </h3>
          <Badge color="amber">Alert</Badge>
        </div>

        {/* Cost Ticker */}
        <div className="mb-3">
          <p className="text-[10px] text-slate-400 uppercase">
            Minyak (Global)
          </p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-red-400">$88</span>
            <span className="text-xs text-red-400 flex items-center mb-1">
              <ArrowUp size={10} /> +5%
            </span>
          </div>
        </div>

        {/* Mini Inventory Bar */}
        <div>
          <p className="text-[10px] text-slate-400 mb-1">Status Stok (E2E)</p>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stackedInventoryData}
                margin={{ top: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9, fill: '#64748b' }}
                  interval={0}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    fontSize: '10px',
                  }}
                />
                <Bar dataKey="safe" stackId="a" fill="#3b82f6" />
                <Bar dataKey="excess" stackId="a" fill="#eab308" />
                <Bar dataKey="risk" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Takeaway */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-amber-300 font-bold uppercase mb-1 flex items-center gap-1">
            <Zap size={10} /> Takeaway
          </p>
          <p className="text-[10px] text-slate-400">
            Harga minyak naik, disarankan hedging segera. Stok di tingkat
            retailer kritis, perlu realokasi cepat.
          </p>
        </div>
      </Card>

      {/* Widget 4: Sustainability (Impact Visual) */}
      <Card
        className="col-span-1 md:col-span-1 row-span-1 cursor-pointer hover:border-green-500/50"
        onClick={() => setActiveView('sustainability')}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Leaf className="text-green-400" /> Eco Track
          </h3>
          <span className="text-[10px] text-green-400 border border-green-500/30 px-1 rounded">
            ISO 14083
          </span>
        </div>
        <div className="flex flex-col items-center justify-center h-40">
          <div className="bg-green-900/20 p-3 rounded-full mb-2">
            <TreeDeciduous size={40} className="text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">186t</p>
          <p className="text-xs text-slate-400 uppercase tracking-wide">
            CO2e Dihindari (YTD)
          </p>
          <p className="text-[10px] text-green-400 mt-1 font-bold">
            -98% vs Baseline
          </p>
        </div>
        {/* Takeaway */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-green-300 font-bold uppercase mb-1 flex items-center gap-1">
            <Zap size={10} /> Takeaway
          </p>
          <p className="text-[10px] text-slate-400">
            Pengalihan ke logistik laut & darat telah memangkas emisi secara
            signifikan, mendukung target Net Zero perusahaan.
          </p>
        </div>
      </Card>

      {/* Widget 5: Finance (Scorecard) */}
      <Card
        className="col-span-1 md:col-span-1 row-span-1 cursor-pointer hover:border-blue-500/50"
        onClick={() => setActiveView('finance')}
      >
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
          <DollarSign size={14} /> Kinerja Keuangan
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-700 pb-2">
            <span className="text-xs text-slate-300">Gross Margin</span>
            <div className="text-right">
              <span className="text-lg font-bold text-white">38%</span>
              <span className="text-[10px] text-green-400 block">↑ +3.5%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-300">Cost-to-Serve</span>
            <div className="text-right">
              <span className="text-lg font-bold text-white">12%</span>
              <span className="text-[10px] text-green-400 block">↓ -2.5%</span>
            </div>
          </div>
        </div>
        {/* Takeaway */}
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-[10px] text-blue-300 font-bold uppercase mb-1 flex items-center gap-1">
            <Zap size={10} /> Takeaway
          </p>
          <p className="text-[10px] text-slate-400">
            Margin profitabilitas membaik seiring penurunan biaya logistik dan
            tarif impor, memvalidasi efisiensi operasional baru.
          </p>
        </div>
      </Card>
    </div>
  );

  const DetailedView = ({ title, icon: Icon, colorClass, children }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => setActiveView('dashboard')}
        className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 text-sm transition-colors"
      >
        ← Kembali ke Dashboard
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-lg bg-slate-800 ${colorClass}`}>
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 min-h-[400px]">
        {children}
      </div>
    </div>
  );

  // --- KONTEN DETAIL: Demand Sensing ---
  const DemandContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity size={24} className="text-purple-400" /> Analisis
                Demand: Nasional
              </h3>
              <p className="text-sm text-slate-400">
                Sinyal Agregat: Data POS + Cuaca + Sentimen
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Deviasi (Curr)</p>
              <p className="text-lg font-bold text-red-400">+22%</p>
            </div>
          </div>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomDemandTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="plan"
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  name="Rencana Historis"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="reality"
                  stroke="#ffffff"
                  strokeWidth={3}
                  name="Real-Time Sell-Out"
                />
                <Line
                  type="monotone"
                  dataKey="ai"
                  stroke="#a855f7"
                  strokeWidth={4}
                  name="Prediksi Lonjakan AI"
                  dot={{ r: 6 }}
                />
                <ReferenceLine
                  x="M5 (Skrg)"
                  stroke="rgba(248, 113, 113, 0.8)"
                  strokeDasharray="3 3"
                  label={{
                    position: 'top',
                    value: 'Lonjakan!',
                    fill: '#f87171',
                    fontSize: 10,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <DistributionMap />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/20 p-3 rounded-full">
              <CloudLightning size={24} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Sinyal Cuaca: HEATWAVE
              </h4>
              <p className="text-sm text-slate-400">
                Wilayah Jatim (Suhu {'>'} 34°C)
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-400">+15%</p>
            <p className="text-xs text-slate-500">Uplift Vol. Sampo</p>
          </div>
        </div>
        <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-pink-500/20 p-3 rounded-full">
              <Smartphone size={24} className="text-pink-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Sentimen Sosial: VIRAL
              </h4>
              <p className="text-sm text-slate-400">
                Pemicu: TikTok #RambutBadai
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-pink-400">+35%</p>
            <p className="text-xs text-slate-500">Vol. Pencarian Online</p>
          </div>
        </div>
      </div>
      <div className="bg-purple-900/20 border border-purple-500/50 p-5 rounded-lg flex flex-col justify-center">
        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" /> Tindakan yang Disarankan
          (Actionable Insight)
        </h4>
        <p className="text-sm text-slate-300 mb-4">
          Stok di DC Surabaya diprediksi habis dalam{' '}
          <span className="text-white font-bold">4 Hari</span>. Disarankan
          alokasi stok darurat.
        </p>
        <div className="bg-slate-900/50 p-3 rounded mb-4 border border-slate-700">
          <p className="text-xs text-slate-400">
            Sumber: <span className="text-white">Gudang Cikarang</span>
          </p>
          <p className="text-xs text-slate-400">
            Tujuan: <span className="text-white">DC Surabaya</span>
          </p>
          <p className="text-xs text-slate-400">
            Qty: <span className="text-white">5,000 Karton</span>
          </p>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded shadow-lg transition-transform hover:scale-105 flex justify-center items-center gap-2">
          <Truck size={16} /> SETUJUI PENGIRIMAN
        </button>
      </div>
    </div>
  );

  // --- KONTEN DETAIL: Supply Network ---
  const SupplyContent = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-blue-400 border-b border-blue-900/30 pb-2 flex items-center gap-2">
          <Globe size={20} /> Pemetaan Jaringan Pasokan Global
        </h3>
        <SupplyChainMap />
      </div>

      <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-blue-400 font-bold flex items-center gap-2">
            <PackageCheck size={20} /> Status Material Masuk (Inbound Watchlist)
          </h3>
          <div className="flex gap-2">
            <button className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded hover:bg-slate-700 border border-slate-600">
              Filter: Aktif
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-500 uppercase bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">ID Pesanan</th>
                <th className="px-4 py-3">Material Strategis</th>
                <th className="px-4 py-3">Supplier (Asal)</th>
                <th className="px-4 py-3">Volume</th>
                <th className="px-4 py-3">Estimasi Tiba (ETA)</th>
                <th className="px-4 py-3">Status Kepatuhan</th>
                <th className="px-4 py-3">Posisi Saat Ini</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {procurementStatus.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-slate-400 text-xs">
                    {item.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    {item.material.includes('Silikon') && (
                      <Droplet size={14} className="text-blue-400" />
                    )}
                    {item.material.includes('Almond') && (
                      <Droplet size={14} className="text-amber-400" />
                    )}
                    {item.material.includes('Mineral') && (
                      <Truck size={14} className="text-emerald-400" />
                    )}
                    {item.material.includes('Patchouli') && (
                      <Leaf size={14} className="text-emerald-400" />
                    )}
                    {item.material.includes('SLES') && (
                      <FlaskConical size={14} className="text-cyan-400" />
                    )}
                    {item.material.includes('rPET') && (
                      <Recycle size={14} className="text-green-400" />
                    )}
                    {item.material}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {item.supplier}
                    <div className="text-[10px] text-slate-500">
                      {item.route}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{item.qty}</td>
                  <td className="px-4 py-3 font-mono text-white">{item.eta}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-green-500" />
                      <span className="text-[11px] text-slate-300">
                        {item.compliance}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge color={item.risk === 'Low' ? 'blue' : 'amber'}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- KONTEN DETAIL: Cost & Inventory ---
  const CostInventoryContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-amber-400 font-bold flex items-center gap-2">
              <TrendingUp size={20} /> Pemodelan Biaya Prediktif
            </h3>
            <Badge color="purple">Forecasting AI</Badge>
          </div>
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#475569',
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="oilPrice"
                  stroke="#3b82f6"
                  name="Harga Minyak Global ($)"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="prediction"
                  stroke="#f87171"
                  name="Prediksi Biaya Material ($)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Grafik menunjukkan korelasi langsung antara kenaikan harga minyak
            bumi dengan prediksi lonjakan biaya bahan baku pada bulan April-Mei.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-amber-900/20 border border-amber-500/30 p-5 rounded-lg flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 p-2 rounded-full">
                <Zap size={20} className="text-amber-400" />
              </div>
              <h4 className="text-white font-bold">
                Insight AI: Risiko Erosi Margin
              </h4>
            </div>
            <p className="text-sm text-slate-300 mb-4">
              "Model prediktif mendeteksi potensi kenaikan biaya bahan baku
              sebesar <span className="text-red-400 font-bold">12%</span> di Q2
              akibat volatilitas minyak global."
            </p>
            <div className="bg-slate-800 p-4 rounded border border-slate-600">
              <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                Saran Tindakan Strategis:
              </p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-400" /> Lakukan
                  HEDGING pembelian Mineral Oil.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-400" /> Kunci
                  harga dengan Pertamina (Kontrak IDR).
                </li>
              </ul>
            </div>
            <button className="mt-4 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded shadow-lg transition-transform hover:scale-105">
              SETUJUI KONTRAK HEDGING
            </button>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers size={24} className="text-blue-400" /> Pelacakan Stok
            Multi-Tier (E2E)
          </h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded border border-slate-600">
              <Factory size={14} className="text-blue-400" />{' '}
              <span className="text-slate-300">Hulu (Pabrik)</span>
            </div>
            <ArrowDown size={14} className="text-slate-500 rotate-270" />
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded border border-slate-600">
              <Store size={14} className="text-red-400" />{' '}
              <span className="text-slate-300">Hilir (Retail)</span>
            </div>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stackedInventoryData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                horizontal={false}
              />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#fff"
                width={120}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#475569',
                  color: '#fff',
                }}
                cursor={{ fill: 'transparent' }}
              />
              <Legend />
              <Bar dataKey="safe" name="Stok Aman" stackId="a" fill="#3b82f6" />
              <Bar
                dataKey="excess"
                name="Stok Berlebih"
                stackId="a"
                fill="#eab308"
              />
              <Bar
                dataKey="risk"
                name="Risiko Stockout"
                stackId="a"
                fill="#ef4444"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // --- KONTEN DETAIL: Sustainability ---
  const SustainabilityContent = () => (
    <div className="space-y-8">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
              <Navigation size={24} /> Pelacak Emisi Pengiriman Langsung (Live
              Tracker)
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Memantau emisi karbon dari pengiriman aktif vs metode konvensional
              (ISO 14083)
            </p>
          </div>
          <Badge color="green">Active Monitoring</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-500 uppercase bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3">ID Pengiriman</th>
                <th className="px-4 py-3">Rute & Material</th>
                <th className="px-4 py-3">Jarak (km)</th>
                <th className="px-4 py-3">Emisi (kg CO2e)</th>
                <th className="px-4 py-3">Efisiensi Rute</th>
                <th className="px-4 py-3 text-right">Sumber Penghematan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {liveEmissionTracking.map((item, index) => (
                <tr key={index} className="hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-mono text-slate-400">
                    {item.id}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white font-bold">{item.route}</p>
                    <p className="text-xs text-slate-500">
                      {item.material} • {item.mode}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {item.distance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold text-green-400">
                    {item.emission.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.efficiency.includes('High')
                          ? 'bg-green-900/30 text-green-300 border border-green-500/30'
                          : 'bg-blue-900/30 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {item.efficiency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400 text-xs">
                    {item.savingSource}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieIcon size={20} className="text-blue-400" /> Kontribusi Solusi
            Terhadap Efisiensi Karbon
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={emissionReductionSource}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#fff"
                  width={150}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#475569',
                    color: '#fff',
                  }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar
                  dataKey="value"
                  radius={[0, 4, 4, 0]}
                  name="Kontribusi (%)"
                >
                  {emissionReductionSource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-2">
            Grafik menunjukkan persentase kontribusi setiap inisiatif strategis
            terhadap pengurangan jejak karbon total.
          </p>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
            <div>
              <p className="text-sm text-slate-400">
                Target Intensitas Karbon (2025)
              </p>
              <p className="text-3xl font-bold text-white">
                0.40{' '}
                <span className="text-sm font-normal text-slate-500">
                  kg CO2e / unit
                </span>
              </p>
            </div>
            <Target size={32} className="text-green-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Pencapaian Saat Ini</span>
                <span className="text-green-400 font-bold">
                  0.45 kg CO2e / unit
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 w-[88%] h-full"></div>
              </div>
            </div>
            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
              <p className="text-xs text-blue-300 font-bold mb-1 flex items-center gap-1">
                <Zap size={12} /> Insight Efisiensi
              </p>
              <p className="text-[10px] text-slate-400">
                Penggunaan "Demand Sensing" mengurangi pengiriman darurat via
                udara sebesar 85%, yang merupakan kontributor utama emisi
                tinggi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- KONTEN DETAIL: Financial (Focused Metrics Only - FINAL REVISION) ---
  const FinanceContent = () => (
    <div className="space-y-8">
      {/* 1. Key Financial Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financeMetrics.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 p-6 rounded-lg border border-slate-700 flex flex-col justify-between hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-sm text-slate-400 font-bold uppercase">
                {item.metric}
              </h4>
              {item.trend === 'down' ? (
                <TrendingDown size={20} className="text-green-400" />
              ) : (
                <TrendingUp size={20} className="text-green-400" />
              )}
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{item.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30">
                  {item.change}
                </span>
                <span className="text-[10px] text-slate-500">
                  vs Bulan Lalu
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 italic border-t border-slate-700 pt-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Grafik Proyeksi P&L & Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Proyeksi P&L */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={24} className="text-blue-400" /> Proyeksi P&L
              Operasional (Q1 2025)
            </h3>
            <Badge color="blue">Forecast</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={financialProjection}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#475569',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#colorRevenue)"
                  name="Pendapatan (IDR M)"
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stackId="2"
                  stroke="#ef4444"
                  fill="transparent"
                  name="Biaya Operasional (IDR M)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="3"
                  stroke="#22c55e"
                  fill="url(#colorProfit)"
                  name="Gross Profit (IDR M)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-400 mt-4">
            Grafik menunjukkan tren pelebaran margin profit (area hijau) seiring
            penurunan biaya operasional (garis merah) berkat efisiensi logistik.
          </p>
        </div>

        {/* Cost Structure Breakdown */}
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 w-full text-left">
            <PieIcon size={20} className="text-purple-400" /> Struktur Biaya
            Operasional
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#475569',
                    color: '#fff',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-slate-800 p-3 rounded w-full border border-slate-600">
            <p className="text-xs text-slate-300 font-bold mb-1">
              Highlight Efisiensi:
            </p>
            <ul className="text-[10px] text-slate-400 list-disc list-inside">
              <li>Biaya Logistik turun menjadi 15% (sebelumnya 22%)</li>
              <li>Tarif Impor diminimalkan (2%) berkat skema ATIGA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-50 overflow-hidden selection:bg-purple-500/30">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
            <Eye size={20} />
          </div>
          <div>
            <h1 className="font-bold tracking-wider text-white">DOVE EYE</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Cognitive Tower
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs font-bold text-slate-600 mb-3 px-4 uppercase">
            Modul Utama
          </p>
          <NavButton id="dashboard" label="Ringkasan" icon={Menu} />
          <NavButton id="demand" label="Demand Sensing" icon={Activity} />
          <NavButton id="supply" label="Supply Network" icon={Globe} />
          <NavButton
            id="cost_inventory"
            label="Biaya & Stok"
            icon={TrendingUp}
          />
          <p className="text-xs font-bold text-slate-600 mb-3 px-4 mt-4 uppercase">
            Dampak Bisnis
          </p>
          <NavButton id="sustainability" label="Sustainability" icon={Leaf} />
          <NavButton id="finance" label="Metriks Keuangan" icon={DollarSign} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-xs font-bold">JD</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">John Doe</p>
              <p className="text-[10px] text-slate-400">
                Direktur Rantai Pasok
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto relative">
        <header className="sticky top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 z-10 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {activeView === 'dashboard'
              ? 'Control Tower Dashboard'
              : activeView === 'demand'
              ? 'Detail Demand Sensing'
              : activeView === 'supply'
              ? 'Detail Supply Network'
              : activeView === 'cost_inventory'
              ? 'Prediksi Biaya & Stok'
              : activeView === 'sustainability'
              ? 'Sustainability Tracker (ISO 14083)'
              : 'Analisis Finansial Operasional'}
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-400 font-mono">SISTEM ONLINE</span>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'demand' && (
            <DetailedView
              title="Real-Time Demand Sensing & Respon"
              icon={Activity}
              colorClass="text-purple-400"
            >
              <DemandContent />
            </DetailedView>
          )}
          {activeView === 'supply' && (
            <DetailedView
              title="Monitoring Jaringan Pasokan Global"
              icon={Globe}
              colorClass="text-blue-400"
            >
              <SupplyContent />
            </DetailedView>
          )}
          {activeView === 'cost_inventory' && (
            <DetailedView
              title="Prediksi Biaya & Stok Jaringan"
              icon={TrendingUp}
              colorClass="text-amber-400"
            >
              <CostInventoryContent />
            </DetailedView>
          )}
          {activeView === 'sustainability' && (
            <DetailedView
              title="Jejak Karbon & Dampak Lingkungan"
              icon={Leaf}
              colorClass="text-green-400"
            >
              <SustainabilityContent />
            </DetailedView>
          )}
          {activeView === 'finance' && (
            <DetailedView
              title="Metriks Keuangan Supply Chain"
              icon={DollarSign}
              colorClass="text-green-400"
            >
              <FinanceContent />
            </DetailedView>
          )}
        </div>
      </main>
    </div>
  );
}
