import styles from '../../styles/Home.module.css'

export default function Modal(props) {
  const {children, modalFunc, title, style} = props

  return (
    <div className={styles.modalContainer} style={style}>
        <div className={styles.modalDiv} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
                {title}
                <button className={styles.closeButton} onClick={e => modalFunc(false)}>✖</button>
            </div>
            <div className={styles.modalBody}>
                {children}
            </div>
        </div>
    </div>
  )
}
