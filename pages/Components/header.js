import styles from '../../styles/Home.module.css'
import Modal from './modal'
import { useState } from 'react'

export default function Header(props) {
    const [showModal, setShowModal] = useState(false)
    const {mtzAmount, setMtzAmount} = props
    const [tmpMtzAmount, setTmpMtzAmount] = useState(0)
    
    return (
        <>
            <div className={styles.header}>
                <button className={styles.setting} onClick={e => {
                    setShowModal(true)
                    setTmpMtzAmount(mtzAmount)
                }}>☰</button>
            </div>
            {showModal &&
            <Modal title="Simulate MTZ Price" modalFunc={setShowModal}>
                <div className={styles.simulateDiv}>
                    1 MTZ = <input className={styles.textInput} value={tmpMtzAmount} style={{width: '100px', margin: '0px 5px'}} min={0} type="number" step="0.00001" onChange={e => setTmpMtzAmount(e.target.value)} /> USDT
                </div>
                <div>
                    <div className={styles.description} style={{marginBottom: '10px'}}>DEMO: For demonstration purposes you can simulate the price of MTZ to USDT</div>
                    <button className={styles.bigButton} style={{float: 'right'}} onClick={e => {
                        setMtzAmount(tmpMtzAmount)
                        setShowModal(false)
                    }}>Apply</button>
                </div>
            </Modal>}
        </>
    )
}
