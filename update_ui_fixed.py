import re
import os

file_path = r"c:\Users\lr690\OneDrive\Desktop\new app\src\App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update imports
new_imports = "import { Home, ArrowUpRight, ArrowDownLeft, Wallet, Users, CalendarDays, Settings, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, Link2, Check, Sparkles, Receipt, Plus, X, Bell, MapPin, ArrowUp, ArrowDown, FileText, List, ChevronRight, ArrowLeftRight, User, Grid } from 'lucide-react';"
content = re.sub(r'import\s+\{[\s\S]*?\}\s+from\s+["\']lucide-react["\'];', new_imports, content)

# 2. Extract state logic and replace return statement
match = re.search(r"(\s+const NAV = \[[\s\S]*?\];\s+)(return \([\s\S]*)", content)
if not match:
    print("Could not find the return statement.")
    exit(1)

pre_return = content[:match.start(2)]

# Define the new helper components
new_helpers = """
/* ---------------------------------------------------------
   NEW PHONEPE STYLE UI HELPERS
--------------------------------------------------------- */
function ActionCard({ icon: Icon, color, label, onClick }) {
  const colors = {
    purple: { bg: "#F3E8FF", text: "#6B21A8", icon: "#7C3AED" },
    green: { bg: "#DCFCE7", text: "#166534", icon: "#16A34A" },
    blue: { bg: "#DBEAFE", text: "#1E40AF", icon: "#2563EB" },
    orange: { bg: "#FFEDD5", text: "#9A3412", icon: "#EA580C" },
  };
  const c = colors[color] || colors.purple;
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 w-full">
      <div className="w-14 h-14 rounded-[16px] flex items-center justify-center shadow-sm" style={{ backgroundColor: c.bg }}>
        <Icon size={24} color={c.icon} />
      </div>
      <span className="text-[11px] font-bold text-gray-800 flex items-center gap-0.5">{label} <ChevronRight size={10} className="text-gray-400" /></span>
    </button>
  );
}

function TransactionItem({ item }) {
  const isIncome = item.type === "income";
  // Sub-categorize based on title/category
  let iconType = isIncome ? "green" : "red";
  let IconCmp = isIncome ? ArrowUp : ArrowDown;
  
  if (item.category?.includes("UPI")) {
    iconType = "blue"; IconCmp = ArrowLeftRight;
  } else if (item.category?.includes("मासिक")) {
    iconType = "orange"; IconCmp = Users;
  }

  const iconColors = {
    green: { bg: "#22C55E", text: "#fff" },
    red: { bg: "#7C3AED", text: "#fff" }, // Mockup shows red as a purple/blue down arrow sometimes, but let's stick to red/purple
    blue: { bg: "#2563EB", text: "#fff" },
    orange: { bg: "#F59E0B", text: "#fff" },
  };
  
  if (item.type === "expense") { iconType = "purple"; iconColors.purple = { bg: "#5B21B6", text: "#fff" }; }

  const c = iconColors[iconType] || iconColors.green;

  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: c.bg, color: c.text }}>
        <IconCmp size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-gray-900 truncate">{item.category || (isIncome ? "जमा" : "निकासी")}</div>
        <div className="text-[11px] text-gray-500 truncate flex items-center gap-1">
          {item.memberName || item.particular || (isIncome ? "नकद जमा" : "भुगतान")} &bull; {item.date}
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <div className="font-bold text-sm" style={{ color: isIncome ? "#16A34A" : "#DC2626" }}>
          ₹ {formatINR(item.amount).replace("₹", "")}
        </div>
        <div className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full mt-1">सफल</div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 min-w-[64px] px-1">
      <div className={`p-1 rounded-full transition-colors ${active ? 'bg-purple-100' : ''}`}>
        <Icon size={22} className={active ? "text-[#5B21B6]" : "text-gray-400"} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-bold ${active ? "text-[#5B21B6]" : "text-gray-400"}`}>{label}</span>
    </button>
  );
}

"""

new_return = """  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-200" style={{ fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif" }}>
      <datalist id="member-list">
        {members.map((m) => (
          <option key={m.name} value={m.name} />
        ))}
      </datalist>

      <div className="w-full flex flex-col relative bg-[#F8F9FA]" style={{ minHeight: "100dvh" }}>
        
        {/* App Header */}
        <div className="relative pb-20 pt-8 px-5 shrink-0" style={{ background: `linear-gradient(145deg, #5B21B6 0%, #7C3AED 100%)`, color: "#fff", borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}>
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-5">
             <div className="text-xs font-semibold tracking-wider opacity-90">|| श्री गणेशाय नमः ||</div>
             <div className="flex gap-3">
                <button className="bg-white/15 p-2 rounded-full hover:bg-white/25 transition-colors relative">
                   <Bell size={18} />
                   <div className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#6D28D9]"></div>
                </button>
                <button onClick={() => setTab("settings")} className="bg-white/15 p-2 rounded-full hover:bg-white/25 transition-colors">
                   <Settings size={18} />
                </button>
             </div>
          </div>
          {/* Title Area */}
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center p-0.5 border-[3px] border-yellow-400 shrink-0 overflow-hidden shadow-lg">
               <img src="https://i.imgur.com/kHXYhP2.png" alt="Ganesha" className="w-full h-full rounded-full object-cover" onError={(e) => e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="50" fill="%23fbbf24"/><text x="50" y="55" font-size="30" text-anchor="middle" fill="white" font-family="sans-serif">ॐ</text></svg>'} />
             </div>
             <div>
               <h1 className="text-[17px] font-bold leading-tight mb-1.5 drop-shadow-sm">श्री बजरंग युवा गणेश उत्सव समिति</h1>
               <div className="flex items-center gap-1.5 text-xs opacity-90 font-medium"><MapPin size={12} /> गणेश समिति</div>
             </div>
          </div>
        </div>

        {/* Balance Card - Overlapping */}
        <div className="px-5 -mt-12 relative z-10 shrink-0">
          <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
               <div>
                  <div className="flex items-center gap-2 text-gray-600 font-bold text-sm mb-1">
                    <Wallet size={16} className="text-[#5B21B6]"/> कुल शेष राशि
                  </div>
                  <div className="text-[34px] font-extrabold text-[#1E1B4B] tracking-tight">
                    {formatINR(balance)}
                  </div>
               </div>
               <div className="bg-purple-50 p-3 rounded-2xl">
                 <Wallet size={32} className="text-[#7C3AED]" />
               </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-gray-100">
               <div className="flex-1 flex items-center gap-3">
                 <div className="bg-green-100 p-1.5 rounded-full"><ArrowUp size={14} className="text-green-600 stroke-[3]"/></div>
                 <div>
                   <div className="text-[11px] text-gray-500 font-bold mb-0.5">कुल जमा</div>
                   <div className="text-sm font-bold text-green-600">{formatINR(totalIncome)}</div>
                 </div>
               </div>
               <div className="w-px bg-gray-100 my-1"></div>
               <div className="flex-1 flex items-center gap-3">
                 <div className="bg-red-100 p-1.5 rounded-full"><ArrowDown size={14} className="text-red-500 stroke-[3]"/></div>
                 <div>
                   <div className="text-[11px] text-gray-500 font-bold mb-0.5">कुल निकासी</div>
                   <div className="text-sm font-bold text-red-500">{formatINR(totalExpense)}</div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-5 pt-6 pb-24 overflow-y-auto no-scrollbar">
          {error && (
            <div className="rounded-2xl p-3 mb-4 text-xs flex items-start gap-2 bg-red-50 text-red-600 font-medium">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tab === "settings" && <SettingsPanel config={config} onSave={handleSaveConfig} status={saveStatus} />}
          
          {tab === "dashboard" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                 <ActionCard icon={ArrowDownLeft} color="purple" label="जमा" onClick={() => { setModalPreset(null); setModal("income"); }} />
                 <ActionCard icon={ArrowUpRight} color="green" label="निकासी" onClick={() => { setModalPreset(null); setModal("expense"); }} />
                 <ActionCard icon={FileText} color="blue" label="रिपोर्ट" onClick={() => setTab("monthly")} />
                 <ActionCard icon={Users} color="orange" label="सदस्य" onClick={() => setModal("members")} />
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mb-5">
                <div className="flex items-center justify-between p-4 px-5 border-b border-gray-50">
                  <div className="flex items-center gap-2 font-extrabold text-[15px] text-gray-800">
                     <div className="bg-[#5B21B6] p-1 rounded-[6px] text-white"><List size={14} strokeWidth={3}/></div>
                     हाल के लेन-देन
                  </div>
                  <button onClick={() => setTab("income")} className="text-[13px] font-bold text-[#7C3AED] flex items-center">सभी देखें <ChevronRight size={16}/></button>
                </div>
                
                <div className="flex flex-col">
                  {[...incomeItems.map((i) => ({ ...i, type: "income" })), ...expenseItems.map((i) => ({ ...i, type: "expense" }))]
                    .sort((a, b) => (b.dateInfo?.sortKey || 0) - (a.dateInfo?.sortKey || 0))
                    .slice(0, 5)
                    .map((it, idx) => (
                      <TransactionItem key={idx} item={it} />
                  ))}
                  {incomeItems.length === 0 && expenseItems.length === 0 && <div className="p-8 text-center text-gray-400 text-sm font-medium">अभी कोई लेन-देन नहीं हुआ है।</div>}
                </div>
              </div>

              {/* Promo Banner */}
              <div className="bg-[#F3E8FF] rounded-[20px] p-4 flex items-center gap-4 text-[#4C1D95]">
                <div className="bg-[#6D28D9] p-2.5 rounded-full text-white shrink-0 shadow-sm"><Sparkles size={20}/></div>
                <div>
                  <div className="font-extrabold text-[13px] mb-0.5">मिलकर करें बेहतर कल का निर्माण</div>
                  <div className="text-[11px] font-medium opacity-80">आपका योगदान ही हमारी शक्ति है</div>
                </div>
              </div>
            </div>
          )}

          {tab === "expense" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-extrabold text-gray-800">
                  कुल निकासी: <span className="text-red-600">{formatINR(totalExpense)}</span>
                </div>
                <button onClick={() => { setModalPreset(null); setModal("expense"); }} className="rounded-full px-4 py-2 text-xs font-bold text-white flex items-center gap-1.5 bg-[#5B21B6] shadow-md">
                  <Plus size={14} strokeWidth={3}/> नया जोड़ें
                </button>
              </div>
              {expenseMonths.length === 0 && <EmptyState text={loading ? "Load ho raha hai..." : "Koi expense data nahi mila."} />}
              {expenseMonths.map((g) => (
                <MonthGroup key={g.key} group={g} open={!!openMonths[g.key]} onToggle={() => toggleMonth(g.key)} renderItem={(it) => <ExpenseRow item={it} />} />
              ))}
            </div>
          )}

          {tab === "income" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-extrabold text-gray-800">
                  कुल जमा: <span className="text-green-600">{formatINR(totalIncome)}</span>
                </div>
                <button onClick={() => { setModalPreset(null); setModal("income"); }} className="rounded-full px-4 py-2 text-xs font-bold text-white flex items-center gap-1.5 bg-[#5B21B6] shadow-md">
                  <Plus size={14} strokeWidth={3}/> नया जोड़ें
                </button>
              </div>
              {incomeMonths.length === 0 && <EmptyState text={loading ? "Load ho raha hai..." : "Koi income data nahi mila."} />}
              {incomeMonths.map((g) => (
                <MonthGroup key={g.key} group={g} open={!!openMonths[g.key]} onToggle={() => toggleMonth(g.key)} renderItem={(it) => <IncomeRow item={it} />} />
              ))}
            </div>
          )}

          {tab === "credit" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex gap-3 mb-5">
                <div className="flex-1 rounded-[20px] p-4 bg-white shadow-sm border border-gray-100">
                  <div className="text-[11px] font-bold text-gray-500 mb-1">वसूली बाकी</div>
                  <div className="text-xl font-extrabold text-red-600">
                    {formatINR(creditIncome.reduce((s, i) => s + i.credit, 0))}
                  </div>
                </div>
                <div className="flex-1 rounded-[20px] p-4 bg-white shadow-sm border border-gray-100">
                  <div className="text-[11px] font-bold text-gray-500 mb-1">भुगतान बाकी</div>
                  <div className="text-xl font-extrabold text-red-600">
                    {formatINR(creditExpense.reduce((s, i) => s + i.credit, 0))}
                  </div>
                </div>
              </div>
              <div className="text-sm font-extrabold mb-3 text-gray-800">जमा में उधार (वसूली बाकी)</div>
              {creditIncome.length === 0 && <EmptyState text="Koi udhar baki nahi." />}
              {creditIncome.map((it, i) => <IncomeRow key={i} item={it} />)}
              
              <div className="text-sm font-extrabold mb-3 mt-6 text-gray-800">खर्च में उधार (भुगतान बाकी)</div>
              {creditExpense.length === 0 && <EmptyState text="Koi udhar baki nahi." />}
              {creditExpense.map((it, i) => <ExpenseRow key={i} item={it} />)}
            </div>
          )}

          {tab === "members" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-extrabold text-gray-800">
                  सदस्य सूची ({members.length})
                </div>
                <button onClick={() => setModal("member")} className="rounded-full px-4 py-2 text-xs font-bold text-white flex items-center gap-1.5 bg-[#5B21B6] shadow-md">
                  <Plus size={14} strokeWidth={3}/> नया सदस्य
                </button>
              </div>
              {members.length === 0 && <EmptyState text="Abhi koi sadasya nahi hai." />}
              {members.map((m, i) => (
                <div key={i} className="bg-white rounded-[20px] p-4 mb-3 flex items-center gap-4 shadow-sm border border-gray-50">
                  <div className="rounded-full flex items-center justify-center shrink-0 font-bold text-lg bg-purple-100 text-[#5B21B6] w-12 h-12">
                    {initials(m.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[15px] text-gray-900 truncate mb-0.5">
                      {m.name}
                    </div>
                    <div className="text-[11px] font-medium text-gray-500">
                      {m.entries} लेन-देन &bull; कुल जमा {formatINR(m.amount)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-green-600 mb-0.5">
                      मिला {formatINR(m.paid)}
                    </div>
                    {m.credit > 0 && (
                      <div className="text-xs font-extrabold text-red-600">
                        बाकी {formatINR(m.credit)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "monthly" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-sm font-extrabold mb-4 text-gray-800">
                मासिक रिपोर्ट
              </div>
              {Array.from(new Set([...expenseMonths, ...incomeMonths].map((g) => g.key)))
                .sort()
                .reverse()
                .map((key) => {
                  const inc = incomeMonths.find((g) => g.key === key);
                  const exp = expenseMonths.find((g) => g.key === key);
                  const label = (inc || exp)?.label || key;
                  const net = (inc?.amount || 0) - (exp?.amount || 0);
                  return (
                    <div key={key} className="bg-white rounded-[20px] p-4 mb-3 shadow-sm border border-gray-100">
                      <div className="font-extrabold text-sm mb-3 text-gray-900 border-b border-gray-50 pb-2">
                        {label}
                      </div>
                      <div className="flex justify-between text-xs mb-2 font-medium">
                        <span className="text-gray-500">कुल जमा</span>
                        <span className="text-green-600 font-bold">{formatINR(inc?.amount || 0)}</span>
                      </div>
                      <div className="flex justify-between text-xs mb-2 font-medium">
                        <span className="text-gray-500">कुल निकासी</span>
                        <span className="text-red-600 font-bold">{formatINR(exp?.amount || 0)}</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 mt-2 font-extrabold bg-gray-50 -mx-4 px-4 pb-1 rounded-b-[16px]" style={{ color: net >= 0 ? "#16A34A" : "#DC2626" }}>
                        <span>शुद्ध शेष</span>
                        <span>{formatINR(net)}</span>
                      </div>
                    </div>
                  );
                })}
              {expenseMonths.length === 0 && incomeMonths.length === 0 && <EmptyState text="Abhi koi data nahi." />}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-2.5 pb-6 shadow-[0_-4px_25px_rgba(0,0,0,0.04)] z-20">
           <NavItem icon={Home} label="होम" active={tab==="dashboard"} onClick={() => setTab("dashboard")} />
           <NavItem icon={ArrowLeftRight} label="लेन-देन" active={tab==="expense" || tab==="income"} onClick={() => setTab("expense")} />
           <NavItem icon={FileText} label="रिपोर्ट" active={tab==="monthly"} onClick={() => setTab("monthly")} />
           <NavItem icon={User} label="सदस्य" active={tab==="members"} onClick={() => setTab("members")} />
           <NavItem icon={Grid} label="सभी फोल्डर" active={tab==="credit"} onClick={() => setTab("credit")} />
        </div>

        {/* Toast */}
        {toast && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-2.5 text-xs font-bold text-white bg-gray-900 shadow-xl animate-in fade-in slide-in-from-bottom-5">
            {toast}
          </div>
        )}

        {/* Modals */}
        {modal === "expense" && (
          <Sheet title="नया खर्च जोड़ें" onClose={() => setModal(null)}>
            <ExpenseForm initial={modalPreset} onCancel={() => setModal(null)} onSave={saveLocalExpense} />
          </Sheet>
        )}
        {modal === "income" && (
          <Sheet title="नई जमा जोड़ें" onClose={() => setModal(null)}>
            <IncomeForm initial={modalPreset} onCancel={() => setModal(null)} onSave={saveLocalIncome} />
          </Sheet>
        )}
        {modal === "member" && (
          <Sheet title="नया सदस्य जोड़ें" onClose={() => setModal(null)}>
            <MemberForm onSave={saveMember} />
          </Sheet>
        )}
        {modal === "udhar" && (
          <Sheet title="किस तरह का उधार?" onClose={() => setModal(null)}>
            <UdharChooser
              onChoose={(type) => {
                setTab("credit");
                setModal(null);
              }}
            />
          </Sheet>
        )}
      </div>
    </div>
  );
}

export default GaneshChaturthiApp;
"""

final_content = new_helpers + pre_return + new_return

with open(file_path, "w", encoding="utf-8") as f:
    f.write(final_content)

print("Updated App.jsx successfully!")
