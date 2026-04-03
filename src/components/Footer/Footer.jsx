import "./footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-left">
        <span>©Sportsee</span>
        <span>Tous droits réservés</span>
      </div>
      <div className="footer-right">
        <span>Conditions générales</span>
        <span>Contact</span>
        <span className="footer-logo-icon">📊</span>
      </div>
    </footer>
  );
}