import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main>
            <h1>Pagina niet gevonden</h1>
            <p>Deze pagina bestaat niet.</p>
            <Link to="/">Terug naar home</Link>
        </main>
    )
}