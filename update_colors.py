import os

jsx_file = r'c:\Users\lr690\OneDrive\Desktop\new app\src\pages\Dashboard.jsx'

with open(jsx_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Quick Action Icons
content = content.replace(
    '<Zap size={20} className="text-purple-600" fill="currentColor" />',
    '<Zap size={20} color="#6D28D9" fill="#6D28D9" />'
)
content = content.replace(
    '<Download size={28} className="text-purple-700" strokeWidth={2.5} />',
    '<Download size={28} color="#6D28D9" strokeWidth={2.5} />'
)
content = content.replace(
    '<Upload size={28} className="text-blue-600" strokeWidth={2.5} />',
    '<Upload size={28} color="#0284C7" strokeWidth={2.5} />'
)
content = content.replace(
    '<IndianRupee size={28} className="text-green-700" strokeWidth={2.5} />',
    '<IndianRupee size={28} color="#16A34A" strokeWidth={2.5} />'
)
content = content.replace(
    '<Users size={28} className="text-orange-700" strokeWidth={2.5} />',
    '<Users size={28} color="#EA580C" strokeWidth={2.5} />'
)
content = content.replace(
    '<BarChart2 size={28} className="text-indigo-700" strokeWidth={2.5} />',
    '<BarChart2 size={28} color="#4F46E5" strokeWidth={2.5} />'
)

# Replace Reports Section icon
content = content.replace(
    '<Folder size={20} className="text-blue-600" fill="currentColor" />',
    '<Folder size={20} color="#0284C7" fill="#0284C7" />'
)

with open(jsx_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Icons successfully colorized.")
