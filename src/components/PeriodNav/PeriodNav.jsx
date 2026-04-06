// PeriodNav reçoit les périodes et leurs labels depuis le parent.
// Plus de labels hardcodés — tout est dynamique.

import "./PeriodNav.css";

// Props :
//   periods      : string[]          — liste ordonnée des ids
//   periodLabels : { [id]: string }  — map id → label affiché (ex: "5 mai – 2 juin")
//   value        : string            — id de la période courante
//   onChange     : (id) => void      — remonte le changement au parent
export default function PeriodNav({
  periods = [],
  periodLabels = {},
  value,
  onChange,
}) {
  const currentIndex = periods.indexOf(value);
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === periods.length - 1;

  const goBack    = () => !isFirst && onChange(periods[currentIndex - 1]);
  const goForward = () => !isLast  && onChange(periods[currentIndex + 1]);

  // Affiche le label si disponible, sinon l'id brut en fallback
  const label = periodLabels[value] ?? value;

  return (
    <div className="period-nav">
      <button
        className="period-btn"
        onClick={goBack}
        disabled={isFirst}
        aria-label="Période précédente"
      >
        &lt;
      </button>

      <span className="period-label">{label}</span>

      <button
        className="period-btn"
        onClick={goForward}
        disabled={isLast}
        aria-label="Période suivante"
      >
        &gt;
      </button>
    </div>
  );
}