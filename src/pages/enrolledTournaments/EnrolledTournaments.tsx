
import {useMemo, useState } from 'react'
import {Link} from "react-router-dom";
import type {Tournament} from "../../types/types.ts";

const EnrolledTournamentsPage =()=> {
    const [tournaments, setTournaments] = useState([])
  const [ids, setIds] = useState<string[]>([])
  const [cancelingId, setCancelingId] = useState<string | null>(null)
    

  const enrolledTournaments = useMemo(() => {
    const set = new Set(ids)
    return tournaments.filter((t: Tournament) => set.has(t.id))
  }, [ids])


  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-6">
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-white">Enrolled Tournaments</h1>
          <span className="text-amber-400 font-semibold">{enrolledTournaments.length} enrolled</span>
        </div>

        {enrolledTournaments.length === 0 ? (
          <div className="text-center text-gray-300 py-20 border border-dashed border-gray-700 rounded-xl">
            <p className="mb-4">You haven't enrolled in any tournament yet.</p>
            <Link to="/tournaments" className="inline-block px-5 py-2 rounded-lg bg-amber-500 text-black font-bold hover:bg-amber-400 transition">Browse Tournaments</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledTournaments && enrolledTournaments.map((t: Tournament) => (
              <div key={t.id} className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300">
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={t.image} alt={t.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-gray-900/80 text-amber-300 text-xs px-2 py-1 rounded border border-amber-500">
                    {t.genre}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{t.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="text-amber-400">{t.prizePool}</span>
                    <span className="capitalize">{t.status}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <Link to={`/tournaments/${t.id}`} className="flex-1 text-center px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition">View</Link>
                    <button
                      disabled={t.status !== 'upcoming' || cancelingId === t.id}
                      title={t.status !== 'upcoming' ? 'Cancel is available only before the tournament starts' : undefined}
                      className={`px-4 py-2 rounded-lg font-bold transition border
                        ${t.status !== 'upcoming' || cancelingId === t.id
                          ? 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-500 border-red-400'}`}
                    >
                      {cancelingId === t.id ? 'Canceling...' : 'Cancel'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default EnrolledTournamentsPage