import { useState, useEffect } from 'react';

interface StatData {
  day: string;
  visitors: number;
}

const VisitorStats = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [stats, setStats] = useState<StatData[]>([]);
  
  // Generate mock data for stats
  useEffect(() => {
    const generateMockData = () => {
      const data: StatData[] = [];
      const now = new Date();
      const daysToGenerate = timeRange === 'week' ? 7 : 30;
      
      for (let i = daysToGenerate - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const day = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        
        // Generate random visitor count (higher for recent days)
        const recencyBoost = Math.max(0, (daysToGenerate - i) / 3);
        const baseVisitors = timeRange === 'week' ? 20 : 10;
        const visitors = Math.floor(Math.random() * 15 + baseVisitors + recencyBoost);
        
        data.push({ day, visitors });
      }
      
      setStats(data);
    };
    
    generateMockData();
  }, [timeRange]);
  
  // Calculate total visitors
  const totalVisitors = stats.reduce((sum, day) => sum + day.visitors, 0);
  
  // Find the day with max visitors
  const maxVisitDay = stats.length > 0 
    ? stats.reduce((max, day) => day.visitors > max.visitors ? day : max, stats[0])
    : null;
  
  // Calculate average daily visitors
  const avgVisitors = stats.length > 0 
    ? Math.round(totalVisitors / stats.length) 
    : 0;
  
  return (
    <div className="bg-gunmetal-gray rounded-xl border border-cool-cyan/20 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-cool-cyan/20 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-cool-cyan">Visitor Stats</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setTimeRange('week')}
            className={`text-xs px-2 py-1 rounded ${
              timeRange === 'week' 
                ? 'bg-cool-cyan text-forge-black' 
                : 'bg-forge-black text-chrome-silver'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')}
            className={`text-xs px-2 py-1 rounded ${
              timeRange === 'month' 
                ? 'bg-cool-cyan text-forge-black' 
                : 'bg-forge-black text-chrome-silver'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-forge-black p-3 rounded-lg border border-cool-cyan/10">
            <p className="text-xs text-chrome-silver/60">Total Visitors</p>
            <p className="text-2xl font-semibold text-cool-cyan">{totalVisitors}</p>
          </div>
          <div className="bg-forge-black p-3 rounded-lg border border-cool-cyan/10">
            <p className="text-xs text-chrome-silver/60">Avg. Daily</p>
            <p className="text-2xl font-semibold text-molten-orange">{avgVisitors}</p>
          </div>
          <div className="bg-forge-black p-3 rounded-lg border border-cool-cyan/10">
            <p className="text-xs text-chrome-silver/60">Peak Day</p>
            <p className="text-lg font-semibold text-ember-red">{maxVisitDay?.day}</p>
            <p className="text-xs text-chrome-silver/60">{maxVisitDay?.visitors} visitors</p>
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-64 flex items-end space-x-1">
          {stats.map((day, index) => {
            // Calculate height percentage (max height is 80% of container)
            const maxVisitors = Math.max(...stats.map(d => d.visitors));
            const heightPercent = (day.visitors / maxVisitors) * 80;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-cool-cyan/60 hover:bg-cool-cyan transition-colors rounded-t"
                  style={{ height: `${heightPercent}%` }}
                  title={`${day.visitors} visitors`}
                ></div>
                <p className="text-xs text-chrome-silver/60 mt-1 transform -rotate-45 origin-top-left">
                  {day.day}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center text-xs text-chrome-silver/60">
          <p>Note: These are mock stats for demonstration purposes.</p>
          <p>Connect to Plausible, Vercel Analytics, or Firebase for real data.</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats; 