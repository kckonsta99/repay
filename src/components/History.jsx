import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import BillForm from "./BillForm";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase";


export default function History() {
    const { globalData, globalUser, setGlobalData  } = useAuth();
    const [editItem, setEditItem] = useState(null); // αντικείμενο προς επεξεργασία

    const formRef = useRef(null)

    useEffect(() => {
        if(editItem && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" , block: "start"})
        }
    }, [editItem])

    const handleDelete = async (timestamp) => {
        try {
            const newData = { ...globalData };
            delete newData[timestamp];
            setGlobalData(newData);

            const userRef = doc(db, "users", globalUser.uid);
            await updateDoc(userRef, {
                [timestamp]: deleteField()
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="bill-container">
            {Object.keys(globalData)
                .sort((a, b) => b - a)
                .map((utcTime, billIndex) => {
                    const item = globalData[utcTime];

                    return (
                        <div key={billIndex} className={item.notification ? "bill-card" : "bill-card-off"}>
                            <p className="bill-card-title">{item.title}</p>
                            <p className="bill-card-cost">{item.cost} €</p>
                            <div className="bill-card-period">
                                <p>{item.period}</p>
                                <button onClick={() => setEditItem({ timestamp: utcTime, ...item })}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button onClick={() => handleDelete(utcTime)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}

            {editItem && (
                <div ref={formRef}>
                    <BillForm
                        isAuthenticated={true}
                        editMode={true}
                        existingData={editItem}
                        timestampToEdit={editItem.timestamp}
                        onCloseEdit={() => setEditItem(null)}
                    />
                </div>
            )}
        </div>
    );
}
