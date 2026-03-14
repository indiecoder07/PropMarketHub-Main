'use client';
import { createContext, useContext, useMemo, useState } from 'react';
const HomeEquityCalculatorContext = createContext(null);
function formatThousands(v){return new Intl.NumberFormat('en-AU').format(v);} function parseDigits(v){return v.replace(/[^\d]/g,'');}
function useCurrencyField(i){const [value,setValue]=useState(i); const [valueInput,setValueInput]=useState(formatThousands(i)); const setValueFromInput=(input)=>{const d=parseDigits(input); if(!d){setValue(0);setValueInput('');return;} const n=Number(d); setValue(n); setValueInput(formatThousands(n));}; return {value,valueInput,setValueFromInput};}
export function HomeEquityCalculatorProvider({children}){const propertyValue=useCurrencyField(900000); const loanBalance=useCurrencyField(560000); const [targetLvr,setTargetLvr]=useState(80); const value=useMemo(()=>({propertyValue,loanBalance,targetLvr,setTargetLvr}),[propertyValue,loanBalance,targetLvr]); return <HomeEquityCalculatorContext.Provider value={value}>{children}</HomeEquityCalculatorContext.Provider>;}
export function useHomeEquityCalculatorContext(){const c=useContext(HomeEquityCalculatorContext); if(!c) throw new Error('useHomeEquityCalculatorContext must be used inside <HomeEquityCalculatorProvider>'); return c;}
