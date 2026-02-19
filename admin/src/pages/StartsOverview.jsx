import { TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', grow: '+12%', icon: <DollarSign />, color: 'bg-emerald-500' },
    { label: 'Total Orders', value: '456', grow: '+5%', icon: <ShoppingBag />, color: 'bg-blue-500' },
    { label: 'Active Users', value: '2,890', grow: '+18%', icon: <Users />, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-2">
              <TrendingUp size={12} /> {stat.grow} from last month
            </span>
          </div>
          <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};