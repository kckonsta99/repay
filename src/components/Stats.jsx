// function StatCard(props) {
//     const {cost, period} = props
//     return (
//         <div>
//             <p>Stats:</p>
//             <p ><span>daily</span> <span>$</span> / day</p>
//             <p ><span>monthly</span> <span>$</span> / month</p>
//             <p ><span>annualy</span> <span>$</span> / year</p>
//         </div>
//     )
// }

// import { calculatePeriodValue } from "../utils"
import { calculateTotal, pval } from "../utils"
import { useAuth } from "../context/AuthContext"

export default function Stats() {
    const { globalData } = useAuth()
    // const { cost, period } = props

    // const stats = {
    //     daily_cost: 32.99,
    //     monthly_cost: 989.7,
    //     annual_cost: 11876.4
    // }

    // const period_value = calculatePeriodValue(period)
   

    return (
        <>
            <div>
                <h3>Stats:</h3>
                <div className="stats-row">
                    
                    <p ><span className="stats-num">{(calculateTotal(globalData) / 365).toFixed(2)}</span> <span className="euro">€</span> / day</p>
                    <p ><span className="stats-num">{(calculateTotal(globalData) / 12).toFixed(2)}</span> <span className="euro">€</span> / month</p>
                    <p ><span className="stats-num">{(calculateTotal(globalData)).toFixed(2)}</span> <span className="euro">€</span> / year</p>
                </div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>cost</th>
                            <th>percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(globalData).sort((a,b) => b - a).map((utcTime, billIndex) => {
                            return(
                                <tr  key={billIndex}>
                                    <td>{globalData[utcTime].title}</td>
                                    <td>{globalData[utcTime].cost}</td>
                                    <td key={billIndex}>{((parseInt(globalData[utcTime].cost)*pval(globalData,utcTime)*100) / calculateTotal(globalData)).toFixed(2)} %</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}