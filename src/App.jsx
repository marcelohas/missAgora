import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import ChurchList from './components/ChurchList';
import { churches as initialChurches } from './data/churches';
import { getUserLocation, calculateDistance } from './utils/location';
import { sortChurchesByNextMass } from './utils/time';

function App() {
  const [churches, setChurches] = useState([]);
  const [filteredChurches, setFilteredChurches] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTime, setSearchTime] = useState('');

  // Initial load: sort by next mass based on current time
  useEffect(() => {
    const sorted = sortChurchesByNextMass(initialChurches);
    setChurches(sorted);
    setFilteredChurches(sorted);
  }, []);

  // Handle Location
  const handleLocationClick = async () => {
    setIsLocating(true);
    try {
      const location = await getUserLocation();
      setUserLocation(location);

      // Calculate distances
      const churchesWithDistance = initialChurches.map(church => ({
        ...church,
        distance: calculateDistance(location.lat, location.lng, church.coordinates.lat, church.coordinates.lng)
      }));

      // Sort by distance
      const sortedByDistance = churchesWithDistance.sort((a, b) => a.distance - b.distance);

      setChurches(sortedByDistance);
      // Clear manual search filters when using "Near Me" to show all nearby
      setSearchQuery('');
      setSearchTime('');

    } catch (error) {
      console.error("Error getting location", error);
      alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
    } finally {
      setIsLocating(false);
    }
  };

  // Handle Search
  const handleSearchChange = (type, value) => {
    if (type === 'query') setSearchQuery(value);
    if (type === 'time') setSearchTime(value);
  };

  // Filter and Sort Logic
  useEffect(() => {
    // Start with the base list (which might be sorted by distance if location was used)
    let result = [...churches];

    // 1. Filter by Query (Name, City, Neighborhood)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(church =>
        church.name.toLowerCase().includes(query) ||
        church.city.toLowerCase().includes(query) ||
        church.neighborhood.toLowerCase().includes(query)
      );
    }

    // 2. Handle Time Search/Sort
    if (searchTime) {
      // If a specific time is chosen, re-sort by that time
      const [h, m] = searchTime.split(':').map(Number);
      const referenceDate = new Date();
      referenceDate.setHours(h, m, 0, 0);

      result = sortChurchesByNextMass(result, referenceDate);
    } else if (!userLocation && !searchQuery) {
      // If no location and no specific search, ensure default sort is by Next Mass (current time)
      // This covers the initial load and reset states
      result = sortChurchesByNextMass(result);
    }
    // If userLocation is active and no time search, we keep the distance sort from handleLocationClick

    setFilteredChurches(result);
  }, [searchQuery, searchTime, churches, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <SearchFilters
        onSearchChange={handleSearchChange}
        onLocationClick={handleLocationClick}
        isLocating={isLocating}
      />
      <ChurchList churches={filteredChurches} />
    </div>
  );
}

export default App;
