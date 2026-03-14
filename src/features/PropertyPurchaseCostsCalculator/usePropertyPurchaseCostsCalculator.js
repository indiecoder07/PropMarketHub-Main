'use client';
import { useMemo } from 'react';
import { usePropertyPurchaseCostsCalculatorContext } from '@/context/PropertyPurchaseCostsCalculatorContext';
const AUD = new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0});
export function usePropertyPurchaseCostsCalculator(){
  const {purchasePrice,stampDuty,legalFees,inspections,loanFees,movingCosts}=usePropertyPurchaseCostsCalculatorContext();
  const results=useMemo(()=>{if(purchasePrice.value<=0) return null; const totalCosts=stampDuty.value+legalFees.value+inspections.value+loanFees.value+movingCosts.value; const totalRequired=purchasePrice.value+totalCosts; return {totalCosts,totalRequired};},[purchasePrice.value,stampDuty.value,legalFees.value,inspections.value,loanFees.value,movingCosts.value]);
  return {purchasePriceInput:purchasePrice.valueInput,setPurchasePriceFromInput:purchasePrice.setValueFromInput,stampDutyInput:stampDuty.valueInput,setStampDutyFromInput:stampDuty.setValueFromInput,legalFeesInput:legalFees.valueInput,setLegalFeesFromInput:legalFees.setValueFromInput,inspectionsInput:inspections.valueInput,setInspectionsFromInput:inspections.setValueFromInput,loanFeesInput:loanFees.valueInput,setLoanFeesFromInput:loanFees.setValueFromInput,movingCostsInput:movingCosts.valueInput,setMovingCostsFromInput:movingCosts.setValueFromInput,results,formatCurrency:(v)=>AUD.format(v)};
}
