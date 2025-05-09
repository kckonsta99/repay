export const periodsOptions = ['daily','monthly','annualy']

export function calculatePeriodValue(per) {
    let perValue = 0

    if(per === 'monthly') {
        perValue = 12
    }else if(per === 'annualy') {
        perValue = 1
    }else if(per === 'daily') {
        perValue = 365
    }
    return perValue
}


export const billsConsumptionHistory = {
    "1727629263988": { "title": "Rent", "cost": 600, "period": "monthly" },
    "1727629263026": { "title": "Electricity", "cost": 75, "period": "monthly" },
    "1727579064033": { "title": "Gym", "cost": 360, "period": "annualy" },
    "1727579064031": { "title": "Car Leasing", "cost": 330, "period": "monthly" },
    "1727579064030": { "title": "Coffee", "cost": 3.5, "period": "daily" },
    "1727571485546": { "title": "Phone / Internet", "cost": 45, "period": "monthly" }
}

export const totalCosts = Object.values(billsConsumptionHistory)
  .reduce((sum, bill) => sum + bill.cost, 0);


export function calculateTotal(historyData) {
    const totalCosts = Object.values(historyData)
    .reduce((sum, bill) => {
      let multiplier = 1;
      if (bill.period === 'annualy') {
        multiplier = 1;
      } else if (bill.period === 'monthly') {
        multiplier = 12;
      } else if (bill.period === 'daily') {
        multiplier = 365;
      }
      return sum + (bill.cost * multiplier);
    }, 0);
  
    return totalCosts
}

export function pval(historyData, utc) 
{
    let pv = 1
    if (historyData[utc].period === 'annualy') {
        pv = 1;
      } else if (historyData[utc].period === 'monthly') {
        pv = 12;
      } else if (historyData[utc].period === 'daily') {
        pv = 365;
      }
      return pv
}
