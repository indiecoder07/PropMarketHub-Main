'use client';
import { createContext, useContext, useMemo, useState } from 'react';
const FirstHomeBuyerCalculatorContext = createContext(null);
function formatThousands(v){return new Intl.NumberFormat('en-AU').format(v);} function parseDigits(v){return v.replace(/[^\d]/g,'');}
function useCurrencyField(i){const [value,setValue]=useState(i); const [valueInput,setValueInput]=useState(formatThousands(i)); const setValueFromInput=(input)=>{const d=parseDigits(input); if(!d){setValue(0);setValueInput('');return;} const n=Number(d); setValue(n); setValueInput(formatThousands(n));}; return {value,valueInput,setValueFromInput};}
export function FirstHomeBuyerCalculatorProvider({children}){const propertyPrice=useCurrencyField(700000); const savings=useCurrencyField(110000); const [state,setState]=useState('NSW'); const value=useMemo(()=>({propertyPrice,savings,state,setState}),[propertyPrice,savings,state]); return <FirstHomeBuyerCalculatorContext.Provider value={value}>{children}</FirstHomeBuyerCalculatorContext.Provider>;}
export function useFirstHomeBuyerCalculatorContext(){const c=useContext(FirstHomeBuyerCalculatorContext); if(!c) throw new Error('useFirstHomeBuyerCalculatorContext must be used inside <FirstHomeBuyerCalculatorProvider>'); return c;}
