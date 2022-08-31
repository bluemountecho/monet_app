import styles from '../../styles/Home.module.css'
import Modal from './modal'
import { useState } from 'react'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calcAPY(x) {
    if (x < 5000) return (0.01 * x / 1000) * 100
    if (x < 10000) return (0.005 * x / 1000 + 0.025) * 100
    if (x < 333333) return (0.0015 * x / 1000 + 0.06) * 100

    return (0.005 * x / 15000 + 0.449) * 100
}

function calcFee(x) {
    if (x < 10) return 0.05 * x
    if (x < 30) return 0.1 * x
    if (x < 50) return 0.2 * x
    if (x < 60) return 0.25 * Math.sqrt(x) * 10
    
    return 0.5 * Math.sqrt(x) * 10
}

export default function Product(props) {
    const [showGenModal, setShowGenModal] = useState(false)
    const [showProModal, setShowProModal] = useState(false)
    const [showBoostModal, setShowBoostModal] = useState(false)
    const [showFlagModal, setShowFlagModal] = useState(false)
    const [viewMore, setViewMore] = useState(false)
    const [inUSDT, setInUSDT] = useState(false)
    const [boostAmount, setBoostAmount] = useState(0)
    const [options, setOptions] = useState([false, false, false, false, false, false])
    const {title, description, business, mtz, clicks, mlink, metrics, mtzAmount, products, setProducts} = props
    const flagOptions = [
        'Targeted Harassment',
        'Illegal Activity',
        'False Advertising',
        'Copyright Violation',
        'Violent Content',
        'Privacy Violation',
    ]

    const links = [
        '0x9C0...b479',
        '0xac8...72aA',
        '0xFcc...00de',
        '0x56B...127a',
        '0x313...aaC0',
    ]

    const apy = calcAPY(mtz + (boostAmount ? parseFloat(boostAmount) : 0))
    const fee = calcFee(apy) * boostAmount / 100

    return (
        <>
            <div className={styles.product}>
                <table className={styles.productTable}>
                    <tbody>
                        <tr>
                            <td rowSpan="2" width="60" style={{verticalAlign: 'top'}}>
                                <div className={styles.productImage} onClick={e => setShowProModal(true)}>
                                    Image
                                </div>
                            </td>
                            <td colSpan="3" style={{verticalAlign: 'top', cursor: 'pointer'}} onClick={e => setShowProModal(true)} className={styles.productTitle}>
                                {title}
                            </td>
                            <td colSpan="1" style={{textAlign: 'right', verticalAlign: 'top'}}>
                                <button className={styles.button} onClick={e => setShowGenModal(true)}>Generate</button>
                            </td>
                        </tr>
                        <tr>
                            <td width="80" style={{verticalAlign: 'bottom'}}>
                                <a href="https://mtztoken.com" target="_blank"><small className={styles.small + ' ' + styles.business}>{business}</small></a>
                            </td>
                            <td width="50" style={{verticalAlign: 'bottom'}}>
                                <small className={styles.small}>Per-Click<br/>Rewards<br/>{(mtz / clicks).toFixed(2)} MTZ</small>
                            </td>
                            <td width="50" style={{verticalAlign: 'bottom'}}>
                                <small className={styles.small}>APY {calcAPY(mtz).toFixed(3)}%</small>
                            </td>
                            <td width="50" style={{textAlign: 'right', verticalAlign: 'bottom'}}>
                                <button className={styles.button} onClick={e => {
                                    setShowBoostModal(true)
                                    setBoostAmount(0)
                                }}>Boost</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {showGenModal &&
            <Modal title="Generate M-Link" modalFunc={setShowGenModal} style={{zIndex: '2'}}>
                <div style={{display: 'flex', paddingBottom: '10px'}}>
                    <button className={styles.button} style={{minWidth: 'fit-content'}}>Generate M-Link</button>
                    <div className={styles.info} style={{textAlign: 'center', margin: 'auto'}}>Please Connect Wallet First</div>
                </div>
                <div>
                    <div className={styles.description} style={{marginBottom: '10px'}}>
                        DEMO: This feature is not available in the demo. When live, a specialized link will be available after connecting your wallet.<br/>
                        Example link: m.token/ABCD12345
                    </div>
                    <button className={styles.bigButton} style={{float: 'right'}}>Connect Wallet</button>
                </div>
            </Modal>}
            {showProModal &&
            <Modal title={<>{title}<a href="https://mtztoken.com" target="_blank"><div className={styles.business}>({business})</div></a><br/></>} modalFunc={setShowProModal}>
                <div className={styles.productImage + ' ' + styles.productDetailImage} onClick={e => setShowProModal(true)}>
                    Image
                </div>
                <p className={styles.productDescription}>
                    <div>
                        <div className={styles.socialIcon}></div>
                        <div className={styles.socialIcon}></div>
                        <div className={styles.socialIcon}></div>
                        <div className={styles.socialIcon}></div>
                        <div className={styles.socialIcon}></div>
                        <div className={styles.socialIcon}></div>
                    </div>
                    {description}
                </p>
                <div style={{marginTop: '10px', height: '30px'}}>
                    <button className={styles.bigButton} style={{float: 'left'}} onClick={e => setShowGenModal(true)}>Generate M-Link</button>
                    <button className={styles.bigButton} style={{float: 'right'}} onClick={e => {
                        setShowBoostModal(true)
                        setBoostAmount(0)
                    }}>Boost</button>
                </div>
                <div style={{marginTop: '10px', height: '57px'}}>
                    <div className={styles.modalHeader} style={{float: 'left', textAlign: 'left', fontSize: '14px'}}>
                        Per-Click Rewards:<br/>{inUSDT == false ? (mtz / clicks).toFixed(2) : (mtz / clicks * mtzAmount).toFixed(4) } {inUSDT == false ? 'MTZ' : 'USDT'} ( <a className={styles.business} onClick={e => {
                            setInUSDT(!inUSDT)
                        }}>{inUSDT == false ? 'in USDT' : 'in MTZ'}</a> )
                    </div>
                    <div className={styles.modalHeader} style={{float: 'right', textAlign: 'right', fontSize: '14px'}}>
                        Boost APY:<br/>{calcAPY(mtz).toFixed(1)}%<br/>
                        <a className={styles.business} style={{fontWeight: '200'}} onClick={e => setShowFlagModal(true)}>Flag Options</a>
                    </div>
                </div>
                {viewMore == false &&
                <div className={styles.viewMore} onClick={e => setViewMore(true)}>
                    View Ad Metrics
                </div>}
                {viewMore == true && <div className={styles.moreDiv}>
                    <div className={styles.h3Div} style={{textAlign: 'center'}}>Ad Metrics</div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}} className={styles.card}>
                        <div className={styles.h4Div} style={{textAlign: 'center'}}>
                            MTZ Boosted<br/>
                            {numberWithCommas(mtz)}
                        </div>
                        <div className={styles.h4Div} style={{textAlign: 'center'}}>
                            in USDT<br/>
                            ${(mtz * mtzAmount).toFixed(1)}
                        </div>
                        <div className={styles.h4Div} style={{textAlign: 'center'}}>
                            Total Clicks This Month<br/>
                            {numberWithCommas(clicks)}
                        </div>
                    </div>
                    <table className={styles.metricTable}>
                        <tbody>
                            <tr>
                                <td>Link</td>
                                <td>Clicks</td>
                                <td>Rewards</td>
                                <td>Rewards in USD</td>
                            </tr>
                            {metrics.map((value, key) => {
                                return <tr>
                                    <td>{links[key]}</td>
                                    <td>{numberWithCommas(value)}</td>
                                    <td>{numberWithCommas(value / clicks * mtz)} MTZ</td>
                                    <td>${(value / clicks * mtz * mtzAmount).toFixed(1)}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className={styles.viewMore} onClick={e => setViewMore(false)}>
                        Close Ad Metrics
                    </div>
                </div>}
            </Modal>}
            {showBoostModal &&
            <Modal title="Boost Ad" modalFunc={setShowBoostModal} style={{zIndex: '2'}}>
                <div>
                    <table className={styles.productTable}>
                        <tbody>
                            <tr>
                                <td rowSpan={3} style={{verticalAlign: 'top', paddingRight: '40px'}}>
                                    <div className={styles.business} onClick={e => {
                                        setShowBoostModal(false)
                                        setShowProModal(true)
                                    }}>{title}</div>
                                    <a href="https://mtztoken.com" target="_blank"><div className={styles.business}>({business})</div></a>
                                </td>
                                <td>
                                    <small>Amount<br/>(MTZ)</small>
                                </td>
                                <td>
                                    <input className={styles.textInput} style={{width: '90px', margin: '0px'}} type="number" step={0.00001} value={boostAmount} onChange={e => {
                                        setBoostAmount(e.target.value)
                                    }} />
                                </td>
                            </tr>
                            <tr>
                                <td><small>Fee</small></td>
                                <td>
                                    <input disabled className={styles.textInput} style={{width: '90px', margin: '0px'}} type="number" step={0.00001} value={fee.toFixed(3)} />
                                </td>
                            </tr>
                            <tr>
                                <td><small>Total</small></td>
                                <td>
                                    <input disabled className={styles.textInput} style={{width: '90px', margin: '0px'}} type="number" step={0.00001} value={(parseFloat(fee) + parseFloat(boostAmount)).toFixed(3)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop: '20px'}}>
                    <div className={styles.h3Div}>APY {apy.toFixed(3)}%</div>
                    <button className={styles.bigButton} style={{float: 'right'}} onClick={e => {
                        var tmp = [...products]

                        for (var i = 0; i < tmp.length; i ++) {
                            if (tmp[i].title == title) {
                                tmp[i].mtz += parseFloat(boostAmount)
                            }
                        }

                        setProducts([...tmp])
                        setShowBoostModal(false)
                    }}>Boost!</button>
                </div>
            </Modal>}
            {showFlagModal &&
            <Modal title="Flag Ad as Inappropriate" modalFunc={setShowFlagModal} style={{zIndex: '2'}}>
                <div style={{fontSize: '18px', fontWeight: 'bold'}}>Reason: </div>
                <div>
                    {flagOptions.map((val, key) => {
                        return <>
                            <button className={styles.bigButton + ' ' + (options[key] == true ? styles.activeButton : '')} style={{marginTop: '10px'}} onClick={e => {
                                var tmp = [...options]

                                tmp[key] = !tmp[key]
                                
                                setOptions([...tmp])
                            }}>{val}</button><br/>
                        </>
                    })}
                </div>
                <div style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>Description: </div>
                <div className={styles.card + ' ' + styles.description}>
                    Demo: Upon viewing an ad, you will be able to flag certain advertisements that may violate our guidelines. If removed, future rewards will no longer be generated with the ad.
                </div>
                <div style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px', textAlign: 'center'}}>Are you sure?</div>
                <div style={{marginTop: '20px'}}>
                    <button className={styles.bigButton} onClick={e => setShowFlagModal(false)}>Cancel</button>
                    <button className={styles.bigButton} style={{float: 'right'}} onClick={e => setShowFlagModal(false)}>Submit</button>
                </div>
            </Modal>}
        </>
    )
}
