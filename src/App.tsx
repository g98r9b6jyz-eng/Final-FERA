import React, { useState, useMemo, useEffect } from 'react';

// --- Reusable UI Components ---
const Card = ({ title, icon, info, children }) => {
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

const Field = ({ label, children, description }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    {description && <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">{description}</span>}
    {children}
  </div>
);

const NumberInput = ({ value, onChange, prefix, suffix, min, max, step = 1, disabled = false }) => {
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

const MonthInput = ({ value, onChange }) => {
  return (
    <input
      type="month" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full border py-2 px-3 outline-none text-sm rounded-lg transition-shadow bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
    />
  );
};

const Slider = ({ value, onChange, min, max, step = 1, suffix = '' }) => (
  <div className="flex items-center gap-4">
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400" />
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[3.5rem] text-right">{value}{suffix}</span>
  </div>
);

const Toggle = ({ active, onChange, label, accent = "indigo" }) => (
  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors h-full">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 pr-2 leading-tight">{label}</span>
    <button onClick={() => onChange(!active)} className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? (accent==='emerald' ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-500') : 'bg-slate-300 dark:bg-slate-600'}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

// --- Main Application ---
export default function App() {
  const currentYear = new Date().getFullYear();

  // Application State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState(false);
  const [isStandardDebtExpanded, setIsStandardDebtExpanded] = useState(false);
  const [isMortgageExpanded, setIsMortgageExpanded] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Time & Service
  const [birthYear, setBirthYear] = useState(1985);
  const [ageStarted, setAgeStarted] = useState(25);
  const [retireAge, setRetireAge] = useState(62);
  const [priorService, setPriorService] = useState(4);
  const [sickLeaveDays, setSickLeaveDays] = useState(180);

  // Taxes & Cash Flow Info
  const [filingStatus, setFilingStatus] = useState('Married');
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
  const [tspInputMode, setTspInputMode] = useState('%'); 
  const [tradTspInput, setTradTspInput] = useState(5.0);
  const [rothTspInput, setRothTspInput] = useState(0.0);
  const [tspReturn, setTspReturn] = useState(7.0);

  // IRA
  const [tradIraBalance, setTradIraBalance] = useState(10000);
  const [rothIraBalance, setRothIraBalance] = useState(10000);
  const [tradIraContrib, setTradIraContrib] = useState(0);
  const [rothIraContrib, setRothIraContrib] = useState(583); 
  const [iraFreq, setIraFreq] = useState('Monthly');
  const [iraReturn, setIraReturn] = useState(7.0);
  const [iraWarning, setIraWarning] = useState('');

  const handleIraFreqChange = (newFreq) => {
    if (newFreq === iraFreq) return;
    if (newFreq === 'Monthly') {
       setTradIraContrib(Math.round(tradIraContrib / 12));
       setRothIraContrib(Math.round(rothIraContrib / 12));
    } else {
       setTradIraContrib(Math.round(tradIraContrib * 12));
       setRothIraContrib(Math.round(rothIraContrib * 12));
    }
    setIraFreq(newFreq);
    setIraWarning('');
  };

  const handleIraInput = (type, val) => {
    const annualLimit = (currentYear - birthYear) >= 50 ? 8000 : 7000;
    const periodLimit = iraFreq === 'Monthly' ? annualLimit / 12 : annualLimit;
    
    let safeVal = val;
    if (type === 'Trad') {
      const maxAllow = Math.max(0, periodLimit - rothIraContrib);
      if (val > maxAllow) { 
        safeVal = maxAllow; 
        setIraWarning(`2026 IRS Max Reached: Combined limit is ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualLimit)}/yr.`); 
      } else { setIraWarning(''); }
      setTradIraContrib(safeVal);
    } else {
      const maxAllow = Math.max(0, periodLimit - tradIraContrib);
      if (val > maxAllow) { 
        safeVal = maxAllow; 
        setIraWarning(`2026 IRS Max Reached: Combined limit is ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualLimit)}/yr.`); 
      } else { setIraWarning(''); }
      setRothIraContrib(safeVal);
    }
  };

  // Prior 401(k)
  const [prior401kBal, setPrior401kBal] = useState(45000);
  const [prior401kReturn, setPrior401kReturn] = useState(7.0);

  // Mega Backdoor
  const [megaBal, setMegaBal] = useState(0);
  const [megaContrib, setMegaContrib] = useState(0);
  const [megaFreq, setMegaFreq] = useState('Monthly');

  // Taxable Brokerage
  const [brokerageBalance, setBrokerageBalance] = useState(50000);
  const [brokerageContrib, setBrokerageContrib] = useState(500);
  const [brokerageFreq, setBrokerageFreq] = useState('Monthly');
  const [brokerageReturn, setBrokerageReturn] = useState(7.0);

  // Debt (Mid-stream updating)
  const [debtStartDate, setDebtStartDate] = useState('2022-01');
  const [debtOriginal, setDebtOriginal] = useState(45000);
  const [debtCurrent, setDebtCurrent] = useState(35000);
  const [debtRate, setDebtRate] = useState(6.5);
  const [debtTerm, setDebtTerm] = useState(10);
  const [debtExtra, setDebtExtra] = useState(100);
  const [debtInvestReturn, setDebtInvestReturn] = useState(7.0); // Interactive Opportunity Cost

  // Mortgage (Mid-stream updating)
  const [mortgageStartDate, setMortgageStartDate] = useState('2019-06');
  const [mortgageOriginal, setMortgageOriginal] = useState(500000);
  const [mortgageCurrent, setMortgageCurrent] = useState(450000);
  const [mortgageRate, setMortgageRate] = useState(5.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [mortgageExtra, setMortgageExtra] = useState(300);
  const [mortgageEscrow, setMortgageEscrow] = useState(500);
  const [mortgageInvestReturn, setMortgageInvestReturn] = useState(7.0); // Interactive Opportunity Cost

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

    // --- TSP Loop with Strict 2026 Limits ---
    let simTradTsp = tradTsp;
    let simRothTsp = rothTsp;
    let simSalary = currentSalary; 
    const tspReturnBiweekly = (tspReturn / 100) / 26;
    
    let yr1TradContrib = 0;
    let yr1RothContrib = 0;
    let yr1Match = 0;
    let maxedOutEarlyWarning = false;
    let currentTspLimit = 24500 + (currentAge >= 60 && currentAge <= 63 ? 11250 : (currentAge >= 50 ? 7500 : 0));

    for (let yr = 0; yr < yearsToRetire; yr++) {
      let simAgeEndOfYear = currentAge + yr;
      let tspLimit = 24500;
      if (simAgeEndOfYear >= 60 && simAgeEndOfYear <= 63) tspLimit += 11250; 
      else if (simAgeEndOfYear >= 50) tspLimit += 7500; 

      let ytdTspContribs = 0;
      let biweeklyGross = simSalary / 26;

      let targetBiweeklyTrad = 0;
      let targetBiweeklyRoth = 0;

      if (isMaxTsp) {
        targetBiweeklyTrad = (tspLimit * (1 - (maxTspRothPct / 100))) / 26;
        targetBiweeklyRoth = (tspLimit * (maxTspRothPct / 100)) / 26;
      } else {
        targetBiweeklyTrad = tspInputMode === '%' ? biweeklyGross * (tradTspInput / 100) : tradTspInput;
        targetBiweeklyRoth = tspInputMode === '%' ? biweeklyGross * (rothTspInput / 100) : rothTspInput;
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
        let matchRate = 0;
        if (equivPct > 0) matchRate += 1.0;
        matchRate += Math.min(equivPct, 3.0);
        if (equivPct > 3.0) matchRate += Math.min(equivPct - 3.0, 2.0) * 0.5;
        let actualMatch = biweeklyGross * (matchRate / 100);

        simTradTsp = simTradTsp * (1 + tspReturnBiweekly) + actualBiweeklyTrad + actualMatch;
        simRothTsp = simRothTsp * (1 + tspReturnBiweekly) + actualBiweeklyRoth;
        ytdTspContribs += actualBiweeklyTrad + actualBiweeklyRoth;

        if (yr === 0) {
          yr1TradContrib += actualBiweeklyTrad;
          yr1RothContrib += actualBiweeklyRoth;
          yr1Match += actualMatch;
        }
      }
      simSalary *= (1 + (annualRaise / 100)); 
    }

    // --- IRA Loop ---
    let simTradIra = tradIraBalance;
    let simRothIra = rothIraBalance;
    let simMega = megaBal;
    
    let yr1TradIra = 0, yr1RothIra = 0, yr1Mega = 0;
    const iraRatePerPeriod = iraFreq === 'Monthly' ? (iraReturn / 100) / 12 : (iraReturn / 100);
    const periodsPerYear = iraFreq === 'Monthly' ? 12 : 1;

    for (let yr = 0; yr < yearsToRetire; yr++) {
      let simAgeEndOfYear = currentAge + yr;
      let iraLimit = 7000 + (simAgeEndOfYear >= 50 ? 1000 : 0);
      let megaLimit = 47500; 

      let ytdIra = 0;
      let ytdMega = 0;
      
      let targetPeriodTradIra = tradIraContrib;
      let targetPeriodRothIra = rothIraContrib;
      let targetPeriodMega = megaContrib; 

      for (let p = 0; p < periodsPerYear; p++) {
         let iraRoom = Math.max(0, iraLimit - ytdIra);
         let actTradIra = targetPeriodTradIra;
         let actRothIra = targetPeriodRothIra;
         if (actTradIra + actRothIra > iraRoom) {
            let totIra = actTradIra + actRothIra;
            if (totIra > 0 && iraRoom > 0) {
               actTradIra = iraRoom * (actTradIra / totIra);
               actRothIra = iraRoom * (actRothIra / totIra);
            } else { actTradIra = 0; actRothIra = 0; }
         }

         let megaRoom = Math.max(0, megaLimit - ytdMega);
         let actMega = targetPeriodMega > megaRoom ? megaRoom : targetPeriodMega;

         simTradIra = simTradIra * (1 + iraRatePerPeriod) + actTradIra;
         simRothIra = simRothIra * (1 + iraRatePerPeriod) + actRothIra;
         simMega = simMega * (1 + iraRatePerPeriod) + actMega;

         ytdIra += actTradIra + actRothIra;
         ytdMega += actMega;

         if (yr === 0) {
           yr1TradIra += actTradIra; yr1RothIra += actRothIra; yr1Mega += actMega;
         }
      }
    }

    // --- Prior 401(k) & Brokerage ---
    let simPrior401k = prior401kBal * Math.pow(1 + (prior401kReturn / 100), yearsToRetire);

    let simBrokerage = brokerageBalance;
    const broRatePerPeriod = brokerageFreq === 'Monthly' ? (brokerageReturn / 100) / 12 : (brokerageReturn / 100);
    const broPeriods = brokerageFreq === 'Monthly' ? yearsToRetire * 12 : yearsToRetire;
    for (let p = 0; p < broPeriods; p++) { simBrokerage = simBrokerage * (1 + broRatePerPeriod) + brokerageContrib; }

    // --- Advanced Date-Based Debt Engine ---
    const calcDebt = (origP, currentP, rate, t, extra, startStr, invRateAnnual) => {
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

      // Date Math
      const start = startStr ? new Date(`${startStr}-01T00:00:00`) : new Date();
      const current = new Date(); // Engine runs based on present day relative to inputs
      
      const basePayoffDate = new Date(current);
      if (monthsOrig !== Infinity) basePayoffDate.setMonth(current.getMonth() + monthsOrig);

      const accPayoffDate = new Date(current);
      if (monthsAcc !== Infinity) accPayoffDate.setMonth(current.getMonth() + monthsAcc);

      const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      // Opportunity Cost logic using User Slider
      const invRateMonthly = (invRateAnnual / 100) / 12;
      let fvInvestExtra = 0;
      let fvPayoffThenInvest = 0;

      if (monthsOrig !== Infinity && extra > 0) {
          fvInvestExtra = extra * ((Math.pow(1 + invRateMonthly, monthsOrig) - 1) / invRateMonthly);
      }

      if (monthsAcc !== Infinity && monthsAcc < monthsOrig && newPmt > 0) {
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
    
    const standardDebtStats = calcDebt(debtOriginal, debtCurrent, debtRate, debtTerm, debtExtra, debtStartDate, debtInvestReturn);
    const mortgageStats = calcDebt(mortgageOriginal, mortgageCurrent, mortgageRate, mortgageTerm, mortgageExtra, mortgageStartDate, mortgageInvestReturn);

    // ==========================================
    // 2026 CASH FLOW & TAX ENGINE
    // ==========================================
    const baseMonthlyGross = currentSalary / 12;
    const monthlyPreTaxTradTsp = yr1TradContrib / 12;
    const monthlyPreTaxFers = baseMonthlyGross * (fersRate / 100);
    const monthlyPreTaxFehb = fehbPremium;
    const totalPreTax = monthlyPreTaxTradTsp + monthlyPreTaxFers + monthlyPreTaxFehb;

    const totalMonthlyGross = baseMonthlyGross + supplementalIncome;
    let annualTaxableIncome = (baseMonthlyGross - totalPreTax) * 12;
    let totalFicaWages = currentSalary;

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

    let prevLimit = 0;
    for (let b of brackets) {
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
    const netPaycheck = totalMonthlyGross - totalPreTax - totalTaxes;

    const monthlyPostTaxRothTsp = yr1RothContrib / 12;
    const monthlyPostTaxTradIra = yr1TradIra / 12;
    const monthlyPostTaxRothIra = yr1RothIra / 12;
    const monthlyMega = yr1Mega / 12;
    const monthlyBrokerage = brokerageFreq === 'Monthly' ? brokerageContrib : brokerageContrib / 12;
    const totalPostTaxSavings = monthlyPostTaxRothTsp + monthlyPostTaxTradIra + monthlyPostTaxRothIra + monthlyMega + monthlyBrokerage;

    const monthlyLoansAndEscrow = (debtCurrent > 0 ? standardDebtStats.newPmt : 0) + (mortgageCurrent > 0 ? mortgageStats.newPmt : 0) + mortgageEscrow;
    const remainingToSpend = netPaycheck - totalPostTaxSavings - monthlyLoansAndEscrow;

    return {
      currentAge, yearsToRetire, baseServiceForMultiplier, sickLeaveYears, totalCreditableService,
      meets11Bump, fersMultiplier, high3, grossPension, netPension,
      currentTspLimit, simTradTsp, simRothTsp, totalTsp: simTradTsp + simRothTsp, 
      simTradIra, simRothIra, simMega, simPrior401k, simBrokerage,
      totalPortfolio: simTradTsp + simRothTsp + simTradIra + simRothIra + simMega + simPrior401k + simBrokerage,
      standardDebtStats, mortgageStats, maxedOutEarlyWarning, yr1Match,
      baseMonthlyGross, totalMonthlyGross, monthlyPreTaxTradTsp, monthlyPreTaxFers, monthlyPreTaxFehb, totalPreTax,
      monthlyFedTax, monthlyFica, totalTaxes, netPaycheck,
      monthlyPostTaxRothTsp, monthlyPostTaxTradIra, monthlyPostTaxRothIra, monthlyMega, monthlyBrokerage, totalPostTaxSavings,
      monthlyLoansAndEscrow, remainingToSpend
    };
  }, [
    currentYear, birthYear, ageStarted, retireAge, priorService, sickLeaveDays,
    maxGradeSalary, cola, survivorBenefit, fehb5Year, filingStatus, dependents, fersRate, fehbPremium, supplementalIncome, supplementalTaxToggled,
    currentSalary, annualRaise, tradTsp, rothTsp, isMaxTsp, maxTspRothPct, tspInputMode, tradTspInput, rothTspInput, tspReturn,
    tradIraBalance, rothIraBalance, tradIraContrib, rothIraContrib, iraFreq, iraReturn,
    prior401kBal, prior401kReturn,
    megaBal, megaContrib, megaFreq, brokerageBalance, brokerageContrib, brokerageFreq, brokerageReturn,
    debtStartDate, debtOriginal, debtCurrent, debtRate, debtTerm, debtExtra, debtInvestReturn,
    mortgageStartDate, mortgageOriginal, mortgageCurrent, mortgageRate, mortgageTerm, mortgageExtra, mortgageEscrow, mortgageInvestReturn
  ]);

  const fmtCur = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const fmtNum = (val) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(val);

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
    chevronUp: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 pb-12 flex flex-col transition-colors duration-300">
      <header className="bg-indigo-700 dark:bg-indigo-900 text-white py-6 px-6 shadow-md mb-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">F.E.R.A - Federal Employee Retirement Analyzer</h1>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 rounded-full bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition-colors shadow-sm shrink-0 ml-4"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? icons.sun : icons.moon}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* LEFT COLUMN: INPUTS */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card 
            title="Time & Service" icon={icons.user}
            info="Defines your Federal creditable tenure. Under OPM rules, 'Prior Service' includes bought-back military time which adds directly to your base years. 'Sick Leave' adds to your pension multiplier time using the 2,087-hour chart (roughly 1 month = 174 hours) but by law, it does NOT count toward the 20-year requirement needed to unlock the 1.1% multiplier bump at age 62."
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Birth Year"><NumberInput value={birthYear} onChange={setBirthYear} /></Field>
              <Field label="Age Started Fed"><NumberInput value={ageStarted} onChange={setAgeStarted} /></Field>
              <Field label="Target Retire Age"><NumberInput value={retireAge} onChange={setRetireAge} /></Field>
              <Field label="Prior Uniformed Svc" description="Years bought back"><NumberInput value={priorService} onChange={setPriorService} suffix="yrs" /></Field>
            </div>
            <Field label="Unused Sick Leave" description="Converts to creditable time (OPM 360-day yr)">
              <Slider value={sickLeaveDays} onChange={setSickLeaveDays} min={0} max={365} step={1} suffix=" days" />
            </Field>
          </Card>

          <Card 
            title="Tax & Cash Flow Parameters" icon={icons.wallet}
            info="Calculates your real-world paycheck using official 2026 IRS marginal tax brackets, the $15,400/$30,800 standard deduction, and the updated 2026 $182,700 OASDI (Social Security) wage base limit. FERS is your mandatory pension contribution: FERS (0.8%), FERS-Revised (3.1%), or FERS-FRAE (4.4%). FEHB represents your Federal Employee Health Benefits, which is strictly deducted pre-tax. Supplemental Income is purely for cash flow and mathematically bypasses all FERS/TSP calculations."
          >
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Filing Status</label>
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                  <button onClick={() => setFilingStatus('Single')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filingStatus === 'Single' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Single</button>
                  <button onClick={() => setFilingStatus('Married')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filingStatus === 'Married' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Married</button>
                </div>
              </div>
              <Field label="Dependents"><NumberInput value={dependents} onChange={setDependents} min={0} /></Field>
              <Field label="FERS Contribution Rate" description="0.8%, 3.1%, or 4.4%"><NumberInput value={fersRate} onChange={setFersRate} suffix="%" step={0.1} /></Field>
              <Field label="FEHB Healthcare Prem." description="Monthly Pre-Tax"><NumberInput value={fehbPremium} onChange={setFehbPremium} prefix="$" /></Field>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
               <Field label="Supplemental Income" description="Second job, VA disability, etc."><NumberInput value={supplementalIncome} onChange={setSupplementalIncome} prefix="$" /></Field>
               <div className="flex flex-col justify-end">
                 <Toggle active={supplementalTaxToggled} onChange={setSupplementalTaxToggled} label="Apply Taxes to this Income?" />
               </div>
            </div>
          </Card>

          <Card 
            title="FERS Pension Parameters" icon={icons.building}
            info="Your gross FERS annuity is calculated using your 'High-3' consecutive salary average. If you retire at Age 62+ with 20+ years of creditable service (excluding sick leave), your multiplier jumps from 1.0% to 1.1%. Toggling the Survivor Benefit realistically reduces your final gross pension by exactly 10% to guarantee your spouse receives 50% of your pension after you pass away. FEHB 5-YEAR RULE: By law, to carry your FEHB health insurance into retirement, you MUST be continuously enrolled in an FEHB plan for the 5 years immediately preceding your retirement date."
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Max Grade Salary"><NumberInput value={maxGradeSalary} onChange={setMaxGradeSalary} prefix="$" /></Field>
              <Field label="Est. Annual COLA"><NumberInput value={cola} onChange={setCola} suffix="%" step={0.1} /></Field>
            </div>
            <Toggle active={survivorBenefit} onChange={setSurvivorBenefit} label="Include Max Survivor Benefit (-10%)" />
            <Toggle active={fehb5Year} onChange={setFehb5Year} label="Meet 5-Year FEHB Rule?" />
          </Card>

          <Card 
            title="Thrift Savings Plan (TSP)" icon={icons.trending}
            info="The engine strictly applies 2026 IRS rules: Base $24,500 limit | Standard Catch-Up (Age 50+) $7,500 | SECURE 2.0 Super Catch-Up (Ages 60-63) $11,250. Turning on 'Auto-Max' ensures your simulation always contributes the absolute legal maximum based on your exact age in any given year. IMPORTANT: If manually setting a high bi-weekly $ amount, you may hit the limit before December, causing the math to shut off your TSP and you will lose the 5% agency match for the rest of the year."
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Current Federal Salary" description="Supplemental income excluded"><NumberInput value={currentSalary} onChange={setCurrentSalary} prefix="$" /></Field>
              <Field label="Est. Annual Raise"><NumberInput value={annualRaise} onChange={setAnnualRaise} suffix="%" step={0.1} /></Field>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mt-2 mb-2 transition-colors">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Current TSP Balances</div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Traditional Bal"><NumberInput value={tradTsp} onChange={setTradTsp} prefix="$" /></Field>
                <Field label="Roth Bal"><NumberInput value={rothTsp} onChange={setRothTsp} prefix="$" /></Field>
              </div>
            </div>

            <Toggle active={isMaxTsp} onChange={setIsMaxTsp} label="Auto-Max 2026 IRS Contributions" accent="emerald" />

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
                      <button onClick={() => setTspInputMode('%')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tspInputMode === '%' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>% of Salary</button>
                      <button onClick={() => setTspInputMode('$')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${tspInputMode === '$' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>$ per Pay Period</button>
                   </div>
                </div>
                {tspInputMode === '%' ? (
                  <>
                    <Field label="Trad Contribution Rate"><Slider value={tradTspInput} onChange={setTradTspInput} min={0} max={30} step={1} suffix="%" /></Field>
                    <Field label="Roth Contribution Rate"><Slider value={rothTspInput} onChange={setRothTspInput} min={0} max={30} step={1} suffix="%" /></Field>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Trad Contrib. (Bi-weekly)"><NumberInput value={tradTspInput} onChange={setTradTspInput} prefix="$" /></Field>
                    <Field label="Roth Contrib. (Bi-weekly)"><NumberInput value={rothTspInput} onChange={setRothTspInput} prefix="$" /></Field>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-2">
              <Field label="Expected TSP Return"><Slider value={tspReturn} onChange={setTspReturn} min={0} max={15} step={0.5} suffix="%" /></Field>
            </div>
          </Card>

          <Card 
            title="Individual Retirement Accounts" icon={icons.piggy}
            info="IRAs are private tax-advantaged accounts. Under updated 2026 rules, the combined contribution limits to Traditional and Roth IRAs are strictly capped at $7,000/yr (or $8,000 if Age 50+). This input will automatically cap you if you try to input more than the IRS legally allows."
          >
            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Field label="Trad IRA Balance"><NumberInput value={tradIraBalance} onChange={setTradIraBalance} prefix="$" /></Field>
              <Field label="Roth IRA Balance"><NumberInput value={rothIraBalance} onChange={setRothIraBalance} prefix="$" /></Field>
            </div>
            
            <div className="mt-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Planned Contributions</label>
              
              {iraWarning && (
                <div className="mb-3 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 p-2 rounded border border-amber-200 dark:border-amber-800 flex items-center gap-2">
                  <span>{icons.alert}</span> <span>{iraWarning}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-3">
                 <Field label="To Traditional IRA">
                   <NumberInput value={tradIraContrib} onChange={(val) => handleIraInput('Trad', val)} prefix="$" />
                 </Field>
                 <Field label="To Roth IRA">
                   <NumberInput value={rothIraContrib} onChange={(val) => handleIraInput('Roth', val)} prefix="$" />
                 </Field>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                <button onClick={() => handleIraFreqChange('Monthly')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${iraFreq === 'Monthly' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Monthly</button>
                <button onClick={() => handleIraFreqChange('Annual')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${iraFreq === 'Annual' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Annual</button>
              </div>
            </div>
            <div className="mt-2">
               <Field label="Expected IRA Return"><Slider value={iraReturn} onChange={setIraReturn} min={0} max={15} step={0.5} suffix="%" /></Field>
            </div>
          </Card>

          <Card 
            title="Prior Employer 401(k)" icon={icons.archive}
            info="If you have an old 401(k), 403(b), or 457 from a previous employer that you did not roll into the TSP or an IRA, input it here. Since you are separated from that employer, you can no longer contribute to it, but it will continue to compound based on your expected return until your retirement age."
          >
             <div className="grid grid-cols-2 gap-4">
              <Field label="Legacy 401(k) Balance"><NumberInput value={prior401kBal} onChange={setPrior401kBal} prefix="$" /></Field>
              <Field label="Expected Return"><NumberInput value={prior401kReturn} onChange={setPrior401kReturn} suffix="%" step={0.1} /></Field>
            </div>
          </Card>

          <Card 
            title="Mega Backdoor Roth / Alt 401(k)" icon={icons.chart}
            info="A 'Mega Backdoor Roth' allows up to ~$47,500 (2026 limit) in After-Tax 401(k) contributions to be immediately converted to Roth. The Federal TSP does NOT permit After-Tax contributions or in-service Roth conversions. Only use this if you have a side-business Solo 401(k) or a spouse with a qualifying private sector 401(k)."
          >
             <div className="grid grid-cols-2 gap-4">
              <Field label="Current Mega/Alt Bal"><NumberInput value={megaBal} onChange={setMegaBal} prefix="$" /></Field>
              <Field label="Contribution Amount"><NumberInput value={megaContrib} onChange={setMegaContrib} prefix="$" /></Field>
            </div>
            <div className="mt-3">
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                <button onClick={() => setMegaFreq('Monthly')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${megaFreq === 'Monthly' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Monthly</button>
                <button onClick={() => setMegaFreq('Annual')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${megaFreq === 'Annual' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Annual</button>
              </div>
            </div>
          </Card>

          <Card 
            title="Taxable Brokerage" icon={icons.chart}
            info="A standard taxable investment account (e.g., Vanguard, Fidelity). Unlike the TSP or IRAs, there are no IRS contribution limits, no income phase-outs, and no age-59.5 early withdrawal penalties. However, dividends and realized capital gains are subject to taxes each year."
          >
             <div className="grid grid-cols-2 gap-4">
              <Field label="Current Brokerage Bal"><NumberInput value={brokerageBalance} onChange={setBrokerageBalance} prefix="$" /></Field>
              <Field label="Contribution Amount"><NumberInput value={brokerageContrib} onChange={setBrokerageContrib} prefix="$" /></Field>
            </div>
            <div className="mt-3 flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                <button onClick={() => setBrokerageFreq('Monthly')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${brokerageFreq === 'Monthly' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Monthly</button>
                <button onClick={() => setBrokerageFreq('Annual')} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${brokerageFreq === 'Annual' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Annual</button>
            </div>
            <div className="mt-4">
               <Field label="Expected Return"><Slider value={brokerageReturn} onChange={setBrokerageReturn} min={0} max={15} step={0.5} suffix="%" /></Field>
            </div>
          </Card>

          <Card 
            title="Standard Debt Amortization" icon={icons.creditCard}
            info="Calculates exactly how much time and interest you save by applying extra monthly principal toward non-mortgage debts. This engine requires your Original Loan Amount and Date to accurately calculate your required minimum payment, which is then applied against your Current Balance to determine your precise payoff date."
          >
             <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <Field label="Loan Start Date"><MonthInput value={debtStartDate} onChange={setDebtStartDate} /></Field>
              <Field label="Original Loan Amount"><NumberInput value={debtOriginal} onChange={setDebtOriginal} prefix="$" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Current Balance"><NumberInput value={debtCurrent} onChange={setDebtCurrent} prefix="$" /></Field>
              <Field label="Original Term (Years)"><NumberInput value={debtTerm} onChange={setDebtTerm} /></Field>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Field label="Interest Rate"><NumberInput value={debtRate} onChange={setDebtRate} suffix="%" step={0.1} /></Field>
              <Field label="Extra Monthly Principal"><NumberInput value={debtExtra} onChange={setDebtExtra} prefix="$" /></Field>
            </div>
          </Card>

          <Card 
            title="Mortgage Amortization" icon={icons.home}
            info="Calculates the accelerated payoff date for your primary residence. Paying down a mortgage guarantees a tax-free return equal to your mortgage interest rate. By entering your origination date, the engine plots exact chronological payoff dates based on your current balance."
          >
             <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <Field label="Loan Start Date"><MonthInput value={mortgageStartDate} onChange={setMortgageStartDate} /></Field>
              <Field label="Original Loan Amount"><NumberInput value={mortgageOriginal} onChange={setMortgageOriginal} prefix="$" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Current Balance"><NumberInput value={mortgageCurrent} onChange={setMortgageCurrent} prefix="$" /></Field>
              <Field label="Original Term (Years)"><NumberInput value={mortgageTerm} onChange={setMortgageTerm} /></Field>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Field label="Interest Rate"><NumberInput value={mortgageRate} onChange={setMortgageRate} suffix="%" step={0.1} /></Field>
              <Field label="Extra Monthly Principal"><NumberInput value={mortgageExtra} onChange={setMortgageExtra} prefix="$" /></Field>
            </div>
            <div className="mt-4">
              <Field label="Monthly Escrow (Tax/Ins)"><NumberInput value={mortgageEscrow} onChange={setMortgageEscrow} prefix="$" /></Field>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: DASHBOARD */}
        <div className="lg:col-span-7">
          <div className="sticky top-6 flex flex-col gap-6">
            
            {/* FULL WIDTH STACKED HEADER BOXES */}
            <div className="flex flex-col gap-4">
              <div className="bg-indigo-600 dark:bg-indigo-700 rounded-xl p-6 text-white shadow-lg overflow-hidden transition-colors w-full">
                <p className="text-indigo-100 text-sm font-medium mb-1">Projected FERS Pension</p>
                <h2 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
                  {fmtCur(results.netPension)} <span className="text-lg sm:text-xl font-normal opacity-75">/yr</span>
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
                    <h2 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
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
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              
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
                    <span>Pre-Tax Deductions <span className="text-xs">(Trad TSP, FERS, FEHB)</span></span>
                    <span className="text-rose-600 dark:text-rose-400">-{fmtCur(results.totalPreTax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Taxes <span className="text-xs">(Fed Income + FICA)</span></span>
                    <span className="text-rose-600 dark:text-rose-400">-{fmtCur(results.totalTaxes)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Net Paycheck</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{fmtCur(results.netPaycheck)}</span>
                </div>

                <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Post-Tax Savings <span className="text-xs">(Roth TSP, IRAs, Mega, Brok)</span></span>
                    <span className="text-amber-600 dark:text-amber-500">-{fmtCur(results.totalPostTaxSavings)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Debt & Escrow <span className="text-xs">(Loans + Mtg + Escrow)</span></span>
                    <span className="text-amber-600 dark:text-amber-500">-{fmtCur(results.monthlyLoansAndEscrow)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/50 mt-2">
                  <span className="font-bold text-emerald-800 dark:text-emerald-400 text-base">Remaining to Spend</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-500 text-2xl">{fmtCur(results.remainingToSpend)}</span>
                </div>
              </div>
            </div>

            {/* FERS Breakdown */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                {icons.building} FERS Creditable Service Logic
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
                  <span className="text-slate-500 dark:text-slate-400">Est. High-3 Salary</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{fmtCur(results.high3)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-1">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    FERS Multiplier
                    {results.meets11Bump ? 
                      <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded-full font-bold">1.1% BUMP UNLOCKED</span> : 
                      <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] rounded-full">Standard</span>
                    }
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{(results.fersMultiplier * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className={`mt-5 p-3 rounded-lg flex items-start gap-3 border ${fehb5Year ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'}`}>
                <div className="mt-0.5">{fehb5Year ? icons.check : icons.alert}</div>
                <div className="text-sm">
                  <strong className="block">{fehb5Year ? 'FEHB Retirement Eligible' : 'FEHB 5-Year Rule Warning'}</strong>
                  {fehb5Year 
                    ? 'You meet the 5-year continuous enrollment requirement to carry FEHB into retirement.' 
                    : 'You MUST be enrolled in FEHB for 5 continuous years immediately preceding retirement to retain coverage.'}
                </div>
              </div>
            </div>

            {/* Split TSP Section */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 relative transition-colors">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  {icons.trending} Thrift Savings Plan (TSP)
                </h3>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  1st Yr Match: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{fmtCur(results.yr1Match)}</span>
                </span>
              </div>
              
              {!isMaxTsp && results.maxedOutEarlyWarning && (
                <div className="mb-4 bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 p-3 rounded-lg text-sm border border-rose-200 dark:border-rose-800 flex items-start gap-2">
                  <div className="mt-0.5">{icons.alert}</div>
                  <div>
                    <strong>WARNING: Match Lost.</strong> Your input causes you to hit the 2026 IRS limit before the end of the year. Your TSP will shut off early, and you will lose the agency match for the remaining pay periods.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 flex justify-between">
                    <span>Current Balances</span>
                    <span className="text-slate-800 dark:text-slate-200">{fmtCur(tradTsp + rothTsp)}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Traditional</span><span className="font-medium text-slate-700 dark:text-slate-300">{fmtCur(tradTsp)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Roth</span><span className="font-medium text-slate-700 dark:text-slate-300">{fmtCur(rothTsp)}</span></div>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                  <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 mb-3 flex justify-between">
                    <span>Projected Future Value</span>
                    <span className="text-indigo-700 dark:text-indigo-400 font-bold">{fmtCur(results.totalTsp)}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-indigo-600/70 dark:text-indigo-400/70">Traditional</span><span className="font-medium text-indigo-800 dark:text-indigo-300">{fmtCur(results.simTradTsp)}</span></div>
                    <div className="flex justify-between"><span className="text-indigo-600/70 dark:text-indigo-400/70">Roth</span><span className="font-medium text-indigo-800 dark:text-indigo-300">{fmtCur(results.simRothTsp)}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Split IRA row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                  {icons.piggy} Individual IRAs
                </h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between text-slate-600 dark:text-slate-400 font-semibold mb-1">
                     <span>Type</span>
                     <span>Future Value</span>
                   </div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Traditional</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.simTradIra)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Roth</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.simRothIra)}</span></div>
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Combined Value</span>
                    <span className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{fmtCur(results.simTradIra + results.simRothIra)}</span>
                  </div>
                </div>
              </div>

              {/* Legacy Accounts & Mega Backdoor */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                  {icons.archive} Alt & Legacy Accounts
                </h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between text-slate-600 dark:text-slate-400 font-semibold mb-1">
                     <span>Source</span>
                     <span>Future Value</span>
                   </div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Prior 401(k)</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.simPrior401k)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Mega Backdoor / Alt</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.simMega)}</span></div>
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Combined Value</span>
                    <span className="font-bold text-lg text-emerald-700 dark:text-emerald-300">{fmtCur(results.simMega + results.simPrior401k)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Debt */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                {icons.creditCard} Standard Debt Impact
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Standard P&I Payment</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.standardDebtStats.minPmt)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Total Payment w/ Extra</span><span className="font-bold text-rose-600 dark:text-rose-400">{fmtCur(results.standardDebtStats.newPmt)}/mo</span></div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-700 pt-2"><span className="text-slate-500 dark:text-slate-400">Standard Payoff Date</span><span className="font-medium text-slate-800 dark:text-slate-200">{results.standardDebtStats.basePayoffStr}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Accelerated Payoff Date</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {results.standardDebtStats.accPayoffStr}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 rounded-lg p-4 text-center">
                  <p className="text-rose-800 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                  <p className="text-3xl font-black text-rose-600 dark:text-rose-500">
                     {results.standardDebtStats.monthsAcc === Infinity ? '0' : `${Math.floor(results.standardDebtStats.timeSaved / 12)}y ${results.standardDebtStats.timeSaved % 12}m`}
                  </p>
                </div>
              </div>

              {debtExtra > 0 && (
                <>
                  <button 
                    onClick={() => setIsStandardDebtExpanded(!isStandardDebtExpanded)} 
                    className="w-full mt-5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">⚖️ Early Payoff vs. Investment Decision</span>
                    {isStandardDebtExpanded ? icons.chevronUp : icons.chevronDown}
                  </button>

                  {isStandardDebtExpanded && (
                    <div className="mt-2 p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm space-y-4">
                       <div className="mb-4">
                         <Field label="Expected Market Return" description="Adjust your projected stock market growth">
                            <Slider value={debtInvestReturn} onChange={setDebtInvestReturn} min={3} max={15} step={0.5} suffix="%" />
                         </Field>
                       </div>
                       <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                         <strong>The Logic:</strong> What happens if you invest that extra {fmtCur(debtExtra)}/mo into a brokerage account (assuming a {debtInvestReturn}% market return) instead of paying off your {debtRate}% debt early? Option 1 represents your investment balance if you never pay extra to the loan. Option 2 represents your investment balance if you pay the loan off early, then invest the newly freed-up massive monthly payment for the remaining years.
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                         <div className={`p-3 rounded-lg border ${results.standardDebtStats.investWins ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                           <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Option 1: Invest Extra</div>
                           <div className={`font-bold ${results.standardDebtStats.investWins ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{fmtCur(results.standardDebtStats.fvInvestExtra)}</div>
                         </div>
                         <div className={`p-3 rounded-lg border ${!results.standardDebtStats.investWins ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                           <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Option 2: Payoff Early</div>
                           <div className={`font-bold ${!results.standardDebtStats.investWins ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{fmtCur(results.standardDebtStats.fvPayoffThenInvest)}</div>
                         </div>
                       </div>
                       <div className="text-center font-semibold pt-3 border-t border-slate-200 dark:border-slate-700">
                         {results.standardDebtStats.investWins
                           ? <span className="text-emerald-600 dark:text-emerald-400">Investing extra yields {fmtCur(results.standardDebtStats.diff)} more</span>
                           : <span className="text-indigo-600 dark:text-indigo-400">Paying off early yields {fmtCur(results.standardDebtStats.diff)} more</span>
                         }
                       </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mortgage Debt */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3 mb-4 flex items-center gap-2">
                {icons.home} Mortgage Impact
              </h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Standard P&I Payment</span><span className="font-medium text-slate-800 dark:text-slate-200">{fmtCur(results.mortgageStats.minPmt)}/mo</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Total Payment w/ Extra</span><span className="font-bold text-rose-600 dark:text-rose-400">{fmtCur(results.mortgageStats.newPmt)}/mo</span></div>
                  <div className="flex justify-between border-t border-slate-100 dark:border-slate-700 pt-2"><span className="text-slate-500 dark:text-slate-400">Standard Payoff Date</span><span className="font-medium text-slate-800 dark:text-slate-200">{results.mortgageStats.basePayoffStr}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Accelerated Payoff Date</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {results.mortgageStats.accPayoffStr}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-auto bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 rounded-lg p-4 text-center">
                  <p className="text-rose-800 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                  <p className="text-3xl font-black text-rose-600 dark:text-rose-500">
                     {results.mortgageStats.monthsAcc === Infinity ? '0' : `${Math.floor(results.mortgageStats.timeSaved / 12)}y ${results.mortgageStats.timeSaved % 12}m`}
                  </p>
                </div>
              </div>

              {mortgageExtra > 0 && (
                <>
                  <button 
                    onClick={() => setIsMortgageExpanded(!isMortgageExpanded)} 
                    className="w-full mt-5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">⚖️ Early Payoff vs. Investment Decision</span>
                    {isMortgageExpanded ? icons.chevronUp : icons.chevronDown}
                  </button>

                  {isMortgageExpanded && (
                    <div className="mt-2 p-4 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm space-y-4">
                       <div className="mb-4">
                         <Field label="Expected Market Return" description="Adjust your projected stock market growth">
                            <Slider value={mortgageInvestReturn} onChange={setMortgageInvestReturn} min={3} max={15} step={0.5} suffix="%" />
                         </Field>
                       </div>
                       <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                         <strong>The Logic:</strong> What happens if you invest that extra {fmtCur(mortgageExtra)}/mo into a brokerage account (assuming a {mortgageInvestReturn}% market return) instead of paying off your {mortgageRate}% mortgage early? Option 1 represents your investment balance if you never pay extra to the loan. Option 2 represents your investment balance if you pay the mortgage off early, then invest the newly freed-up massive monthly payment for the remaining years. <em>(Note: Escrow payments are excluded from this math, as you continue to pay taxes and insurance even after the home is paid off).</em>
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                         <div className={`p-3 rounded-lg border ${results.mortgageStats.investWins ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                           <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Option 1: Invest Extra</div>
                           <div className={`font-bold ${results.mortgageStats.investWins ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{fmtCur(results.mortgageStats.fvInvestExtra)}</div>
                         </div>
                         <div className={`p-3 rounded-lg border ${!results.mortgageStats.investWins ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                           <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Option 2: Payoff Early</div>
                           <div className={`font-bold ${!results.mortgageStats.investWins ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{fmtCur(results.mortgageStats.fvPayoffThenInvest)}</div>
                         </div>
                       </div>
                       <div className="text-center font-semibold pt-3 border-t border-slate-200 dark:border-slate-700">
                         {results.mortgageStats.investWins
                           ? <span className="text-emerald-600 dark:text-emerald-400">Investing extra yields {fmtCur(results.mortgageStats.diff)} more</span>
                           : <span className="text-indigo-600 dark:text-indigo-400">Paying off early yields {fmtCur(results.mortgageStats.diff)} more</span>
                         }
                       </div>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER DISCLAIMER */}
      <footer className="mt-12 py-10 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs sm:text-sm w-full">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <p className="font-bold uppercase tracking-widest text-slate-200">
            Important Legal & Financial Disclaimer
          </p>
          <p className="leading-relaxed">
            F.E.R.A. (Federal Employee Retirement Analyzer) is a hypothetical simulation tool designed and coded by AI for educational and informational purposes only. It is not affiliated with, endorsed by, or representative of the Office of Personnel Management (OPM), the Thrift Savings Plan (TSP), or any U.S. Government agency.
          </p>
          <p className="leading-relaxed">
            All mathematical projections, tax estimates, and future portfolio values are based strictly on user inputs, assumed historical averages, and projected 2026 IRS regulations, which are inherently subject to change. This tool does not provide, nor should it be construed as, formal financial, tax, or legal advice. 
          </p>
          <p className="leading-relaxed text-slate-300 font-medium">
            Market returns are inherently unpredictable, and actual future results will vary. Please consult a certified fiduciary, CPA, or official agency representative before making any irreversible retirement or financial decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}


