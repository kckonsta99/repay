import { periodsOptions } from '../utils';
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function BillForm({
        isAuthenticated,
        editMode = false,
        existingData = {},
        timestampToEdit = null,
        onCloseEdit = () => {}
    })

    {
    const [billPeriod, setBillPeriod] = useState(null);
    const [showBillForm, setShowBillForm] = useState(false);
    const [billCost, setBillCost] = useState(0);
    const [billTitle, setBillTitle] = useState("");

    const { globalData, setGlobalData, globalUser } = useAuth();

    const [toggled, setToggled] = useState(false)

    useEffect(() => {
        if (editMode && existingData) {
            setBillTitle(existingData.title || "");
            setBillCost(existingData.cost || 0);
            setBillPeriod(existingData.period || null);
            setToggled(existingData.notification || false)
            setShowBillForm(true);
        }
    }, [editMode, existingData]);

    async function handleSubmitForm() {
        if (!isAuthenticated) return;

        if (!showBillForm || billTitle.length === 0 || billCost <= 0 || !["daily", "monthly", "annualy"].includes(billPeriod)) {
            return;
        }

        try {
            const newGlobalData = { ...(globalData || {}) };
            const timestamp = editMode ? timestampToEdit : Date.now();

            const newData = {
                title: billTitle,
                cost: billCost,
                period: billPeriod,
                notification: toggled
            };

            newGlobalData[timestamp] = newData;
            setGlobalData(newGlobalData);

            const userRef = doc(db, 'users', globalUser.uid);
            await setDoc(userRef, {
                [timestamp]: newData
            }, { merge: true });

            setBillTitle("");
            setBillCost(0);
            setBillPeriod(null);
            setShowBillForm(false);
            setToggled(false);

            if (editMode) {
                onCloseEdit();
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    

    if (!showBillForm && !editMode) {
        return (
            <div className='billForm'>
                <div>
                    <h2><span className='textGradient'>Bill</span>board</h2>
                </div>
                
                <div className='addBill'>
                    <button className='flyingBtn' onClick={() => {
                        setShowBillForm(true);
                        setBillTitle("");
                        setBillCost(0);
                        setBillPeriod(null);
                    }}>
                        <p>Add a new bill</p>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='newForm'>
            <div className='newFormButtonX buttons'>
                <div>
                    <p>{editMode ? "Modify Entry" : "Add New Entry"}</p>
                </div>
                <button onClick={() => {
                    if (editMode) {
                        onCloseEdit();
                    } else {
                        setShowBillForm(false);
                    }
                }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className='newFormInputs'>
                <h4>Add a title</h4>
                <input type='text' value={billTitle} onChange={(e) => setBillTitle(e.target.value)} placeholder='rent' />
            </div>
            <div className='newFormInputs'>
                <h4>Add the cost (€)</h4>
                <input type='number' value={billCost} onChange={(e) => setBillCost(e.target.value)} placeholder='0' />
            </div>
            <div className='newFormInputs'>
                <h4>Select period</h4>
                <select value={billPeriod || ""} onChange={(e) => setBillPeriod(e.target.value)}>
                    <option value=""></option>
                    {periodsOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className='newFormInputs'>
                <h4>Notification:</h4>
                <div className='bell-toggle'>                
                    <i className={` fa-solid fa-bell ${toggled ? ' bellOn ' : ' bellOff '}`}></i>
                    <button className={` toggle-btn ${toggled ? ' toggled ' : ''}`} onClick={() => setToggled(!toggled)}>
                        <div className='thumb'></div>
                    </button>
                </div>
            </div>
            <div className='newFormButtonAdd buttons'>
                <button onClick={handleSubmitForm}>
                    <p>{editMode ? "Save Changes" : "Add Entry"}</p>
                </button>
            </div>
        </div>
    );
}
