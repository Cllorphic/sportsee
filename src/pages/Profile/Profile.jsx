import { useParams } from "react-router-dom";
import ActivityChart from "../../components/ActivityChart/ActivityChart";

export default function Profile() {
  const { id } = useParams();

  return (
    <div>
      <h1>Profil utilisateur {id}</h1>
      <ActivityChart />
    </div>
  );
}