import { useMemo, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
    tournamentId: number
    tournamentTitle: string
    disabled: boolean
    status?: "upcoming" | "ongoing" | "finished"
    startDate?: string
}

export default function EnrollModal({ tournamentId, tournamentTitle, disabled, status, startDate }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [playerName, setPlayerName] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [enrolled, setEnrolled] = useState<boolean>(false)
    const [cancelLoading, setCancelLoading] = useState(false)


    const canCancel = useMemo(() => {
        if (!enrolled) return false
        if (status && status !== 'upcoming') return false
        if (!startDate) return true
        try {
            const now = new Date()
            const start = new Date(startDate)
            return now < start
        } catch {
            return true
        }
    }, [enrolled, status, startDate])


    return (
        <>
            {/* Enroll Button */}
            <button
                disabled={disabled && !enrolled}
                aria-disabled={disabled && !enrolled}
                title={disabled && !enrolled ? "Enrollment is only available for upcoming tournaments" : undefined}
                onClick={async () => {
                    // Require login before opening enrollment
                    try {
                        const res = await fetch('/api/users/user', { cache: 'no-store' })
                        if (!res.ok) {
                            const next = encodeURIComponent(window.location.pathname)
                            window.location.href = `/auth/login?next=${next}`
                            return
                        }
                    } catch (err){
                        console.log(err)
                    }
                    setIsOpen(true)
                }}
                className={`w-full h-fit py-3 px-6 rounded-lg font-bold transition shadow-[0_0_20px_rgba(245,158,11,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                    ${enrolled
                        ? "bg-green-500 text-black hover:bg-green-400"
                        : (disabled ? "bg-amber-500/70 text-black/80 cursor-not-allowed" : "bg-amber-500 text-black hover:bg-amber-400")}
                `}
            >
                {enrolled ? 'Enrolled' : 'Enroll Now'}
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-800 border border-amber-500 rounded-2xl p-6 min-h-64 flex flex-col justify-center w-[90%] sm:w-[70%] shadow-[0_0_25px_rgba(245,158,11,0.4)] relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-white"
                        >
                            <IoIosCloseCircleOutline size={25} />
                        </button>

                        <h2 className="text-2xl font-bold text-amber-400 mb-4 text-center">
                            {enrolled ? `You're enrolled in ${tournamentTitle}` : `Enroll in ${tournamentTitle}`}
                        </h2>

                        {!enrolled ? (
                            !success ? (
                                <form className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Enter your username"
                                        className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-amber-500"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`py-2 rounded-lg font-bold transition
                    ${loading
                                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                : "bg-amber-500 text-black hover:bg-amber-400"
                                            }`}
                                    >
                                        {loading ? "Enrolling..." : "Confirm Enrollment"}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <p className="text-green-400 font-semibold text-lg mb-3">
                                        ✅ {message}
                                    </p>
                                    <p className="text-gray-300 text-sm">Closing automatically...</p>
                                </div>
                            )
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-green-400 font-medium">You are currently enrolled.</p>
                                <button
                                    disabled={!canCancel || cancelLoading}
                                    title={!canCancel ? "Cancel is available only before the tournament starts" : undefined}
                                    className={`px-4 py-2 rounded-lg font-bold border transition
                                        ${!canCancel || cancelLoading
                                            ? 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
                                            : 'bg-red-600 text-white hover:bg-red-500 border-red-400'}
                                    `}
                                >
                                    {cancelLoading ? 'Canceling...' : 'Cancel Enrollment'}
                                </button>
                                {message && (
                                    <p className={`text-sm ${success ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}