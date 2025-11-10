import React, { useState, useEffect, useMemo } from "react";
import {
  Truck,
  Clock,
  Droplet,
  Thermometer,
  AlertTriangle,
  Leaf,
  Lightbulb,
  TrendingUp,
  Cpu,
  Database,
  ChevronRight,
  User,
  Key,
  Download,
  CheckCircle,
  BarChart3,
} from "lucide-react";

// --- MOCK DATA STRUCTURE & CONFIG ---

// Define the three utility tiers
const UTILITY_TIERS = {
  BASIC: "Basic Tier",
  ADVANCED: "Advanced Tier",
  ENTERPRISE: "Enterprise Tier",
};

// Define the static batch info and an extended timeline
const MOCK_BATCH_DATA = {
  batchId: "SDR-M-042-2025",
  product: "Medjool Dates (Morocco)",
  dataRecordID: "AL-SIDR-DH/Record/00A9F",
  timeline: [
    {
      id: 1,
      name: "Harvest Complete",
      date: "2025-10-28 08:00",
      icon: "🌾",
      location: "Pilot Farm, Morocco",
      type: "Farm",
    },
    {
      id: 2,
      name: "Quality Inspection & Prep",
      date: "2025-10-28 14:30",
      icon: "🔎",
      location: "Processing Facility",
      type: "Operation",
    },
    {
      id: 3,
      name: "Container Loaded & Sealed",
      date: "2025-10-29 06:00",
      icon: "📦",
      location: "Casablanca Loading Dock",
      type: "Logistics",
    },
    {
      id: 4,
      name: "Vessel Departure",
      date: "2025-10-29 10:00",
      icon: "🚢",
      location: "Port of Casablanca (Anomaly Start)",
      type: "Logistics",
    },
    {
      id: 5,
      name: "KEZAD Inbound Processing",
      date: "2025-11-06 14:00",
      icon: "🏗️",
      location: "KEZAD Hub, Abu Dhabi",
      type: "Warehouse",
    },
    {
      id: 6,
      name: "Ready for Re-Export",
      date: "2025-11-07 10:00",
      icon: "✅",
      location: "KEZAD Hub, Abu Dhabi",
      type: "Warehouse",
    },
  ],
};

// Initial state for the combined sensor readings
const initialSensorState = {
  // Logistics Data Stream
  containerTemp: 18.5, // Target temp: 18°C
  shockIndex: 0.1,
  gpsLocation: "28.52 N, -9.1 W (Mid-Voyage)",
  // Farm/Agronomy Data Stream
  soilMoisture: 45, // Target range: 40-55%
  lightIntensity: 65000,
  weatherTemp: 28.0,
  // Warehousing Data Stream (Static for MVP)
  kezadStorageTemp: 17.5,
};

// --- UTILITY COMPONENTS ---

// Component for locked features in lower tiers
const FeatureGate = ({ tier, requiredTier, children }) => {
  const isLocked = tier === UTILITY_TIERS.BASIC && requiredTier === "Advanced";
  const isEnterpriseLocked =
    tier !== UTILITY_TIERS.ENTERPRISE && requiredTier === "Enterprise";

  if (isLocked || isEnterpriseLocked) {
    const required = isEnterpriseLocked
      ? UTILITY_TIERS.ENTERPRISE
      : UTILITY_TIERS.ADVANCED;
    return (
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner text-center">
        <Key className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
        <p className="font-semibold text-gray-800">
          Feature Locked: Requires **{required}** Subscription
        </p>
        <p className="text-sm text-gray-500">
          Upgrade to unlock predictive analytics and full data access.
        </p>
      </div>
    );
  }
  return children;
};

// KPI Card for displaying metrics
const KPI_Card = ({
  title,
  value,
  unit,
  icon: Icon,
  colorClass = "text-indigo-600",
  isAlert = false,
}) => (
  <div
    className={`flex flex-col p-5 bg-white rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl ${
      isAlert
        ? "border-l-4 border-red-500"
        : "border-l-4 border-white hover:border-indigo-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <div
        className={`p-3 rounded-full bg-opacity-10 ${colorClass.replace(
          "text-",
          "bg-"
        )}`}
      >
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
    <div className="mt-3">
      <p className={`text-3xl font-bold ${colorClass}`}>
        {value}
        <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  </div>
);

// --- DASHBOARD SECTIONS ---

const FarmOperationsDashboard = ({ sensorData, currentTier }) => {
  // AI Simulation (Advanced Tier Feature)
  const mlLogic = useMemo(() => {
    const moisture = sensorData.soilMoisture;
    let yieldRisk = 0;

    // 1. Yield Prediction
    if (moisture < 40) yieldRisk = 75; // Drought risk
    else if (moisture > 55) yieldRisk = 50; // Oversaturation risk
    else yieldRisk = 10; // Low risk

    const yieldForecast = Math.max(95 - yieldRisk, 70).toFixed(0);

    // 2. Water Recommendation (Resource Optimization)
    let waterRec = {
      message: "Recommended: Maintain Schedule (Optimal)",
      color: "bg-green-500",
      value: "1.2",
      unit: "L/min",
    };
    if (moisture < 40)
      waterRec = {
        message: "Recommended: Immediate Irrigation (Low Moisture)",
        color: "bg-red-500",
        value: "2.5",
        unit: "L/min",
      };
    if (moisture > 55)
      waterRec = {
        message: "Recommended: Pause Irrigation (High Saturation)",
        color: "bg-yellow-500",
        value: "0.0",
        unit: "L/min",
      };

    return { yieldForecast, yieldRisk, waterRec };
  }, [sensorData.soilMoisture]);

  // ESG Metric Placeholder (Advanced Tier Feature)
  const sustainabilityMetrics = [
    {
      title: "Water Reduction Target",
      value: 35,
      unit: "%",
      icon: Droplet,
      colorClass: "text-blue-600",
    },
    {
      title: "Carbon Footprint Score",
      value: 4.2,
      unit: "kg CO₂e/kg",
      icon: Leaf,
      colorClass: "text-green-600",
      isAlert: 4.2 > 4.0,
    },
    {
      title: "Energy Consumption",
      value: 850,
      unit: "kWh/day",
      icon: Lightbulb,
      colorClass: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Basic Tier: Live Farm Tracking */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-indigo-500" /> Live Farm Sensor
          Network (Basic Tier)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPI_Card
            title="Soil Moisture"
            value={sensorData.soilMoisture.toFixed(1)}
            unit="%"
            icon={Droplet}
            colorClass={
              sensorData.soilMoisture < 40 || sensorData.soilMoisture > 55
                ? "text-red-600"
                : "text-green-600"
            }
            isAlert={
              sensorData.soilMoisture < 40 || sensorData.soilMoisture > 55
            }
          />
          <KPI_Card
            title="Ambient Temperature"
            value={sensorData.weatherTemp.toFixed(1)}
            unit="°C"
            icon={Thermometer}
            colorClass="text-orange-600"
          />
          <KPI_Card
            title="Light Intensity"
            value={sensorData.lightIntensity.toLocaleString()}
            unit="Lux"
            icon={Lightbulb}
            colorClass="text-yellow-600"
          />
          <KPI_Card
            title="Last Data Received"
            value={new Date().toLocaleTimeString()}
            unit=""
            icon={Clock}
            colorClass="text-gray-600"
          />
        </div>
      </section>

      {/* Advanced Tier: AI Analytics & ESG Metrics */}
      <FeatureGate tier={currentTier} requiredTier="Advanced">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-indigo-500" /> AI Analytics &
            Yield Prediction (Advanced Tier)
          </h2>

          {/* AI Insights and Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPI_Card
              title="Yield Forecast (AI)"
              value={mlLogic.yieldForecast}
              unit="%"
              icon={TrendingUp}
              colorClass={
                mlLogic.yieldRisk > 50 ? "text-red-600" : "text-green-600"
              }
              isAlert={mlLogic.yieldRisk > 50}
            />
            <div
              className={`md:col-span-2 p-6 rounded-xl text-white shadow-xl flex items-center space-x-4 ${mlLogic.waterRec.color}`}
            >
              <Droplet className="w-8 h-8 flex-shrink-0" />
              <p className="text-xl font-semibold">
                {mlLogic.waterRec.message}
              </p>
              <p className="ml-auto text-2xl font-bold">
                {mlLogic.waterRec.value} {mlLogic.waterRec.unit}
              </p>
            </div>
          </div>

          {/* ESG Metrics */}
          <h3 className="text-lg font-bold text-gray-700 mt-6 mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-green-500" /> Sustainability
            (ESG) Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sustainabilityMetrics.map((kpi) => (
              <KPI_Card key={kpi.title} {...kpi} />
            ))}
          </div>
        </section>
      </FeatureGate>
    </div>
  );
};

const LogisticsTraceabilityDashboard = ({ sensorData, currentTier }) => {
  // AI Simulation (Advanced Tier Feature)
  const mlPrediction = useMemo(() => {
    const temp = sensorData.containerTemp;
    let riskScore = 0;
    let message =
      "Quality Outlook: Excellent. All metrics within target range.";
    let color = "bg-green-500";
    let icon = CheckCircle;
    let isCritical = false;

    // Quality Degradation Model (Advanced Tier Logic)
    if (temp > 18.5) {
      riskScore = Math.min(Math.round((temp - 18.5) * 10 + 20), 95); // 20% base risk + 10% per degree above 18.5
    }

    if (riskScore >= 75) {
      message = `CRITICAL ALERT! Predicted Quality Degradation: ${riskScore}%`;
      color = "bg-red-500";
      icon = AlertTriangle;
      isCritical = true;
    } else if (riskScore >= 50) {
      message = `High Temp Anomaly Detected. Risk Score: ${riskScore}%`;
      color = "bg-yellow-500";
    }

    return { riskScore, message, color, icon, isCritical };
  }, [sensorData.containerTemp]);

  // Timeline Component
  const TimelineItem = ({ item, isCurrent, tier }) => {
    // Only Enterprise Tier sees all operation types clearly marked
    const typeLabel =
      tier === UTILITY_TIERS.ENTERPRISE ? `(${item.type} Data Stream)` : "";

    return (
      <li className="mb-8 flex items-start">
        <div className="flex flex-col items-center mr-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-semibold border-4 ${
              isCurrent
                ? "bg-indigo-600 border-indigo-200 shadow-lg animate-pulse"
                : "bg-gray-400 border-gray-100"
            }`}
          >
            {item.icon}
          </div>
          <div
            className={`h-full w-0.5 ${
              item.id < MOCK_BATCH_DATA.timeline.length
                ? "bg-gray-200"
                : "bg-transparent"
            }`}
          ></div>
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              isCurrent ? "text-indigo-700" : "text-gray-800"
            }`}
          >
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date(item.date).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            <span className="ml-2 text-xs font-medium text-gray-400">
              {typeLabel}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">{item.location}</p>
        </div>
      </li>
    );
  };

  // Enterprise Tier Features
  const EnterpriseFeatures = () => (
    <FeatureGate tier={currentTier} requiredTier="Enterprise">
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-indigo-500" /> Enterprise Data
          Access & Export
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* API Access Placeholder */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Key className="w-5 h-5 mr-2 text-purple-500" /> API Key
              Management
            </h3>
            <p className="text-gray-600 mb-3">
              Provision secure, token-gated API access for integrating Al Sidr
              data into your ERP or internal systems.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                defaultValue="************23BCDE7890"
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
              />
              <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 flex items-center">
                Generate New Key
              </button>
            </div>
          </div>

          {/* Data Export Feature */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-pink-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Download className="w-5 h-5 mr-2 text-pink-500" /> Raw Data
              Export
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Download all raw, immutable sensor and operational data for this
              batch.
            </p>
            <button className="w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" /> Export All Batch Data
              (.JSON)
            </button>
          </div>
        </div>
      </section>
    </FeatureGate>
  );

  return (
    <div className="space-y-8">
      {/* Advanced Tier: AI/Predictive Insight (Risk) */}
      <FeatureGate tier={currentTier} requiredTier="Advanced">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Cpu className="w-5 h-5 mr-2 text-indigo-500" /> Quality & Risk
            Prediction (Advanced Tier)
          </h2>
          <div
            className={`p-6 rounded-xl text-white shadow-xl flex items-center space-x-4 ${mlPrediction.color}`}
          >
            <mlPrediction.icon className="w-8 h-8 flex-shrink-0" />
            <p className="text-xl font-semibold">{mlPrediction.message}</p>
          </div>
        </section>
      </FeatureGate>

      {/* Basic Tier: Live Logistics Data */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-indigo-500" /> Live Logistics
          Status (Basic Tier)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KPI_Card
            title="Container Temperature"
            value={sensorData.containerTemp.toFixed(1)}
            unit="°C"
            icon={Thermometer}
            colorClass={
              mlPrediction.isCritical ? "text-red-600" : "text-green-600"
            }
            isAlert={mlPrediction.isCritical}
          />
          <KPI_Card
            title="Shock Index"
            value={sensorData.shockIndex.toFixed(2)}
            unit="g-force"
            icon={AlertTriangle}
            colorClass={
              sensorData.shockIndex > 1.0
                ? "text-yellow-600"
                : "text-indigo-600"
            }
          />
          <KPI_Card
            title="GPS Location"
            value={sensorData.gpsLocation}
            unit=""
            icon={Truck}
            colorClass="text-blue-600"
          />
          <KPI_Card
            title="Quality Risk Score"
            value={mlPrediction.riskScore}
            unit="%"
            icon={TrendingUp}
            colorClass={
              mlPrediction.isCritical ? "text-red-600" : "text-green-600"
            }
            isAlert={mlPrediction.isCritical}
          />
        </div>
      </section>

      {/* Basic/Enterprise Tier: Full Traceability Timeline */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-indigo-500" /> Farm-to-Pallet Full
          Traceability Suite
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Data Grounding Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Database className="w-4 h-4 mr-1 text-indigo-500" /> Secure Data
              Warehouse Record
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Record Verified and Committed to Centralized Data Warehouse.
            </p>
            <div className="flex items-center space-x-2 p-2 bg-indigo-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-indigo-600" />
              <p className="text-sm font-medium text-indigo-700 truncate">
                Warehouse ID: {MOCK_BATCH_DATA.dataRecordID}
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              <span className="font-semibold">KEZAD Storage Temp:</span>{" "}
              {sensorData.kezadStorageTemp}°C
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Supply Chain Journey Milestones
            </h3>
            <ol className="relative border-l border-gray-200 ml-4">
              {MOCK_BATCH_DATA.timeline.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isCurrent={index === 3} // Departure is the current active point for demo
                  tier={currentTier}
                />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Enterprise Tier: API Access and Export */}
      {currentTier === UTILITY_TIERS.ENTERPRISE && <EnterpriseFeatures />}
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---

const AlSidrDashboard = () => {
  const [dashboardView, setDashboardView] = useState("logistics"); // 'farm' or 'logistics'
  const [currentTier, setCurrentTier] = useState(UTILITY_TIERS.ADVANCED);
  const [sensorData, setSensorData] = useState(initialSensorState);
  const [isSimulating, setIsSimulating] = useState(true);

  // Simulation: Update data every 5 seconds to show a 'live' feed
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSensorData((prev) => ({
        ...prev,
        // Logistics Anomaly Simulation: Temp Spike for demo
        containerTemp:
          prev.containerTemp < 23.5 ? prev.containerTemp + 0.5 : 24.0,
        shockIndex: Math.min(prev.shockIndex + 0.05, 1.2),
        // Farm Anomaly Simulation: Moisture Drop for demo
        soilMoisture: prev.soilMoisture > 30 ? prev.soilMoisture - 1.5 : 30.0,
        lightIntensity:
          prev.lightIntensity + (Math.random() > 0.5 ? 1000 : -1000),
        weatherTemp: 28.0 + (Math.random() * 0.5 - 0.25),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Custom button for tier selection
  const TierButton = ({ tier }) => (
    <button
      onClick={() => setCurrentTier(tier)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shadow-md ${
        currentTier === tier
          ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {tier}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-['Inter']">
      {/* Header and Navigation */}
      <header className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Al Sidr Digital Foundation MVP
        </h1>
        <p className="text-lg text-indigo-600 mt-1">
          {MOCK_BATCH_DATA.product} - Batch ID: {MOCK_BATCH_DATA.batchId}
        </p>

        {/* Tier Selector */}
        <div className="mt-4 border-b pb-4 border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Simulate Utility Tier Access:
          </h3>
          <div className="flex space-x-3">
            <TierButton tier={UTILITY_TIERS.BASIC} />
            <TierButton tier={UTILITY_TIERS.ADVANCED} />
            <TierButton tier={UTILITY_TIERS.ENTERPRISE} />
          </div>
        </div>

        {/* Dashboard View Navigation */}
        <div className="mt-4 flex space-x-4 items-center">
          <h3 className="text-sm font-medium text-gray-500">
            Active Dashboard View:
          </h3>
          <button
            onClick={() => setDashboardView("farm")}
            className={`px-4 py-2 font-semibold transition-colors duration-200 rounded-lg ${
              dashboardView === "farm"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-300"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            Farm Operations
          </button>
          <button
            onClick={() => setDashboardView("logistics")}
            className={`px-4 py-2 font-semibold transition-colors duration-200 rounded-lg ${
              dashboardView === "logistics"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-300"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            Logistics & Traceability
          </button>
        </div>

        {/* Simulation Controls */}
        <div className="mt-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
          <span className="font-semibold">Sim Status:</span> Data simulator is{" "}
          {isSimulating ? "running" : "paused"}.
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
              isSimulating
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-green-100 text-green-600 hover:bg-green-200"
            }`}
          >
            {isSimulating ? "Pause Data Feed" : "Resume Data Feed"}
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="mt-8">
        {dashboardView === "farm" ? (
          <FarmOperationsDashboard
            sensorData={sensorData}
            currentTier={currentTier}
          />
        ) : (
          <LogisticsTraceabilityDashboard
            sensorData={sensorData}
            currentTier={currentTier}
          />
        )}
      </main>
    </div>
  );
};

export default AlSidrDashboard;
