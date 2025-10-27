const RankRange = require('../models/RankRange');

// Predict rank based on marks
exports.predictRank = async (marks, year, category = 'General') => {
  try {
    // Find the rank range for the given marks
    const rankData = await RankRange.findOne({
      year,
      category,
      marksRangeStart: { $lte: marks },
      marksRangeEnd: { $gte: marks }
    });

    if (!rankData) {
      // If exact year data not found, use latest available year
      const latestData = await RankRange.findOne({
        category,
        marksRangeStart: { $lte: marks },
        marksRangeEnd: { $gte: marks }
      }).sort({ year: -1 });

      if (!latestData) {
        return null; // No data available
      }

      // Linear interpolation within the range
      const marksDiff = latestData.marksRangeEnd - latestData.marksRangeStart;
      const rankDiff = latestData.rankRangeEnd - latestData.rankRangeStart;
      const marksPosition = marks - latestData.marksRangeStart;
      
      const predictedRank = Math.round(
        latestData.rankRangeStart + (marksPosition / marksDiff) * rankDiff
      );

      return predictedRank;
    }

    // Linear interpolation within the range
    const marksDiff = rankData.marksRangeEnd - rankData.marksRangeStart;
    const rankDiff = rankData.rankRangeEnd - rankData.rankRangeStart;
    const marksPosition = marks - rankData.marksRangeStart;
    
    const predictedRank = Math.round(
      rankData.rankRangeStart + (marksPosition / marksDiff) * rankDiff
    );

    return predictedRank;
  } catch (error) {
    console.error('Rank prediction error:', error);
    return null;
  }
};
