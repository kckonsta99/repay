import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const { children } = props
    const [showModal, setShowModal] = useState(false)

    const {globalUser, logout} = useAuth()

    const header = (
        <header className="header">
            <div>
                <h1 className="textGradient">Sp€nd</h1>
            </div>
            {globalUser ? (<button className="flyingBtnDark" onClick={logout} >
                <p>Logout</p>
            </button>) : (<button className="flyingBtnDark" onClick={() => {
                setShowModal(true)
            }} >
                <p>Sign up</p>
            </button>)}
        </header>
    )

    const footer = (
        <footer className="footer">
            <p>Created by <a href="https://github.com/kckonsta99" target="_blank">kckonsta99</a></p>
        </footer>
    )

    function handleCloseModal() {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication handleCloseModal={handleCloseModal} />
                </Modal>
            )}
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}
