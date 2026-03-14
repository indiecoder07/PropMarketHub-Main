'use client';
import { createContext, useContext, useMemo, useState } from 'react';

const RentVsBuyCalculatorContext = createContext(null);

function formatThousands(v){return new Intl.NumberFormat('en-AU').format(v);} 
function parseDigits(v){return v.replace(/[^\d]/g,'');}
function useCurrencyField(initial){
  const [value,setValue]=useState(initial);
  const [valueInput,setValueInput]=useState(formatThousands(initial));
  const setValueFromInput=(input)=>{const d=parseDigits(input); if(!d){setValue(0);setValueInput('');return;} const n=Number(d); setValue(n); setValueInput(formatThousands(n));};
  return {value,valueInput,setValueFromInput};
}

export function RentVsBuyCalculatorProvider({children}){
  const weeklyRent=useCurrencyField(700);
  const homePrice=useCurrencyField(850000);
  const buyingCosts=useCurrencyField(45000);
  const [depositPct,setDepositPct]=useState(20);
  const [rate,setRate]=useState(6.1);
  const [rentGrowthPct,setRentGrowthPct]=useState(3);
  const [homeGrowthPct,setHomeGrowthPct]=useState(4);
  const [horizonYears,setHorizonYears]=useState(7);
  const value=useMemo(()=>({weeklyRent,homePrice,buyingCosts,depositPct,setDepositPct,rate,setRate,rentGrowthPct,setRentGrowthPct,homeGrowthPct,setHomeGrowthPct,horizonYears,setHorizonYears}),[weeklyRent,homePrice,buyingCosts,depositPct,rate,rentGrowthPct,homeGrowthPct,horizonYears]);
  return <RentVsBuyCalculatorContext.Provider value={value}>{children}</RentVsBuyCalculatorContext.Provider>;
}

export function useRentVsBuyCalculatorContext(){const c=useContext(RentVsBuyCalculatorContext); if(!c) throw new Error('useRentVsBuyCalculatorContext must be used inside <RentVsBuyCalculatorProvider>'); return c;}
