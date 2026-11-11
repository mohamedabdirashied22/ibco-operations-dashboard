import React, { useState, useMemo } from 'react';
import { 
  Sun, 
  Moon, 
  Calendar, 
  Clock, 
  Users, 
  Truck, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  CheckCircle2, 
  Radio, 
  Activity, 
  RefreshCw, 
  UserCheck, 
  ShieldCheck, 
  ChevronRight, 
  X,
  Layers,
  ArrowRightLeft,
  Bell,
  HardHat,
  Sliders
} from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Filter & Selection States
  const [selectedDate, setSelectedDate] = useState('2026-11-11');
  const [shiftFilter, setShiftFilter] = useState('ALL'); // 'ALL', 'DAY', 'NIGHT'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null); // For detail view

  // Modal State for Editing / Swapping
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // Main Roster Data state initialized with provided shift details
  const [rosterData, setRosterData] = useState([
    {
      id: 'imc-01-day',
      equipment: 'IMC 01',
      equipmentType: 'Heavy Crane 50T',
      shift: 'DAY',
      operator: 'Mohamed Abdirashid',
      signalman: 'Aydarus',
      status: 'Active',
      location: 'Zone A - Pier 4',
      fuelLevel: 85,
      lastCheck: '06:45 AM',
      operatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'imc-02-day',
      equipment: 'IMC 02',
      equipmentType: 'Excavator Heavy Line',
      shift: 'DAY',
      operator: 'Cukasha',
      signalman: 'Abdihakim Omar',
      status: 'Active',
      location: 'Zone B - Basin West',
      fuelLevel: 92,
      lastCheck: '07:10 AM',
      hasOverlapAlert: true, // Double shift alert
      operatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'imc-03-day',
      equipment: 'IMC 03',
      equipmentType: 'Bulldozer CAT D8T',
      shift: 'DAY',
      operator: 'Yunas',
      signalman: 'Abdirashid',
      status: 'Active',
      location: 'Zone C - South Site',
      fuelLevel: 68,
      lastCheck: '07:30 AM',
      operatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'imc-01-night',
      equipment: 'IMC 01',
      equipmentType: 'Heavy Crane 50T',
      shift: 'NIGHT',
      operator: 'Dilawar Khan',
      signalman: 'Abdihakim Adam',
      status: 'Scheduled',
      location: 'Zone A - Pier 4',
      fuelLevel: 85,
      lastCheck: 'Standby',
      operatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'imc-02-night',
      equipment: 'IMC 02',
      equipmentType: 'Excavator Heavy Line',
      shift: 'NIGHT',
      operator: 'Cukasha',
      signalman: 'Abdihakim Omar',
      status: 'Scheduled',
      location: 'Zone B - Basin West',
      fuelLevel: 92,
      lastCheck: 'Standby',
      hasOverlapAlert: true, // Double shift alert flag
      operatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'imc-03-night',
      equipment: 'IMC 03',
      equipmentType: 'Bulldozer CAT D8T',
      shift: 'NIGHT',
      operator: 'Malessa',
      signalman: 'Abdirahman',
      status: 'Scheduled',
      location: 'Zone C - South Site',
      fuelLevel: 68,
      lastCheck: 'Standby',
      operatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      signalmanAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    }
  ]);

  // Form State for Editing Modal
  const [formOperator, setFormOperator] = useState('');
  const [formSignalman, setFormSignalman] = useState('');
  const [formStatus, setFormStatus] = useState('Active');

  // Filtered Cards based on shift tab and search query
  const filteredRoster = useMemo(() => {
    return rosterData.filter(item => {
      const matchesShift = shiftFilter === 'ALL' || item.shift === shiftFilter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.equipment.toLowerCase().includes(query) ||
        item.operator.toLowerCase().includes(query) ||
        item.signalman.toLowerCase().includes(query) ||
        item.equipmentType.toLowerCase().includes(query);
      return matchesShift && matchesSearch;
    });
  }, [rosterData, shiftFilter, searchQuery]);

  // Handle open edit modal
  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setFormOperator(card.operator);
    setFormSignalman(card.signalman);
    setFormStatus(card.status);
    setEditModalOpen(true);
  };

  // Save edit changes
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCard) return;

    setRosterData(prev => prev.map(item => {
      if (item.id === editingCard.id) {
        return {
          ...item,
          operator: formOperator,
          signalman: formSignalman,
          status: formStatus
        };
      }
      return item;
    }));

    setEditModalOpen(false);
    setEditingCard(null);
  };

  // Quick action: Resolve double shift alert for Cukasha / Abdihakim Omar
  const handleQuickSwap = (cardId) => {
    setRosterData(prev => prev.map(item => {
      if (item.id === cardId) {
        return {
          ...item,
          operator: item.operator === 'Cukasha' ? 'Alternate Operator' : item.operator,
          hasOverlapAlert: false
        };
      }
      return item;
    }));
  };

  // Stats Calculations
  const totalSlots = rosterData.length;
  const activeCount = rosterData.filter(r => r.shift === 'DAY').length;
  const nightCount = rosterData.filter(r => r.shift === 'NIGHT').length;
  const uniquePersonnel = useMemo(() => {
    const people = new Set();
    rosterData.forEach(r => {
      people.add(r.operator);
      people.add(r.signalman);
    });
    return people.size;
  }, [rosterData]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} font-sans`}>
      {/* Top Global Navigation Bar */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-amber-500 to-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black tracking-tight text-lg bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  IMC OPERATIONS
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-600'
                }`}>
                  v2.4 Live
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Fleet Roster & Equipment Control</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative hidden md:block w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search operator, equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                  darkMode 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Shift Alert Badge */}
            <div className="relative cursor-pointer p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-amber-400 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Alert: Double Shift Warning */}
        <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-sm ${
          darkMode 
            ? 'bg-amber-950/30 border-amber-800/50 text-amber-200' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5 md:mt-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm flex items-center gap-2">
                Consecutive Shift Alert Detected
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  2 Conflicts
                </span>
              </h4>
              <p className="text-xs opacity-90 mt-0.5">
                Operator <strong className="underline">Cukasha</strong> & Signalman <strong className="underline">Abdihakim Omar</strong> are scheduled for both <strong>Day</strong> and <strong>Night</strong> shifts on <strong>IMC 02</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <button 
              onClick={() => {
                setShiftFilter('ALL');
                setSearchQuery('IMC 02');
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold transition-colors shadow-sm"
            >
              Inspect IMC 02
            </button>
          </div>
        </div>

        {/* Hero Header & Date Picker */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Daily Shift Roster
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                11 Nov Shift Control
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Manage heavy equipment personnel, track safety signalmen, and review shift coverage.
            </p>
          </div>

          {/* Controls: Date Picker & Shift Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Input */}
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl border ${
              darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
            } shadow-sm`}>
              <Calendar className="w-4 h-4 text-amber-500" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
              />
            </div>

            {/* Shift Filter Pills */}
            <div className={`p-1 rounded-xl border flex items-center space-x-1 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/60 border-slate-200'
            }`}>
              <button
                onClick={() => setShiftFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  shiftFilter === 'ALL'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Shifts
              </button>
              <button
                onClick={() => setShiftFilter('DAY')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                  shiftFilter === 'DAY'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setShiftFilter('NIGHT')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                  shiftFilter === 'NIGHT'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Night</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics & Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Units</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black">3 / 3</div>
              <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 100% Fleet Operational
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Crew</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black">{uniquePersonnel} Personnel</div>
              <p className="text-xs text-slate-400 mt-1">
                6 Operators • 6 Signalmen
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shift Coverage</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black">24 hrs</div>
              <p className="text-xs text-indigo-400 font-medium mt-1">
                Day (07:00-19:00) | Night (19:00-07:00)
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${
            darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overlapping Roster</span>
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black text-orange-500">1 Team</div>
              <p className="text-xs text-orange-400 font-medium mt-1">
                IMC 02 requires double shift review
              </p>
            </div>
          </div>
        </div>

        {/* Section Title & Quick Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/40">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              Equipment Roster Cards
            </h2>
            <p className="text-xs text-slate-400">
              Showing {filteredRoster.length} equipment assignment entries for 11 November
            </p>
          </div>

          {/* Search bar mobile fallback */}
          <div className="md:hidden w-full">
            <input
              type="text"
              placeholder="Search equipment or names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 text-sm rounded-xl border focus:outline-none ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200'
              }`}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoster.map((card) => {
            const isNight = card.shift === 'NIGHT';
            return (
              <div
                key={card.id}
                className={`group relative rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${
                  card.hasOverlapAlert 
                    ? darkMode ? 'border-amber-500/40 bg-gradient-to-b from-slate-900 to-amber-950/20' : 'border-amber-300 bg-amber-50/30'
                    : darkMode 
                      ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Shift Highlight Bar */}
                <div className={`h-1.5 w-full ${isNight ? 'bg-indigo-500' : 'bg-amber-500'}`} />

                <div className="p-6 space-y-6">
                  {/* Card Top Row: Equipment ID & Shift Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-black tracking-tight">{card.equipment}</span>
                        {card.hasOverlapAlert && (
                          <span className="p-1 rounded-full bg-amber-500/20 text-amber-400" title="Double Shift Alert">
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{card.equipmentType}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1 border ${
                        isNight 
                          ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' 
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      }`}>
                        {isNight ? <Moon className="w-3.5 h-3.5 mr-1" /> : <Sun className="w-3.5 h-3.5 mr-1" />}
                        {card.shift} SHIFT
                      </span>
                    </div>
                  </div>

                  {/* Personnel Section */}
                  <div className="space-y-4 pt-2">
                    {/* Operator Box */}
                    <div className={`p-3.5 rounded-2xl border transition-all ${
                      darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                          Operator
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Certified
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={card.operatorAvatar} 
                          alt={card.operator}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/30"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-100">{card.operator}</p>
                          <p className="text-xs text-slate-400">Primary Control</p>
                        </div>
                      </div>
                    </div>

                    {/* Signalman Box */}
                    <div className={`p-3.5 rounded-2xl border transition-all ${
                      darkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Radio className="w-3.5 h-3.5 text-blue-400" />
                          Signalman / Safety
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          On Comms
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={card.signalmanAvatar} 
                          alt={card.signalman}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30"
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-100">{card.signalman}</p>
                          <p className="text-xs text-slate-400">Ground Radio Lead</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                    <div className="flex items-center space-x-1.5">
                      <Activity className="w-3.5 h-3.5 text-slate-500" />
                      <span>Loc: <strong className="text-slate-300">{card.location}</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5 justify-end">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Check: <strong className="text-slate-300">{card.lastCheck}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className={`p-4 border-t flex items-center justify-between ${
                  darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <button
                    onClick={() => handleOpenEdit(card)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      darkMode 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Roster</span>
                  </button>

                  <button
                    onClick={() => setSelectedEquipment(card)}
                    className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center space-x-1 group/btn"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if filtered results are 0 */}
        {filteredRoster.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-3xl">
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold">No Matching Personnel or Equipment Found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or switching shift filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setShiftFilter('ALL'); }}
              className="mt-4 text-xs font-bold px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Edit / Swap Shift Modal */}
      {editModalOpen && editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-extrabold flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-amber-500" />
                  Modify Roster Assignment
                </h3>
                <p className="text-xs text-slate-400">
                  {editingCard.equipment} • {editingCard.shift} Shift
                </p>
              </div>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Assigned Operator
                </label>
                <input
                  type="text"
                  value={formOperator}
                  onChange={(e) => setFormOperator(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Assigned Signalman
                </label>
                <input
                  type="text"
                  value={formSignalman}
                  onChange={(e) => setFormSignalman(e.target.value)}
                  required
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Equipment Shift Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="Active">Active On Site</option>
                  <option value="Scheduled">Scheduled / Standby</option>
                  <option value="Maintenance">Under Maintenance</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Save Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Equipment Detailed Inspection Sidebar Drawer */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className={`w-full max-w-md h-full border-l p-6 overflow-y-auto space-y-6 shadow-2xl animate-slideLeft ${
            darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Detail Telemetry</span>
                <h3 className="text-2xl font-black">{selectedEquipment.equipment} Inspection</h3>
              </div>
              <button 
                onClick={() => setSelectedEquipment(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Shift Type:</span>
                <span className="text-amber-400">{selectedEquipment.shift} SHIFT</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Location:</span>
                <span>{selectedEquipment.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Fuel Reserves:</span>
                <span className="text-emerald-400">{selectedEquipment.fuelLevel}%</span>
              </div>
            </div>

            {/* Personnel Assigned */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Assigned Operations Team</h4>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <img src={selectedEquipment.operatorAvatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-bold">{selectedEquipment.operator}</p>
                  <p className="text-xs text-slate-400">Lead Heavy Machinery Operator</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                <img src={selectedEquipment.signalmanAvatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="text-sm font-bold">{selectedEquipment.signalman}</p>
                  <p className="text-xs text-slate-400">Radio & Safety Controller</p>
                </div>
              </div>
            </div>

            {/* Safety Check Standard */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Pre-Shift Checklist</h4>
              {['Radio Transceiver Check', 'Hydraulic System Inspection', 'Cabin Safety & Emergency Brakes', 'Signalman Visual Line of Sight'].map((check, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{check}</span>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <div className="pt-6">
              <button
                onClick={() => setSelectedEquipment(null)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Close Inspection View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}