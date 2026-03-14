'use client';
import { useMemo } from 'react';
import { useExtraRepaymentCalculatorContext } from '@/context/ExtraRepaymentCalculatorContext';
const AUD = new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0});

function simulate(loanAmount, rate, years, extraMonthly, lumpSum, lumpSumMonth){
  const r=rate/100/12; const n=years*12;
  const baseMonthly=loanAmount*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  let balance=loanAmount; let totalInterest=0; let months=0;
  while(balance>0 && months< n*2){
    const interest=balance*r; totalInterest+=interest;
    let payment=baseMonthly+extraMonthly;
    if(months===lumpSumMonth) payment += lumpSum;
    balance = Math.max(0, balance + interest - payment);
    months += 1;
  }
  return {baseMonthly,totalInterest,months};
}

export function useExtraRepaymentCalculator(){
  const {loanAmount,extraMonthly,lumpSum,rate,setRate,termYears,setTermYears,lumpSumYear,setLumpSumYear}=useExtraRepaymentCalculatorContext();
  const results=useMemo(()=>{if(loanAmount.value<=0||rate<=0||termYears<=0) return null; const baseline=simulate(loanAmount.value,rate,termYears,0,0,-1); const accelerated=simulate(loanAmount.value,rate,termYears,extraMonthly.value,lumpSum.value,(lumpSumYear*12)-1); const interestSaved=Math.max(0,baseline.totalInterest-accelerated.totalInterest); const monthsSaved=Math.max(0,baseline.months-accelerated.months); return {baseline,accelerated,interestSaved,monthsSaved};},[loanAmount.value,extraMonthly.value,lumpSum.value,rate,termYears,lumpSumYear]);
  return {loanAmountInput:loanAmount.valueInput,setLoanAmountFromInput:loanAmount.setValueFromInput,extraMonthlyInput:extraMonthly.valueInput,setExtraMonthlyFromInput:extraMonthly.setValueFromInput,lumpSumInput:lumpSum.valueInput,setLumpSumFromInput:lumpSum.setValueFromInput,rate,setRate,termYears,setTermYears,lumpSumYear,setLumpSumYear,results,formatCurrency:(v)=>AUD.format(v)};
}
