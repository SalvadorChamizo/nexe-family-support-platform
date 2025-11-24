import { useEffect, useState } from react;
import { getNinos } from "../api/kidsApi";
import type { Nino } from "../api/types";

export default function NinosList() {
  const [ninos, setNinos] = useState<Nino[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNinos()
      .then((data) => setNinos(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error cargando niños: {error}</p>;

  return (
    <div>
      <h2>Niños</h2>
      <ul>
        {ninos.map((nino) => (
          <li key={nino.id}>
            {nino.nombre} {nino.apellidos}
          </li>
        ))}
      </ul>
    </div>
  );
}
