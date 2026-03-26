import TrendingGames from './TrendingGames';
import NewReleases from './NewReleases';
import RecommendedGames from './RecommendedGames';
import { useState, type Dispatch, type SetStateAction } from 'react';

const GamesGrid = () => {
    const [loadingStates, setLoadingStates] = useState({
        trending: true,
        newReleases: true,
        recommended: true
    });

    const updateLoadingState = (section: 'trending' | 'newReleases' | 'recommended'): Dispatch<SetStateAction<boolean>> =>
        (value) => {
            const newValue = typeof value === 'function'
                ? value(loadingStates[section])
                : value;
            setLoadingStates(prev => ({ ...prev, [section]: newValue }));
        };

    return (
        <section className="px-4 sm:px-6 pb-16 space-y-6">
            {/* Trending Games */}
            <TrendingGames setLoading={updateLoadingState('trending')} />

            {/* New Releases */}
            <NewReleases setLoading={updateLoadingState('newReleases')} />

            {/* Recommended For You */}
            <RecommendedGames setLoading={updateLoadingState('recommended')} />
        </section>
    );
};

export default GamesGrid;