import React, { useState, useMemo, useEffect } from 'react';

// --- TypeScript Interfaces ---

interface CardProps {
  title: string;
  icon: React.ReactNode;
  info?: string;
  children: React.ReactNode;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  description?: string;
}

interface NumberInputProps {
  value: number | '';
  onChange: (val: number | '') => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

interface MonthInputProps {
  value: string;
  onChange: (val: string) => void;
}

interface SliderProps {
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}

interface ToggleProps {
  active: boolean;
  onChange: (val: boolean) => void;
  label: string;
  accent?: "indigo" | "emerald";
}

// --- Reusable UI Components ---

const Card = ({ title, icon, info, children }: CardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden mb-6 transition-colors">
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        </div>
        {info && (
          <button 
            type="button"
            onClick={() => setShowInfo(!showInfo)} 
            className={`p-1 rounded-full transition-colors ${showInfo ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            title="More Information"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.732l-1.171 4.805c-.06.241.05.49.27.585a.5.5 0 00.67-.323l.115-.463a.5.5 0 01.968.252l-.116.463a1.5 1.5 0 01-2.01.968c-1.146-.573-2.437-.463-2.126-1.732l1.171-4.805a.5.5 0 00-.67-.585.5.5 0 01-.968-.252l.116-.463a1.5 1.5 0 012.01-.968zM12 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
             </svg>
          </button>
        )}
      </div>
      {info && showInfo && (
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-b border-indigo-100 dark:border-indigo-800/50 px-5 py-4 text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed border-l-4 border-l-indigo-500 dark:border-l-indigo-400">
          {info}
        </div>
      )}
      <div className="p-5 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

const Field = ({ label, children, description }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    {description && <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">{description}</span>}
    {children}
  </div>
);

const NumberInput = ({ value, onChange, prefix, suffix, min, max, step = 1, disabled = false }: NumberInputProps) => {
  return (
    <div className="relative flex items-center">
      {prefix && <span className={`absolute left-3 text-sm ${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>{prefix}</span>}
      <input
        type="number" min={min} max={max} step={step} value={value} disabled={disabled}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        className={`w-full border py-2 outline-none text-sm rounded-lg transition-shadow ${prefix ? 'pl-7' : 'pl-3'} ${suffix ? 'pr-8' : 'pr-3'} 
          ${disabled 
            ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500'}`}
      />
      {suffix && <span className={`absolute right-3 text-sm ${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>{suffix}</span>}
    </div>
  );
};

const MonthInput = ({ value, onChange }: MonthInputProps) => {
  return (
    <input
      type="month" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full border py-2 px-3 outline-none text-sm rounded-lg transition-shadow bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
    />
  );
};

const Slider = ({ value, onChange, min, max, step = 1, suffix = '' }: SliderProps) => (
  <div className="flex items-center gap-4">
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400" />
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[3.5rem] text-right">{value}{suffix}</span>
  </div>
);

const Toggle = ({ active, onChange, label, accent = "indigo" }: ToggleProps) => (
  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors h-full">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 pr-2 leading-tight">{label}</span>
    <button type="button" onClick={() => onChange(!active)} className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? (accent==='emerald' ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-500') : 'bg-slate-300 dark:bg-slate-600'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

// --- Custom SVG Chart Component ---
const PortfolioChart = ({ data }: { data: any[] }) => {
  const [mainCategory, setMainCategory] = useState<'portfolio' | 'tsp' | 'brokerage' | 'ira'>('portfolio');
  const [subCategoryTsp, setSubCategoryTsp] = useState<'total' | 'trad' | 'roth'>('total');
  const [subCategoryIra, setSubCategoryIra] = useState<'total' | 'trad' | 'roth'>('total');

  if (!data || data.length === 0) return null;

  let keyInvested = 'portfolioInvested';
  let keyTotal = 'portfolioTotal';

  if (mainCategory === 'tsp') {
      if (subCategoryTsp === 'total') { keyInvested = 'tspTotalInvested'; keyTotal = 'tspTotal'; }
      else if (subCategoryTsp === 'trad') { keyInvested = 'tspTradInvested'; keyTotal = 'tspTrad'; }
      else if (subCategoryTsp === 'roth') { keyInvested = 'tspRothInvested'; keyTotal = 'tspRoth'; }
  } else if (mainCategory === 'ira') {
      if (subCategoryIra === 'total') { keyInvested = 'iraTotalInvested'; keyTotal = 'iraTotal'; }
      else if (subCategoryIra === 'trad') { keyInvested = 'iraTradInvested'; keyTotal = 'iraTrad'; }
      else if (subCategoryIra === 'roth') { keyInvested = 'iraRothInvested'; keyTotal = 'iraRoth'; }
  } else if (mainCategory === 'brokerage') {
      keyInvested = 'brokerageInvested'; keyTotal = 'brokerageTotal';
  }

  const maxY = Math.max(...data.map(d => d[keyTotal] || 0), 10000);
  const roughStep = maxY / 10;
  const mag = Math.pow(10, Math.floor(Math.log10(roughStep || 1)));
  const step = Math.ceil((roughStep || 1) / mag) * mag;
  const topY = step * 10;

  const width = 1000;
  const height = 450;
  const padX = 90;
  const padY = 50;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const getX = (i: number) => padX + (i / Math.max(1, data.length - 1)) * chartW;
  const getY = (val: number) => height - padY - (val / topY) * chartH;

  const ticks = Array.from({length: 11}, (_, i) => i * step);
  const fmtY = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const colorInvested = "#1e3a8a"; // Dark Blue
  const colorTotal = "#0d9488"; // Teal

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 w-full mt-6 mb-8 overflow-hidden transition-colors">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center mb-4">Total Savings Projection</h3>
      
      {/* Chart Controls */}
      <div className="flex flex-col items-center gap-3 mb-6">
         <div className="flex flex-wrap justify-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
           {['portfolio', 'tsp', 'brokerage', 'ira'].map(cat => (
             <button
               key={cat}
               type="button"
               onClick={() => setMainCategory(cat as any)}
               className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mainCategory === cat ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
             >
               {cat === 'portfolio' && 'Total Portfolio'}
               {cat === 'tsp' && 'TSP'}
               {cat === 'brokerage' && 'Personal Brokerage'}
               {cat === 'ira' && 'IRA'}
             </button>
           ))}
         </div>

         {mainCategory === 'tsp' && (
           <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
             {['total', 'trad', 'roth'].map(sub => (
               <button
                 key={`tsp-${sub}`}
                 type="button"
                 onClick={() => setSubCategoryTsp(sub as any)}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${subCategoryTsp === sub ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 {sub === 'total' && 'Total TSP'}
                 {sub === 'trad' && 'Traditional Only'}
                 {sub === 'roth' && 'Roth Only'}
               </button>
             ))}
           </div>
         )}

         {mainCategory === 'ira' && (
           <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
             {['total', 'trad', 'roth'].map(sub => (
               <button
                 key={`ira-${sub}`}
                 type="button"
                 onClick={() => setSubCategoryIra(sub as any)}
                 className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${subCategoryIra === sub ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
               >
                 {sub === 'total' && 'Total IRA'}
                 {sub === 'trad' && 'Traditional Only'}
                 {sub === 'roth' && 'Roth Only'}
               </button>
             ))}
           </div>
         )}
      </div>

      <div className="w-full overflow-x-auto custom-scrollbar pb-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[700px] text-slate-800 dark:text-slate-200" style={{fontFamily: 'inherit'}}>
            {/* Grid */}
            {ticks.map(tick => (
              <g key={tick}>
                <line x1={padX} y1={getY(tick)} x2={width - padX} y2={getY(tick)} stroke="currentColor" className="opacity-10 dark:opacity-20" />
                <text x={padX - 10} y={getY(tick) + 4} textAnchor="end" className="text-[12px] fill-slate-500 dark:fill-slate-400 font-bold font-sans">
                  {fmtY(tick)}
                </text>
              </g>
            ))}
            
            {/* Y Axis Title */}
            <text x={20} y={height / 2} transform={`rotate(-90 20 ${height/2})`} textAnchor="middle" className="text-[14px] fill-slate-600 dark:fill-slate-400 font-bold font-sans">
              US Dollars ($)
            </text>

            {/* X Axis labels */}
            {data.map((d, i) => {
               if (data.length > 25 && i % 2 !== 0 && i !== data.length - 1 && i !== 0) return null; // declutter X axis
               return (
                 <text key={`label-${d.year}`} x={getX(i) - 10} y={height - padY + 24} textAnchor="end" transform={`rotate(-45 ${getX(i) - 10} ${height - padY + 24})`} className="text-[12px] fill-slate-600 dark:fill-slate-400 font-bold font-sans">
                   Year {d.year}
                 </text>
               );
            })}

            {/* Lines */}
            <polyline points={data.map((d, i) => `${getX(i)},${getY(d[keyInvested] || 0)}`).join(' ')} fill="none" stroke={colorInvested} strokeWidth="2.5" />
            <polyline points={data.map((d, i) => `${getX(i)},${getY(d[keyTotal] || 0)}`).join(' ')} fill="none" stroke={colorTotal} strokeWidth="2.5" />

            {/* Points */}
            {data.map((d, i) => (
              <g key={`pts-${i}`}>
                <circle cx={getX(i)} cy={getY(d[keyInvested] || 0)} r="4.5" fill={colorInvested} />
                <rect x={getX(i)-5} y={getY(d[keyTotal] || 0)-5} width="10" height="10" fill={colorTotal} transform={`rotate(45 ${getX(i)} ${getY(d[keyTotal] || 0)})`} />
              </g>
            ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-x-12 gap-y-4 mt-8 flex-wrap text-base font-bold text-slate-700 dark:text-slate-300">
         <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6">
                <svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="6" fill={colorInvested} /></svg>
            </div>
            Total Invested
         </div>
         <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6">
                <svg viewBox="0 0 24 24" width="24" height="24"><rect x="6" y="6" width="12" height="12" fill={colorTotal} transform="rotate(45 12 12)" /></svg>
            </div>
            Total Savings Compounded
         </div>
      </div>
    </div>
  );
};


// --- Main Application ---

export default function App() {
  const currentYear = new Date().getFullYear();

  // Application State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Global Assumptions
  const [marketReturn, setMarketReturn] = useState(7.0);

  // Time & Service
  const [birthYear, setBirthYear] = useState(1985);
  const [ageStarted, setAgeStarted] = useState(25);
  const [retireAge, setRetireAge] = useState(62);
  const [priorService, setPriorService] = useState(4);
  const [sickLeaveDays, setSickLeaveDays] = useState(180);

  // Taxes & Cash Flow Info
  const [filingStatus, setFilingStatus] = useState<'Single' | 'Married'>('Married');
  const [dependents, setDependents] = useState(2);
  const [fersRate, setFersRate] = useState(4.4);
  const [fehbPremium, setFehbPremium] = useState(450);
  
  // Supplemental Income
  const [supplementalIncome, setSupplementalIncome] = useState(0);
  const [supplementalTaxToggled, setSupplementalTaxToggled] = useState(true);

  // FERS Pension
  const [maxGradeSalary, setMaxGradeSalary] = useState(135000);
  const [cola, setCola] = useState(2.0);
  const [survivorBenefit, setSurvivorBenefit] = useState(true);
  const [fehb5Year, setFehb5Year] = useState(true);

  // TSP & Income
  const [currentSalary, setCurrentSalary] = useState(95000);
  const [annualRaise, setAnnualRaise] = useState(2.0);
  const [tradTsp, setTradTsp] = useState(65000);
  const [rothTsp, setRothTsp] = useState(15000);
  
  // TSP Advanced Inputs
  const [isMaxTsp, setIsMaxTsp] = useState(false);
  const [maxTspRothPct, setMaxTspRothPct] = useState(0); 
  const [tspInputMode, setTspInputMode] = useState<'%' | '$'>('%'); 
  const [tradTspInput, setTradTspInput] = useState<number | ''>(5.0);
  const [rothTspInput, setRothTspInput] = useState<number | ''>(0.0);

  // IRA
  const [tradIraBalance, setTradIraBalance] = useState(10000);
  const [rothIraBalance, setRothIraBalance] = useState(10000);
  const [isMaxIra, setIsMaxIra] = useState(false);
  const [maxIraRothPct, setMaxIraRothPct] = useState(100);
  const [tradIraContrib, setTradIraContrib] = useState<number | ''>(0);
  const [rothIraContrib, setRothIraContrib] = useState<number | ''>(625); 
  const [iraFreq, setIraFreq] = useState<'Monthly' | 'Annual'>('Monthly');
  const [iraWarning, setIraWarning] = useState('');
  const [iraContribStopAge, setIraContribStopAge] = useState(55);

  const handleIraFreqChange = (newFreq: 'Monthly' | 'Annual') => {
    if (newFreq === iraFreq) return;
    if (newFreq === 'Monthly') {
       setTradIraContrib(tradIraContrib === '' ? '' : Math.round(Number(tradIraContrib) / 12));
       setRothIraContrib(rothIraContrib === '' ? '' : Math.round(Number(rothIraContrib) / 12));
    } else {
       setTradIraContrib(tradIraContrib === '' ? '' : Math.round(Number(tradIraContrib) * 12));
       setRothIraContrib(rothIraContrib === '' ? '' : Math.round(Number(rothIraContrib) * 12));
    }
    setIraFreq(newFreq);
    setIraWarning('');
  };

  const handleIraInput = (type: 'Trad' | 'Roth', val: number | '') => {
    const annualLimit = (currentYear - birthYear) >= 50 ? 8600 : 7500;
    const periodLimit = iraFreq === 'Monthly' ? annualLimit / 12 : annualLimit;
    
    let safeVal = val;
    if (type === 'Trad') {
      const currentRoth = typeof rothIraContrib === 'number' ? rothIraContrib : 0;
      const maxAllow = Math.max(0, periodLimit - currentRoth);
      if (typeof val === 'number' && val > maxAllow) { 
        safeVal = maxAllow; 
        setIraWarning(`Projected Max Reached: Combined limit is ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualLimit)}/yr.`); 
      } else { setIraWarning(''); }
      setTradIraContrib(safeVal);
    } else {
      const currentTrad = typeof tradIraContrib === 'number' ? tradIraContrib : 0;
      const maxAllow = Math.max(0, periodLimit - currentTrad);
      if (typeof val === 'number' && val > maxAllow) { 
        safeVal = maxAllow; 
        setIraWarning(`Projected Max Reached: Combined limit is ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualLimit)}/yr.`); 
      } else { setIraWarning(''); }
      setRothIraContrib(safeVal);
    }
  };

  // Prior 401(k)
  const [prior401kBal, setPrior401kBal] = useState(45000);

  // Mega Backdoor
  const [megaBal, setMegaBal] = useState(0);
  const [megaContrib, setMegaContrib] = useState(0);
  const [megaFreq, setMegaFreq] = useState<'Monthly' | 'Annual'>('Monthly');

  // Taxable Brokerage
  const [brokerageBalance, setBrokerageBalance] = useState(50000);
  const [brokerageContrib, setBrokerageContrib] = useState(500);
  const [brokerageFreq, setBrokerageFreq] = useState<'Monthly' | 'Annual'>('Monthly');
  const [brokerageContribStopAge, setBrokerageContribStopAge] = useState(55);

  // Debt
  const [debtStartDate, setDebtStartDate] = useState('2022-01');
  const [debtOriginal, setDebtOriginal] = useState(45000);
  const [debtCurrent, setDebtCurrent] = useState(35000);
  const [debtRate, setDebtRate] = useState(6.5);
  const [debtTerm, setDebtTerm] = useState(10);
  const [debtExtra, setDebtExtra] = useState(100);

  // Mortgage
  const [mortgageStartDate, setMortgageStartDate] = useState('2019-06');
  const [mortgageOriginal, setMortgageOriginal] = useState(500000);
  const [mortgageCurrent, setMortgageCurrent] = useState(450000);
  const [mortgageRate, setMortgageRate] = useState(5.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [mortgageExtra, setMortgageExtra] = useState(300);
  const [mortgageEscrow, setMortgageEscrow] = useState(500);

  // --- MATH ENGINE ---
  const results = useMemo(() => {
    const currentAge = currentYear - birthYear;
    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const baseFederalTenure = retireAge - ageStarted;
    const baseServiceForMultiplier = baseFederalTenure + priorService;
    const sickLeaveYears = sickLeaveDays / 360; 
    const totalCreditableService = baseServiceForMultiplier + sickLeaveYears;

    const meets11Bump = retireAge >= 62 && baseServiceForMultiplier >= 20;
    const fersMultiplier = meets11Bump ? 0.011 : 0.010;

    let y = yearsToRetire;
    let c = cola / 100;
    const salYrMinus2 = maxGradeSalary * Math.pow(1 + c, Math.max(0, y - 2));
    const salYrMinus1 = maxGradeSalary * Math.pow(1 + c, Math.max(0, y - 1));
    const salYr0 = maxGradeSalary * Math.pow(1 + c, Math.max(0, y));
    const high3 = (salYrMinus2 + salYrMinus1 + salYr0) / 3;

    let grossPension = high3 * fersMultiplier * totalCreditableService;
    let netPension = survivorBenefit ? grossPension * 0.9 : grossPension;

    // --- Unified Trajectory Engine ---
    
    let simTradTsp = tradTsp;
    let simRothTsp = rothTsp;
    let simSalary = currentSalary; 
    let yr1TradContrib = 0;
    let yr1RothContrib = 0;
    let yr1Match = 0;
    let maxedOutEarlyWarning = false;

    let simTradIra = tradIraBalance;
    let simRothIra = rothIraBalance;
    let simMega = megaBal;
    let yr1TradIra = 0, yr1RothIra = 0, yr1Mega = 0;

    let simBrokerage = brokerageBalance;
    let simPrior401k = prior401kBal;
    
    let runningCumulativeContribs = 0;
    const totalInitialBalances = tradTsp + rothTsp + tradIraBalance + rothIraBalance + prior401kBal + megaBal + brokerageBalance;

    let cumTradTsp = 0; let cumRothTsp = 0;
    let cumTradIra = 0; let cumRothIra = 0;
    let cumMega = 0; let cumBrokerage = 0;

    const trajectory = [{
        year: 0,
        portfolioInvested: totalInitialBalances,
        portfolioTotal: totalInitialBalances,
        tspTotalInvested: tradTsp + rothTsp,
        tspTotal: tradTsp + rothTsp,
        tspTradInvested: tradTsp,
        tspTrad: tradTsp,
        tspRothInvested: rothTsp,
        tspRoth: rothTsp,
        iraTotalInvested: tradIraBalance + rothIraBalance,
        iraTotal: tradIraBalance + rothIraBalance,
        iraTradInvested: tradIraBalance,
        iraTrad: tradIraBalance,
        iraRothInvested: rothIraBalance,
        iraRoth: rothIraBalance,
        brokerageInvested: brokerageBalance,
        brokerageTotal: brokerageBalance
    }];

    const annualR = marketReturn / 100;
    const tspReturnBiweekly = Math.pow(1 + annualR, 1 / 26) - 1;
    
    const iraPeriodsPerYear = iraFreq === 'Monthly' ? 12 : 1;
    const iraRatePerPeriod = Math.pow(1 + annualR, 1 / iraPeriodsPerYear) - 1;
    
    const broPeriodsPerYear = brokerageFreq === 'Monthly' ? 12 : 1;
    const broRatePerPeriod = Math.pow(1 + annualR, 1 / broPeriodsPerYear) - 1;
    
    const currentTspLimit = 24500 + (currentAge >= 60 && currentAge <= 63 ? 12000 : (currentAge >= 50 ? 8000 : 0));
    const currentIraLimit = 7500 + (currentAge >= 50 ? 1100 : 0);

    for (let yr = 0; yr < yearsToRetire; yr++) {
      let simAgeEndOfYear = currentAge + yr;
      
      // -- TSP LOGIC --
      let tspLimit = 24500;
      if (simAgeEndOfYear >= 60 && simAgeEndOfYear <= 63) tspLimit += 12000; 
      else if (simAgeEndOfYear >= 50) tspLimit += 8000; 

      let ytdTspContribs = 0;
      let biweeklyGross = simSalary / 26;
      let targetBiweeklyTrad = 0;
      let targetBiweeklyRoth = 0;

      if (isMaxTsp) {
        targetBiweeklyTrad = (tspLimit * (1 - (maxTspRothPct / 100))) / 26;
        targetBiweeklyRoth = (tspLimit * (maxTspRothPct / 100)) / 26;
      } else {
        targetBiweeklyTrad = tspInputMode === '%' ? biweeklyGross * ((typeof tradTspInput === 'number' ? tradTspInput : 0) / 100) : (typeof tradTspInput === 'number' ? tradTspInput : 0);
        targetBiweeklyRoth = tspInputMode === '%' ? biweeklyGross * ((typeof rothTspInput === 'number' ? rothTspInput : 0) / 100) : (typeof rothTspInput === 'number' ? rothTspInput : 0);
      }

      for (let pp = 0; pp < 26; pp++) {
        let availableRoom = Math.max(0, tspLimit - ytdTspContribs);
        let actualBiweeklyTrad = targetBiweeklyTrad;
        let actualBiweeklyRoth = targetBiweeklyRoth;

        if (actualBiweeklyTrad + actualBiweeklyRoth > availableRoom) {
          let totalTarget = actualBiweeklyTrad + actualBiweeklyRoth;
          if (totalTarget > 0 && availableRoom > 0) {
            actualBiweeklyTrad = availableRoom * (actualBiweeklyTrad / totalTarget);
            actualBiweeklyRoth = availableRoom * (actualBiweeklyRoth / totalTarget);
          } else {
            actualBiweeklyTrad = 0; actualBiweeklyRoth = 0;
          }
          if (!isMaxTsp && yr === 0 && pp < 25 && availableRoom === 0) maxedOutEarlyWarning = true;
        }

        let equivPct = ((actualBiweeklyTrad + actualBiweeklyRoth) / biweeklyGross) * 100;
        
        let matchRate = 1.0; 
        matchRate += Math.min(equivPct, 3.0); 
        if (equivPct > 3.0) matchRate += Math.min(equivPct - 3.0, 2.0) * 0.5; 
        let actualMatch = biweeklyGross * (matchRate / 100);

        simTradTsp = simTradTsp * (1 + tspReturnBiweekly) + actualBiweeklyTrad + actualMatch;
        simRothTsp = simRothTsp * (1 + tspReturnBiweekly) + actualBiweeklyRoth;
        ytdTspContribs += actualBiweeklyTrad + actualBiweeklyRoth;
        
        cumTradTsp += actualBiweeklyTrad + actualMatch;
        cumRothTsp += actualBiweeklyRoth;
        runningCumulativeContribs += (actualBiweeklyTrad + actualBiweeklyRoth + actualMatch);

        if (yr === 0) {
          yr1TradContrib += actualBiweeklyTrad;
          yr1RothContrib += actualBiweeklyRoth;
          yr1Match += actualMatch;
        }
      }
      simSalary *= (1 + (annualRaise / 100)); 

      // -- IRA LOGIC --
      let canContribIra = simAgeEndOfYear < iraContribStopAge;
      let iraLimit = 7500 + (simAgeEndOfYear >= 50 ? 1100 : 0);
      let megaLimit = 47500;
      let ytdIra = 0;
      let ytdMega = 0;
      let targetPeriodTradIra = 0;
      let targetPeriodRothIra = 0;

      if (canContribIra) {
        if (isMaxIra) {
          let annualTrad = iraLimit * (1 - (maxIraRothPct / 100));
          let annualRoth = iraLimit * (maxIraRothPct / 100);
          targetPeriodTradIra = iraFreq === 'Monthly' ? annualTrad / 12 : annualTrad;
          targetPeriodRothIra = iraFreq === 'Monthly' ? annualRoth / 12 : annualRoth;
        } else {
          targetPeriodTradIra = typeof tradIraContrib === 'number' ? tradIraContrib : 0;
          targetPeriodRothIra = typeof rothIraContrib === 'number' ? rothIraContrib : 0;
        }
      }
      let targetPeriodMega = megaContrib;

      for (let p = 0; p < iraPeriodsPerYear; p++) {
        let iraRoom = Math.max(0, iraLimit - ytdIra);
        let actTradIra = targetPeriodTradIra;
        let actRothIra = targetPeriodRothIra;
        let totIra = actTradIra + actRothIra;

        if (totIra > iraRoom) {
            if (totIra > 0) {
                actTradIra = iraRoom * (actTradIra / totIra);
                actRothIra = iraRoom * (actRothIra / totIra);
            } else { actTradIra = 0; actRothIra = 0; }
        } else if (totIra === 0) {
            actTradIra = 0; actRothIra = 0;
        }

        let megaRoom = Math.max(0, megaLimit - ytdMega);
        let actMega = targetPeriodMega > megaRoom ? megaRoom : targetPeriodMega;

        simTradIra = simTradIra * (1 + iraRatePerPeriod) + actTradIra;
        simRothIra = simRothIra * (1 + iraRatePerPeriod) + actRothIra;
        simMega = simMega * (1 + iraRatePerPeriod) + actMega;

        ytdIra += actTradIra + actRothIra;
        ytdMega += actMega;
        
        cumTradIra += actTradIra;
        cumRothIra += actRothIra;
        cumMega += actMega;
        runningCumulativeContribs += (actTradIra + actRothIra + actMega);

        if (yr === 0) {
          yr1TradIra += actTradIra; yr1RothIra += actRothIra; yr1Mega += actMega;
        }
      }

      // -- BROKERAGE LOGIC --
      let canContribBro = simAgeEndOfYear < brokerageContribStopAge;
      let targetPeriodBro = canContribBro ? brokerageContrib : 0;
      for (let p = 0; p < broPeriodsPerYear; p++) {
          simBrokerage = simBrokerage * (1 + broRatePerPeriod) + targetPeriodBro;
          cumBrokerage += targetPeriodBro;
          runningCumulativeContribs += targetPeriodBro;
      }
      
      // -- YEAR-END RECORDING --
      simPrior401k = prior401kBal * Math.pow(1 + annualR, yr + 1);
      
      trajectory.push({
          year: yr + 1,
          portfolioInvested: totalInitialBalances + runningCumulativeContribs,
          portfolioTotal: simTradTsp + simRothTsp + simTradIra + simRothIra + simMega + simBrokerage + simPrior401k,

          tspTotalInvested: (tradTsp + rothTsp) + cumTradTsp + cumRothTsp,
          tspTotal: simTradTsp + simRothTsp,
          tspTradInvested: tradTsp + cumTradTsp,
          tspTrad: simTradTsp,
          tspRothInvested: rothTsp + cumRothTsp,
          tspRoth: simRothTsp,

          iraTotalInvested: (tradIraBalance + rothIraBalance) + cumTradIra + cumRothIra,
          iraTotal: simTradIra + simRothIra,
          iraTradInvested: tradIraBalance + cumTradIra,
          iraTrad: simTradIra,
          iraRothInvested: rothIraBalance + cumRothIra,
          iraRoth: simRothIra,

          brokerageInvested: brokerageBalance + cumBrokerage,
          brokerageTotal: simBrokerage
      });
    }

    // --- Debt Engine ---
    const calcDebt = (origP: number, currentP: number, rate: number, t: number, extra: number, invRateAnnual: number) => {
      const r = (rate / 100) / 12; 
      const n = t * 12; 
      const minPmt = origP > 0 && r > 0 ? (origP * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : (n > 0 ? origP / n : 0);
      const newPmt = minPmt + extra;

      let monthsOrig = 0;
      if (currentP > 0 && minPmt > 0 && minPmt > currentP * r) {
        monthsOrig = Math.ceil(-Math.log(1 - (currentP * r) / minPmt) / Math.log(1 + r));
      } else if (currentP > 0) {
        monthsOrig = Infinity;
      }

      let monthsAcc = 0;
      if (currentP > 0 && newPmt > 0) {
        if (newPmt > currentP * r) { 
           monthsAcc = Math.ceil(-Math.log(1 - (currentP * r) / newPmt) / Math.log(1 + r)); 
        } 
        else { monthsAcc = Infinity; }
      }

      const current = new Date(); 
      const basePayoffDate = new Date(current);
      if (monthsOrig !== Infinity) basePayoffDate.setMonth(current.getMonth() + monthsOrig);
      const accPayoffDate = new Date(current);
      if (monthsAcc !== Infinity) accPayoffDate.setMonth(current.getMonth() + monthsAcc);

      const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const invRateMonthly = (invRateAnnual / 100) / 12;
      let fvInvestExtra = 0;
      let fvPayoffThenInvest = 0;

      if (monthsOrig !== Infinity && extra > 0 && invRateMonthly > 0) {
          fvInvestExtra = extra * ((Math.pow(1 + invRateMonthly, monthsOrig) - 1) / invRateMonthly);
      }
      if (monthsAcc !== Infinity && monthsAcc < monthsOrig && newPmt > 0 && invRateMonthly > 0) {
          const monthsRemainingFree = monthsOrig - monthsAcc;
          fvPayoffThenInvest = newPmt * ((Math.pow(1 + invRateMonthly, monthsRemainingFree) - 1) / invRateMonthly);
      }

      const investWins = fvInvestExtra > fvPayoffThenInvest;
      const diff = Math.abs(fvInvestExtra - fvPayoffThenInvest);

      return { 
        minPmt, newPmt, monthsOrig, monthsAcc, timeSaved: Math.max(0, monthsOrig - monthsAcc),
        basePayoffStr: monthsOrig === Infinity ? 'Never' : fmtDate(basePayoffDate),
        accPayoffStr: monthsAcc === Infinity ? 'Never' : fmtDate(accPayoffDate),
        invRateAnnual, fvInvestExtra, fvPayoffThenInvest, investWins, diff
      };
    };
    
    const standardDebtStats = calcDebt(debtOriginal, debtCurrent, debtRate, debtTerm, debtExtra, marketReturn);
    const mortgageStats = calcDebt(mortgageOriginal, mortgageCurrent, mortgageRate, mortgageTerm, mortgageExtra, marketReturn);

    // --- Cash Flow Engine ---
    const baseMonthlyGross = currentSalary / 12;
    const monthlyPreTaxTradTsp = yr1TradContrib / 12;
    
    const monthlyFersDeduction = baseMonthlyGross * (fersRate / 100);
    const monthlyPreTaxFehb = fehbPremium;
    
    const totalPreTax = monthlyPreTaxTradTsp + monthlyPreTaxFehb; 

    const totalMonthlyGross = baseMonthlyGross + supplementalIncome;
    let annualTaxableIncome = (baseMonthlyGross - totalPreTax) * 12;
    
    let totalFicaWages = currentSalary - (fehbPremium * 12); 

    if (supplementalTaxToggled) {
       annualTaxableIncome += (supplementalIncome * 12);
       totalFicaWages += (supplementalIncome * 12);
    }

    const stdDeduction = filingStatus === 'Married' ? 30800 : 15400;
    const incomeAfterDeduction = Math.max(0, annualTaxableIncome - stdDeduction);
    
    let annualFedTax = 0;
    const brackets = filingStatus === 'Married'
      ? [{l: 24500, r: 0.10}, {l: 99700, r: 0.12}, {l: 212500, r: 0.22}, {l: 405800, r: 0.24}, {l: 515200, r: 0.32}, {l: 772900, r: 0.35}, {l: Infinity, r: 0.37}]
      : [{l: 12250, r: 0.10}, {l: 49850, r: 0.12}, {l: 106250, r: 0.22}, {l: 202900, r: 0.24}, {l: 257600, r: 0.32}, {l: 386450, r: 0.35}, {l: Infinity, r: 0.37}];

    for (let i = 0, prevLimit = 0; i < brackets.length; i++) {
        const b = brackets[i];
        if (incomeAfterDeduction > prevLimit) {
            let taxableAtThisBracket = Math.min(incomeAfterDeduction, b.l) - prevLimit;
            annualFedTax += taxableAtThisBracket * b.r;
            prevLimit = b.l;
        } else break;
    }
    
    annualFedTax = Math.max(0, annualFedTax - (dependents * 2000));
    const monthlyFedTax = annualFedTax / 12;

    const annualOASDI = Math.min(totalFicaWages, 182700) * 0.062;
    const annualMedicare = totalFicaWages * 0.0145;
    const monthlyFica = (annualOASDI + annualMedicare) / 12;
    
    const totalTaxes = monthlyFedTax + monthlyFica;
    const netPaycheck = totalMonthlyGross - totalPreTax - monthlyFersDeduction - totalTaxes;

    const monthlyPostTaxRothTsp = yr1RothContrib / 12;
    const monthlyPostTaxTradIra = yr1TradIra / 12;
    const monthlyPostTaxRothIra = yr1RothIra / 12;
    const monthlyMega = yr1Mega / 12;
    const canContribBroYr1 = (currentYear - birthYear) < brokerageContribStopAge;
    const monthlyBrokerage = canContribBroYr1 ? (brokerageFreq === 'Monthly' ? brokerageContrib : brokerageContrib / 12) : 0;
    
    const totalPostTaxSavings = monthlyPostTaxRothTsp + monthlyPostTaxTradIra + monthlyPostTaxRothIra + monthlyMega + monthlyBrokerage;

    const monthlyLoansAndEscrow = (debtCurrent > 0 ? standardDebtStats.newPmt : 0) + (mortgageCurrent > 0 ? mortgageStats.newPmt : 0) + mortgageEscrow;
    const remainingToSpend = netPaycheck - totalPostTaxSavings - monthlyLoansAndEscrow;

    return {
      currentAge, yearsToRetire, baseServiceForMultiplier, sickLeaveYears, totalCreditableService,
      meets11Bump, fersMultiplier, high3, grossPension, netPension,
      currentTspLimit, currentIraLimit, simTradTsp, simRothTsp, totalTsp: simTradTsp + simRothTsp, 
      simTradIra, simRothIra, simMega, simPrior401k, simBrokerage,
      totalPortfolio: simTradTsp + simRothTsp + simTradIra + simRothIra + simMega + simPrior401k + simBrokerage,
      trajectory, 
      standardDebtStats, mortgageStats, maxedOutEarlyWarning, yr1Match,
      baseMonthlyGross, totalMonthlyGross, monthlyPreTaxTradTsp, monthlyFersDeduction, monthlyPreTaxFehb, totalPreTax,
      monthlyFedTax, monthlyFica, totalTaxes, netPaycheck,
      monthlyPostTaxRothTsp, monthlyPostTaxTradIra, monthlyPostTaxRothIra, monthlyMega, monthlyBrokerage, totalPostTaxSavings,
      monthlyLoansAndEscrow, remainingToSpend
    };
  }, [
    marketReturn, 
    currentYear, birthYear, ageStarted, retireAge, priorService, sickLeaveDays,
    maxGradeSalary, cola, survivorBenefit, fehb5Year, filingStatus, dependents, fersRate, fehbPremium, supplementalIncome, supplementalTaxToggled,
    currentSalary, annualRaise, tradTsp, rothTsp, isMaxTsp, maxTspRothPct, tspInputMode, tradTspInput, rothTspInput,
    tradIraBalance, rothIraBalance, isMaxIra, maxIraRothPct, tradIraContrib, rothIraContrib, iraContribStopAge, iraFreq,
    prior401kBal,
    megaBal, megaContrib, megaFreq, brokerageBalance, brokerageContrib, brokerageFreq, brokerageContribStopAge,
    debtOriginal, debtCurrent, debtRate, debtTerm, debtExtra,
    mortgageOriginal, mortgageCurrent, mortgageRate, mortgageTerm, mortgageExtra, mortgageEscrow
  ]);

  const fmtCur = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const fmtNum = (val: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(val);

  const icons = {
    user: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    building: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
    trending: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    piggy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.5-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/></svg>,
    chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>,
    creditCard: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    home: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    wallet: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>,
    check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    alert: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    archive: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
    sun: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    chevronDown: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    chevronUp: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
    printer: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 pb-12 flex flex-col transition-colors duration-300">
      <header className="bg-indigo-700 dark:bg-indigo-900 text-white py-6 px-6 shadow-md mb-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">F.E.R.A - Federal Employee Retirement Analyzer</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 ml-4 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition-colors shadow-sm rounded-lg text-sm font-medium"
              title="Save as PDF"
            >
              {icons.printer} <span className="hidden sm:inline">Save PDF</span>
            </button>
            <button 
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 rounded-full bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? icons.sun : icons.moon}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: INPUTS */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            <Card 
              title="Time & Service" icon={icons.user}
              info="Defines your Federal creditable tenure. Under OPM rules, 'Prior Service' includes bought-back military time. 'Sick Leave' adds to your multiplier using the 2,087-hour chart, but it does NOT count toward the 20-year requirement needed for the 1.1% bump."
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Birth Year"><NumberInput value={birthYear} onChange={(v) => typeof v === 'number' && setBirthYear(v)} /></Field>
                <Field label="Age Started Fed"><NumberInput value={ageStarted} onChange={(v) => typeof v === 'number' && setAgeStarted(v)} /></Field>
                <Field label="Target Retire Age"><NumberInput value={retireAge} onChange={(v) => typeof v === 'number' && setRetireAge(v)} /></Field>
                <Field label="Prior Uniformed Svc" description="Years bought back"><NumberInput value={priorService} onChange={(v) => typeof v === 'number' && setPriorService(v)} suffix="yrs" /></Field>
              </div>
              <Field label="Unused Sick Leave" description="Converts to creditable time (OPM 360-day yr)">
                <Slider value={sickLeaveDays} onChange={setSickLeaveDays} min={0} max={365} step={1} suffix=" days" />
              </Field>
            </Card>

            <Card 
              title="Tax & Cash Flow Parameters" icon={icons.wallet}
              info="Calculates paycheck using official 2026 IRS marginal tax brackets and the updated standard deduction. FERS rates: 0.8% (Legacy), 3.1% (FERS-Revised), or 4.4% (FERS-FRAE)."
            >
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Filing Status</label>
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                    <button type="button" onClick={() => setFilingStatus('Single')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filingStatus === 'Single' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Single</button>
                    <button type="button" onClick={() => setFilingStatus('Married')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filingStatus === 'Married' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Married</button>
                  </div>
                </div>
                <Field label="Dependents"><NumberInput value={dependents} onChange={(v) => typeof v === 'number' && setDependents(v)} min={0} /></Field>
                <Field label="FERS Contribution Rate" description="0.8%, 3.1%, or 4.4%"><NumberInput value={fersRate} onChange={(v) => typeof v === 'number' && setFersRate(v)} suffix="%" step={0.1} /></Field>
                <Field label="FEHB Healthcare Prem." description="Monthly Pre-Tax"><NumberInput value={fehbPremium} onChange={(v) => typeof v === 'number' && setFehbPremium(v)} prefix="$" /></Field>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                 <Field label="Supplemental Income" description="Second job, VA disability, etc."><NumberInput value={supplementalIncome} onChange={(v) => typeof v === 'number' && setSupplementalIncome(v)} prefix="$" /></Field>
                 <div className="flex flex-col justify-end">
                   <Toggle active={supplementalTaxToggled} onChange={setSupplementalTaxToggled} label="Apply Taxes to this Income?" />
                 </div>
              </div>
            </Card>

            <Card 
              title="FERS Pension Parameters" icon={icons.building}
              info="Your gross FERS annuity uses your 'High-3' salary average. At 62+ with 20+ years, multiplier is 1.1%. Survivor benefit reduces pension by 10% to guarantee 50% for your spouse."
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Max Grade Salary"><NumberInput value={maxGradeSalary} onChange={(v) => typeof v === 'number' && setMaxGradeSalary(v)} prefix="$" /></Field>
                <Field label="Est. Annual COLA"><NumberInput value={cola} onChange={(v) => typeof v === 'number' && setCola(v)} suffix="%" step={0.1} /></Field>
              </div>
              <Toggle active={survivorBenefit} onChange={setSurvivorBenefit} label="Include Max Survivor Benefit (-10%)" />
              <Toggle active={fehb5Year} onChange={setFehb5Year} label="Meet 5-Year FEHB Rule?" />
            </Card>

            <Card 
              title="Thrift Savings Plan (TSP)" icon={icons.trending}
              info="Strictly applies 2026 Projected limits: $24,500 base | $8,000 standard Catch-Up (Age 50+) | $12,000 SECURE 2.0 Super Catch-Up (Ages 60-63). Auto-Max calculates absolute legal limit yearly based on age."
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Current Federal Salary" description="Excludes supplemental"><NumberInput value={currentSalary} onChange={(v) => typeof v === 'number' && setCurrentSalary(v)} prefix="$" /></Field>
                <Field label="Est. Annual Raise"><NumberInput value={annualRaise} onChange={(v) => typeof v === 'number' && setAnnualRaise(v)} suffix="%" step={0.1} /></Field>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mt-2 mb-2 transition-colors">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Current TSP Balances</div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Traditional Bal"><NumberInput value={tradTsp} onChange={(v) => typeof v === 'number' && setTradTsp(v)} prefix="$" /></Field>
                  <Field label="Roth Bal"><NumberInput value={rothTsp} onChange={(v) => typeof v === 'number' && setRothTsp(v)} prefix="$" /></Field>
                </div>
              </div>

              <Toggle active={isMaxTsp} onChange={setIsMaxTsp} label="Auto-Max IRS Contributions" accent="emerald" />

              {isMaxTsp ? (
                <div className="mt-4 p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-sm text-emerald-800 dark:text-emerald-300 font-semibold mb-3">
                    Contributing IRS Max every year. (Current yr limit: {fmtCur(results.currentTspLimit)})
                  </div>
                  <Field label="Contribution Split (Trad vs Roth)" description={`Currently: ${100 - maxTspRothPct}% Trad / ${maxTspRothPct}% Roth`}>
                    <Slider value={maxTspRothPct} onChange={setMaxTspRothPct} min={0} max={100} step={1} suffix="% Roth" />
                  </Field>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="flex flex-col gap-1.5">
                     <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                        <button type="button" onClick={() => setTspInputMode('%')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tspInputMode === '%' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>% of Salary</button>
                        <button type="button" onClick={() => setTspInputMode('$')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tspInputMode === '$' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>$ per Pay Period</button>
                     </div>
                  </div>
                  {tspInputMode === '%' ? (
                    <>
                      <Field label="Trad Contribution Rate"><Slider value={typeof tradTspInput === 'number' ? tradTspInput : 0} onChange={setTradTspInput} min={0} max={100} step={1} suffix="%" /></Field>
                      <Field label="Roth Contribution Rate"><Slider value={typeof rothTspInput === 'number' ? rothTspInput : 0} onChange={setRothTspInput} min={0} max={100} step={1} suffix="%" /></Field>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Trad Contrib. (Bi-weekly)"><NumberInput value={tradTspInput} onChange={setTradTspInput} prefix="$" /></Field>
                      <Field label="Roth Contrib. (Bi-weekly)"><NumberInput value={rothTspInput} onChange={setRothTspInput} prefix="$" /></Field>
                    </div>
                  )}
                </div>
              )}
            </Card>

            <Card 
              title="Individual Retirement Accounts" icon={icons.piggy}
              info="IRAs are private tax-advantaged accounts. Under updated 2026 Projected rules, combined limits are capped at $7,500/yr (or $8,600 if Age 50+)."
            >
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-700 pb-4 mb-2">
                <Field label="Trad IRA Balance"><NumberInput value={tradIraBalance} onChange={(v) => typeof v === 'number' && setTradIraBalance(v)} prefix="$" /></Field>
                <Field label="Roth IRA Balance"><NumberInput value={rothIraBalance} onChange={(v) => typeof v === 'number' && setRothIraBalance(v)} prefix="$" /></Field>
              </div>
              
              <Toggle active={isMaxIra} onChange={setIsMaxIra} label="Auto-Max IRS Contributions" accent="emerald" />

              {isMaxIra ? (
                <div className="mt-4 p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-sm text-emerald-800 dark:text-emerald-300 font-semibold mb-3">
                    Contributing IRS Max every year. (Current yr limit: {fmtCur(results.currentIraLimit)})
                  </div>
                  <Field label="Contribution Split (Trad vs Roth)" description={`Currently: ${100 - maxIraRothPct}% Trad / ${maxIraRothPct}% Roth`}>
                    <Slider value={maxIraRothPct} onChange={setMaxIraRothPct} min={0} max={100} step={1} suffix="% Roth" />
                  </Field>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">Planned Contributions</label>
                  
                  {iraWarning && (
                    <div className="mb-3 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-2 rounded border border-amber-200 dark:border-amber-800 flex items-center gap-2">
                      <span>{icons.alert}</span> <span>{iraWarning}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                      <Field label="To Traditional IRA">
                           <NumberInput value={tradIraContrib} onChange={(val) => handleIraInput('Trad', val)} prefix="$" />
                      </Field>
                      <Field label="To Roth IRA">
                           <NumberInput value={rothIraContrib} onChange={(val) => handleIraInput('Roth', val)} prefix="$" />
                      </Field>
                    </div>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <Field label="Stop Contributions At Age" description="Age to stop adding funds">
                        <NumberInput value={iraContribStopAge} onChange={(v) => typeof v === 'number' && setIraContribStopAge(v)} />
                  </Field>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Frequency</label>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                      <button type="button" onClick={() => handleIraFreqChange('Monthly')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${iraFreq === 'Monthly' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Monthly</button>
                      <button type="button" onClick={() => handleIraFreqChange('Annual')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${iraFreq === 'Annual' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Annual</button>
                    </div>
                  </div>
              </div>
            </Card>

            <Card 
              title="Global Market Assumptions" icon={icons.trending}
              info="Sets the expected annual rate of return across all of your investment accounts."
            >
              <Field label="Expected Annual Market Return">
                <Slider value={marketReturn} onChange={setMarketReturn} min={3} max={15} step={0.1} suffix="%" />
              </Field>
            </Card>

            <Card 
              title="Standard Debt Amortization" icon={icons.creditCard}
            >
               <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <Field label="Loan Start Date"><MonthInput value={debtStartDate} onChange={setDebtStartDate} /></Field>
                <Field label="Original Loan Amount"><NumberInput value={debtOriginal} onChange={(v) => typeof v === 'number' && setDebtOriginal(v)} prefix="$" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Current Balance"><NumberInput value={debtCurrent} onChange={(v) => typeof v === 'number' && setDebtCurrent(v)} prefix="$" /></Field>
                <Field label="Original Term (Years)"><NumberInput value={debtTerm} onChange={(v) => typeof v === 'number' && setDebtTerm(v)} /></Field>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Field label="Interest Rate"><NumberInput value={debtRate} onChange={(v) => typeof v === 'number' && setDebtRate(v)} suffix="%" step={0.1} /></Field>
                <Field label="Extra Monthly Principal"><NumberInput value={debtExtra} onChange={(v) => typeof v === 'number' && setDebtExtra(v)} prefix="$" /></Field>
              </div>
            </Card>

            <Card 
              title="Mortgage Amortization" icon={icons.home}
            >
               <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
                <Field label="Loan Start Date"><MonthInput value={mortgageStartDate} onChange={setMortgageStartDate} /></Field>
                <Field label="Original Loan Amount"><NumberInput value={mortgageOriginal} onChange={(v) => typeof v === 'number' && setMortgageOriginal(v)} prefix="$" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Current Balance"><NumberInput value={mortgageCurrent} onChange={(v) => typeof v === 'number' && setMortgageCurrent(v)} prefix="$" /></Field>
                <Field label="Original Term (Years)"><NumberInput value={mortgageTerm} onChange={(v) => typeof v === 'number' && setMortgageTerm(v)} /></Field>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Field label="Interest Rate"><NumberInput value={mortgageRate} onChange={(v) => typeof v === 'number' && setMortgageRate(v)} suffix="%" step={0.1} /></Field>
                <Field label="Extra Monthly Principal"><NumberInput value={mortgageExtra} onChange={(v) => typeof v === 'number' && setMortgageExtra(v)} prefix="$" /></Field>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Field label="Monthly Escrow (Tax/Ins)"><NumberInput value={mortgageEscrow} onChange={(v) => typeof v === 'number' && setMortgageEscrow(v)} prefix="$" /></Field>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: DASHBOARD */}
          <div className="lg:col-span-7">
            <div className="sticky top-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <div className="bg-indigo-600 dark:bg-indigo-700 rounded-xl p-6 text-white shadow-lg overflow-hidden transition-colors w-full">
                  <p className="text-indigo-100 text-sm font-medium mb-1">Projected Annual FERS Pension (Net)</p>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {fmtCur(results.netPension)} <span className="text-xl font-normal opacity-75">/yr</span>
                  </h2>
                  <p className="text-indigo-200 text-sm mt-2">{fmtCur(results.netPension / 12)} per month</p>
                </div>
                
                <div 
                  className="bg-emerald-600 dark:bg-emerald-700 rounded-xl text-white shadow-lg overflow-hidden transition-all cursor-pointer hover:bg-emerald-500 dark:hover:bg-emerald-600 border border-transparent dark:border-emerald-600"
                  onClick={() => setIsPortfolioExpanded(!isPortfolioExpanded)}
                >
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium mb-1">Total Future Portfolio</p>
                      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        {fmtCur(results.totalPortfolio)}
                      </h2>
                      <p className="text-emerald-200 text-sm mt-2">
                        {isPortfolioExpanded ? "Tap to collapse breakdown" : "Tap to view exact breakdown"}
                      </p>
                    </div>
                    <div className="text-emerald-100 bg-emerald-700/50 p-2 rounded-full">
                      {isPortfolioExpanded ? icons.chevronUp : icons.chevronDown}
                    </div>
                  </div>

                  {isPortfolioExpanded && (
                    <div className="px-6 pb-6 pt-4 border-t border-emerald-500/50 dark:border-emerald-600/50 bg-emerald-700/30 dark:bg-emerald-800/40">
                      <div className="space-y-3 text-sm sm:text-base">
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-100">Thrift Savings Plan (TSP)</span>
                          <span className="font-bold">{fmtCur(results.totalTsp)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-100">Individual IRAs</span>
                          <span className="font-bold">{fmtCur(results.simTradIra + results.simRothIra)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-100">Taxable Brokerage</span>
                          <span className="font-bold">{fmtCur(results.simBrokerage)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-100">Mega Backdoor / Alt</span>
                          <span className="font-bold">{fmtCur(results.simMega)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-100">Prior Legacy 401(k)</span>
                          <span className="font-bold">{fmtCur(results.simPrior401k)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MONTHLY CASH FLOW */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 relative overflow-hidden transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-5 gap-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    {icons.wallet} Monthly Cash Flow
                  </h3>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                    <span className="font-semibold text-base">Gross Monthly Income</span>
                    <span className="font-bold text-base">{fmtCur(results.totalMonthlyGross)}</span>
                  </div>
                  
                  {supplementalIncome > 0 && (
                    <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-1 mb-2 text-xs">
                       <div className="flex justify-between text-slate-500 dark:text-slate-400">
                         <span>Federal Base Salary</span>
                         <span>{fmtCur(results.baseMonthlyGross)}</span>
                       </div>
                       <div className="flex justify-between text-slate-500 dark:text-slate-400">
                         <span>Supplemental Income {supplementalTaxToggled ? '(Taxable)' : '(Tax-Free)'}</span>
                         <span className="text-emerald-600 dark:text-emerald-400">+{fmtCur(supplementalIncome)}</span>
                       </div>
                    </div>
                  )}
                  
                  <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Pre-Tax Deductions <span className="text-xs">(TSP, FEHB)</span></span>
                      <span className="text-rose-600 dark:text-rose-400">-{fmtCur(results.totalPreTax)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Taxes <span className="text-xs">(Fed Income + FICA)</span></span>
                      <span className="text-rose-600 dark:text-rose-400">-{fmtCur(results.totalTaxes)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Post-Tax FERS Deduction</span>
                      <span className="text-rose-600 dark:text-rose-400">-{fmtCur(results.monthlyFersDeduction)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Net Take-Home Pay</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{fmtCur(results.netPaycheck)}</span>
                  </div>

                  <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Post-Tax Savings <span className="text-xs">(Roth, IRAs, Brok)</span></span>
                      <span className="text-amber-600 dark:text-amber-500">-{fmtCur(results.totalPostTaxSavings)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Debt & Escrow <span className="text-xs">(Loans + Mtg + Esc)</span></span>
                      <span className="text-amber-600 dark:text-amber-500">-{fmtCur(results.monthlyLoansAndEscrow)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/50 mt-2">
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 text-base">Remaining Spendable Cash</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-50 text-2xl">{fmtCur(results.remainingToSpend)}</span>
                  </div>
                </div>
              </div>

              {/* FERS Breakdown */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                  {icons.building} FERS Retirement Summary
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Years until Retirement</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{results.yearsToRetire}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Base Svc + Buyback</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{results.baseServiceForMultiplier} yrs</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Sick Leave Conversion</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">+{fmtNum(results.sickLeaveYears)} yrs</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Total Creditable Service</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{fmtNum(results.totalCreditableService)} yrs</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">Multiplier</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{(results.fersMultiplier * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                    <span className="text-slate-500 dark:text-slate-400">High-3 Salary</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{fmtCur(results.high3)}</span>
                  </div>
                </div>

                <div className={`mt-5 p-3 rounded-lg flex items-start gap-3 border ${fehb5Year ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'}`}>
                  <div className="mt-0.5">{fehb5Year ? icons.check : icons.alert}</div>
                  <div className="text-sm">
                    <strong className="block">{fehb5Year ? 'FEHB Eligible' : 'FEHB Alert'}</strong>
                    {fehb5Year 
                      ? 'Meeting the 5-year enrollment requirement.' 
                      : 'You must have 5 years of FEHB before retirement to carry it over.'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <PortfolioChart data={results.trajectory} />

        <div className="flex justify-center mt-8 mb-4 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors shadow-md"
          >
            {icons.printer} Save Page as PDF
          </button>
        </div>
      </main>

      <footer className="py-10 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs sm:text-sm w-full">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <p className="font-bold uppercase tracking-widest text-slate-200">
            F.E.R.A Disclaimer
          </p>
          <p className="leading-relaxed">
            Hypothetical simulation for educational purposes. Projections based on user inputs and projected 2026 limits. 
            Not affiliated with OPM or any government agency. Consult a financial professional for advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
