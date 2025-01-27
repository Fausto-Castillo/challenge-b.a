const calculatePercentage = (foreignBorn: number | undefined, totalPopulation: number | undefined): null | number => {
    if (!totalPopulation || totalPopulation === 0 || !foreignBorn) return null;
    const percentage = (foreignBorn / totalPopulation) * 100;
    return percentage;
};

export default calculatePercentage;