//COMPONENTE DO CABEÇALHO: COLOCAR O LOGO TODO 
import styles from './Header.module.css'
export function Header() {
    return (
        <header className={styles.container}>
            <img id="logo" src={`${import.meta.env.BASE_URL}2.png`} alt="logo" />
        </header>
    )
}

