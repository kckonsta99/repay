// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { billsConsumptionHistory } from "../utils";

export default function DemoBillboard() {
  return (
    <div className="bill-container">
      {Object.keys(billsConsumptionHistory)
        .sort((a, b) => b - a)
        .map((utcTime, billIndex) => (
            <motion.div
            key={billIndex}
            className="bill-card"
            animate={{ opacity: [0, 1, 1, 0], y: [30, 0, 0, -30] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
              delay: billIndex * 0.5,
            }}
          >
            <p className="bill-card-title">{billsConsumptionHistory[utcTime].title}</p>
            <p className="bill-card-cost">{billsConsumptionHistory[utcTime].cost} €</p>
            <div className="bill-card-period">
              <p>{billsConsumptionHistory[utcTime].period}</p>
              <button>
                  <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button>
                  <i className="fa-solid fa-xmark"></i>
              </button>
              </div>
          </motion.div>
        ))}
    </div>
  );
}
