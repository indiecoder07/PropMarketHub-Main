'use client';
import { useMemo } from 'react';
import { useRentVsBuyCalculatorContext } from '@/context/RentVsBuyCalculatorContext';
const AUD = new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0});

function remainingBalance(principal, annualRate, years, paidYears){
  const r=annualRate/100/12; const n=years*12; const k=paidYears*12;
  const m=principal*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  return principal*Math.pow(1+r,k)-m*((Math.pow(1+r,k)-1)/r);
}

export function useRentVsBuyCalculator(){
  const {weeklyRent,homePrice,buyingCosts,depositPct,setDepositPct,rate,setRate,rentGrowthPct,setRentGrowthPct,homeGrowthPct,setHomeGrowthPct,horizonYears,setHorizonYears}=useRentVsBuyCalculatorContext();
  const results=useMemo(()=>{
    if(weeklyRent.value<=0||homePrice.value<=0||rate<=0||horizonYears<=0) return null;
    const deposit=homePrice.value*(depositPct/100);
    const loan=Math.max(0,homePrice.value-deposit);
    const annualRentBase=weeklyRent.value*52;
    const rentCost=Array.from({length:horizonYears}).reduce((s,_,i)=>s+annualRentBase*Math.pow(1+rentGrowthPct/100,i),0);
    const r=rate/100/12; const n=30*12;
    const monthly=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
    const repaymentCost=monthly*12*horizonYears;
    const futureValue=homePrice.value*Math.pow(1+homeGrowthPct/100,horizonYears);
    const balance=Math.max(0,remainingBalance(loan,rate,30,horizonYears));
    const ownershipEquity=Math.max(0,futureValue-balance);
    const buyNetPosition=ownershipEquity-(deposit+buyingCosts.value+repaymentCost);
    return {deposit,loan,rentCost,repaymentCost,futureValue,balance,ownershipEquity,buyNetPosition,better: buyNetPosition>-rentCost?'Buy':'Rent'};
  },[weeklyRent.value,homePrice.value,buyingCosts.value,depositPct,rate,rentGrowthPct,homeGrowthPct,horizonYears]);
  return {weeklyRentInput:weeklyRent.valueInput,setWeeklyRentFromInput:weeklyRent.setValueFromInput,homePriceInput:homePrice.valueInput,setHomePriceFromInput:homePrice.setValueFromInput,buyingCostsInput:buyingCosts.valueInput,setBuyingCostsFromInput:buyingCosts.setValueFromInput,depositPct,setDepositPct,rate,setRate,rentGrowthPct,setRentGrowthPct,homeGrowthPct,setHomeGrowthPct,horizonYears,setHorizonYears,results,formatCurrency:(v)=>AUD.format(v)};
}
