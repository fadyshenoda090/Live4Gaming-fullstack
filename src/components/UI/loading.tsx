// app/loading.tsx
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-amber-400">
            <div className="relative">
                {/* Outer glowing ring */}
                <div className="w-24 h-24 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
                {/* Inner slower ring */}
                <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-orange-500 rounded-full animate-[spin_3s_linear_infinite]" />

                {/* Center glowing orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.8)]"></div>
                </div>
            </div>
        </div>
    );
}