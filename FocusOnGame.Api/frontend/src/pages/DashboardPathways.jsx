import { useState, useEffect } from "react";
import { pathwayService } from "../services/PathwayService";
import { useParams, useNavigate } from "react-router-dom";
import PathwayModal from "../components/modals/PathwayModal";

export default function DashboardPathways() {

  const { idUser } = useParams();
  const navigate = useNavigate();

  const [pathways, setPathways] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPathways = async () => {
    try {
      const data = await pathwayService.getPathways(idUser);
      setPathways(data ?? []);
    } catch (err) {
      console.error("Erreur fetch pathways:", err);
    }
  };

  useEffect(() => {
    if (idUser) loadPathways();
  }, [idUser]);

  const addPathway = (namePathway) => {
    navigate(`/gameCreator/${idUser}/${namePathway}`);
  };

  const deletePathway = (idPathway) => {
    setPathways(pathways.filter((p) => p.id !== idPathway));
  };

  const editPathway = (pathway) => {
    //navigate(`/GameCreator/${pathway.id}`);
  };

  const playPathway = (pathway) => {
    alert("Lancement : " + pathway.name);
  };

  return (
    <div className="min-h-screen bg-sky-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="space-y-3">

          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Search pathway..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              //onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => setIsModalOpen(true)}
            className="bg-sky-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600"
            >
              + Create
            </button>
          </div>

          {pathways?.map((pathway) => (
            <div
              key={pathway.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <span className="font-medium text-gray-800">
                {pathway.name}
              </span>

              <div className="flex gap-2">

                <button
                  onClick={() => playPathway(pathway)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Play
                </button>

                <button
                  onClick={() => editPathway(pathway)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePathway(pathway.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
      {isModalOpen && (
        <PathwayModal
          onCreate={(namePathway) => {
          addPathway(namePathway);
          setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
        )}
    </div>
  );
}