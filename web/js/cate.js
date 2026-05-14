// 三階層資料
const militaryMenuData = [
    {
        main: "指揮管理",
        subs: [
            {
                name: "戰鬥官科",
                items: ["步兵指揮將官", "機械化步兵指揮官", "裝甲兵指揮將官", "裝甲部隊指揮官", "砲兵指揮將官", "野戰砲兵指揮官", "火箭防空砲兵指揮官", "飛彈部隊指揮官", "航空指揮將官", "艦艇指揮官"]
            },
            {
                name: "戰鬥勤務官科",
                items: ["化學兵指揮將官", "化學兵指揮官", "工兵指揮將官"]
            },
            {
                name: "技術(一般)勤務官科",
                items: ["兵工部隊指揮官", "兵工廠庫主官", "航機保修部隊指揮官", "航機保修廠庫主官", "飛彈保修廠庫主官"]
            },
            {
                name: "官通類",
                items: ["聯合兵種指揮將官", "聯合兵種指揮官", "聯合後勤指揮將官", "科技指揮將官", "資訊指揮官"]
            }
        ]
    },
    {
        main: "人事行政",
        subs: [
            {
                name: "人事行政",
                items: ["人事(力)行政將官", "人事(力)管理督導官", "保險撫卹官", "史政編譯將官", "史政管理督導官"]
            },
            {
                name: "教育",
                items: ["教育行政將官", "教育行政督導官"]
            }
        ]
    },
    {
        main: "情報",
        subs: [
            {
                name: "情報",
                items: ["情報將官", "情報督導官"]
            }
        ]
    }
];
const civilianMenuData = [
    {
        main: "經營/行政/總務",
        subs: [
            {
                name: "經營",
                items: ["經營管理主管", "管理部經理", "幹事", "儲備幹部", "大廈或社區總幹事/幹事"]
            },
            {
                name: "行政",
                items: ["主管特別助理", "行政事務秘書", "電腦操作及輸入(Keyin)人員", "檔案資料管理人員", "接待人員", "行政助理"]
            },
            {
                name: "總務",
                items: ["行政總務主管", "行政總務人員", "總機接待人員"]
            }
        ]
    },
    {
        main: "業務/貿易/銷售",
        subs: [
            {
                name: "業務",
                items: ["業務主管", "業務人員", "業務助理", "網購助理"]
            },
            {
                name: "貿易",
                items: ["國貿人員", "押匯及報關人員", "保稅人員"]
            },
            {
                name: "銷售",
                items: ["銷售經理", "電話行銷人員", "展店開發人員", "不動產銷售人員", "汽機車銷售人員", "醫藥業務代表", "廣告AE業務人員", "駐校代表", "汽車租賃業務人員"]
            }
        ]
    },
    {
        main: "人資/法務/智財",
        subs: [
            {
                name: "人資",
                items: ["人力資源主管", "人力資源專員", "人力資源助理", "教育訓練人員", "人力/移工仲介"]
            },
            {
                name: "法務",
                items: ["律師", "法律顧問人員", "不動產代書", "法律助理人員", "工商登記服務人員", "代書/地政士"]
            },
            {
                name: "智財",
                items: ["專利代理人", "法務/智財主管"]
            }
        ]
    },
    {
        main: "財務/金融/保險",
        subs: [
            {
                name: "財務",
                items: ["財務主管", "會計師", "會計主管", "主辦及成本會計", "審計人員", "稽核人員", "會計助理", "財務專業人員", "股務代理事務員", "稅務人員", "不動產鑑價/估價師"]
            },
            {
                name: "金融",
                items: ["金融專業人員", "融資授信業務人員", "銀行櫃員", "金融投資人員", "金融研究員", "證券營業員", "理財專員", "證券商後線人員", "催收人員", "銀行/投顧經理", "金融專業主管", "徵信人員"]
            },
            {
                name: "保險",
                items: ["保險業務員", "統計精算人員", "理賠人員", "核保/保險內勤人員"]
            }
        ]
    },
    {
        main: "廣告/公關/設計",
        subs: [
            {
                name: "廣告",
                items: ["廣告企劃主管", "廣告文案人員"]
            },
            {
                name: "公關",
                items: ["創意指導", "媒體公關宣傳或購買", "公關主管/發言人", "公關企劃人員", "廣告媒體企劃人員"]
            }
        ]
    }
];
// 推薦職類（可自行調整）
const recommendItems = ["電子戰督導官", "電子戰裝備修護官", "電訊搜索官"];
let currentTarget;
let currentData = [];
let activeMainIndex = 0;
let selectedSet = new Set();
let expandedSubs = new Set();
let isExpanded = false;

function openModal(dataSource, target) {
    currentData = dataSource;
    console.log(target);

    currentTarget = document.querySelector(`#${target}`);
    expandedSubs.clear();
    document.getElementById('modal-vh').classList.remove('hidden');
    document.getElementById('modal-vh').classList.add('flex');
    renderUI();
}

function closeModal() {
    document.getElementById('modal-vh').classList.add('hidden');
    document.getElementById('modal-vh').classList.remove('flex');
}

function toggleExpandArea() {
    isExpanded = !isExpanded;
    const area = document.getElementById('tag-area');
    const text = document.getElementById('expand-text');
    const icon = document.getElementById('expand-icon');

    if (isExpanded) {
        area.classList.remove('hidden');
        area.classList.add('flex');
        text.innerText = '收起';
        icon.style.transform = 'rotate(180deg)';
    } else {
        area.classList.add('hidden');
        area.classList.remove('flex');
        text.innerText = '展開';
        icon.style.transform = 'rotate(0deg)';
    }
}

function renderUI() {
    renderSidebar();
    renderContent();
    renderRecommendations();
    renderTags();
    updateStats();
}

function renderSidebar() {
    const sidebar = document.getElementById('main-menu');
    sidebar.innerHTML = '';

    currentData.forEach((item, index) => {
        let count = 0;
        item.subs.forEach(sub => {
            sub.items.forEach(child => {
                if (selectedSet.has(child)) count++;
            });
        });

        const btn = document.createElement('button');
        btn.onclick = () => {
            activeMainIndex = index;
            expandedSubs.clear();
            document.getElementById('modal-vh').classList.add('view-sub');
            renderUI();
        };

        btn.className = `w-full flex justify-between items-center px-6 py-5 text-left transition-all border-b border-gray-100 ${activeMainIndex === index ? 'bg-white text-orange-500 font-bold border-r-4 border-r-orange-500 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`;

        btn.innerHTML = `
                    <span>${item.main}</span>
                    <div class="flex items-center gap-2">
                        ${count > 0 ? `<span class="bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">${count}</span>` : ''}
                        <svg class="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                `;
        sidebar.appendChild(btn);
    });
}
// 在「返回所有分類」的偽元素點擊可能較難處理，
// 建議直接在 JS 增加一個專門的返回函式給手機版使用：
function backToMainMenu() {
    document.getElementById('modal-vh').classList.remove('view-sub');
}
function toggleAccordion(subName) {
    if (expandedSubs.has(subName)) {
        expandedSubs.delete(subName);
    } else {
        expandedSubs.add(subName);
    }
    renderContent();
}

function renderContent() {
    const container = document.getElementById('sub-content');
    container.innerHTML = '';
    // --- 加入返回按鈕的 HTML (僅手機版會透過 CSS 顯示) ---
    const backBtn = document.createElement('div');
    backBtn.className = 'mobile-back-btn';
    backBtn.onclick = () => {
        document.getElementById('modal-vh').classList.remove('view-sub');
    };
    backBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        返回所有分類
    `;
    container.appendChild(backBtn);
    const main = currentData[activeMainIndex];

    main.subs.forEach((sub, subIdx) => {
        const subCheckedCount = sub.items.filter(i => selectedSet.has(i)).length;
        const isAllSubChecked = subCheckedCount === sub.items.length;
        const isExpanded = expandedSubs.has(sub.name);

        const section = document.createElement('div');
        section.className = "mb-2 border border-gray-100 rounded-lg overflow-hidden transition-all";

        const header = document.createElement('div');
        header.className = `flex items-center px-4 py-2 cursor-pointer group select-none transition-colors ${isExpanded ? 'bg-orange-50/30' : 'bg-gray-50'}`;

        // 點擊整列（扣除勾選框區域）觸發展開/收起
        header.onclick = (e) => {
            if (e.target.closest('.check-btn')) return;
            toggleAccordion(sub.name);
        };

        header.innerHTML = `
                    <div class="flex lg:items-center gap-3 flex-1">
                         <!-- 勾選框按鈕：獨立點擊區域 -->
                         <div class="check-btn w-5 h-5 flex items-center justify-center rounded text-xs font-bold transition-all border-2 
              ${subCheckedCount > 0 ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 bg-white'}" 
              onclick="event.stopPropagation(); toggleSubSelection('${sub.name}')">
            ${subCheckedCount > 0 && !isAllSubChecked ? '－' : isAllSubChecked ? '✓' : ''}
         </div>
                         <!-- 標題文字：點擊觸發摺疊 -->
                         <span class="font-bold text-gray-700 flex-1 py-1">${sub.name}</span>
                    </div>
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                `;

        const content = document.createElement('div');
        content.className = `accordion-content ${isExpanded ? 'expanded border-t border-dashed border-gray-100' : ''}`;
        content.innerHTML = `
                    <div class="grid grid-cols-1">
                        ${sub.items.map(child => `
                            <label class="flex items-center gap-3 h-[40px] pl-5 cursor-pointer group select-none hover:bg-orange-50">
                                <input type="checkbox" class="w-5 h-5 cursor-pointer" ${selectedSet.has(child) ? 'checked' : ''} onchange="toggleItem('${child}', event)">
                                <span class="text-sm text-gray-600 group-hover:text-orange-500 transition-colors">${child}</span>
                            </label>
                        `).join('')}
                    </div>
                `;

        section.appendChild(header);
        section.appendChild(content);
        container.appendChild(section);
    });
}

function renderRecommendations() {
    const list = document.getElementById('recommend-list');
    list.innerHTML = '';
    recommendItems.forEach(item => {
        const label = document.createElement('label');
        label.className = "flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-orange-500 transition-colors";
        label.innerHTML = `
                    <input type="checkbox" class="w-4 h-4 cursor-pointer" ${selectedSet.has(item) ? 'checked' : ''} onchange="toggleItem('${item}', event)">
                    <span>${item}</span>
                `;
        list.appendChild(label);
    });
}

function renderTags() {
    const area = document.getElementById('tag-area');
    area.innerHTML = '';
    selectedSet.forEach(item => {
        const tag = document.createElement('div');
        tag.className = "flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 animate-in fade-in zoom-in duration-150";
        tag.innerHTML = `
                    <span>${item}</span>
                    <button onclick="toggleItem('${item}')" class="hover:bg-orange-200 rounded-full p-0.5 ml-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                `;
        area.appendChild(tag);
    });
    if (selectedSet.size === 0) area.innerHTML = '<span class="text-gray-400 text-xs italic">尚未選擇任何項目</span>';
}

function toggleItem(itemName, event) {
    if (selectedSet.has(itemName)) {
        selectedSet.delete(itemName);
    } else {
        if (selectedSet.size >= 5) {
            showToast();
            if (event) event.target.checked = false;
            return;
        }
        selectedSet.add(itemName);
    }
    renderUI();
}

function toggleSubSelection(subName) {
    let subObj = null;
    currentData.forEach(m => {
        const found = m.subs.find(s => s.name === subName);
        if (found) subObj = found;
    });
    if (!subObj) return;

    const subItems = subObj.items;
    const alreadyInSubCount = subItems.filter(i => selectedSet.has(i)).length;

    if (alreadyInSubCount === subItems.length) {
        subItems.forEach(i => selectedSet.delete(i));
    } else {
        for (const i of subItems) {
            if (!selectedSet.has(i)) {
                if (selectedSet.size >= 5) {
                    showToast();
                    break;
                }
                selectedSet.add(i);
            }
        }
    }
    renderUI();
}

function clearAll() {
    selectedSet.clear();
    renderUI();
}

function updateStats() {
    document.getElementById('selected-count').innerText = selectedSet.size;
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(-10px)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(0px)';
    }, 2000);
}

function confirmFinal() {
    if (selectedSet.size === 0) {
        alert("請至少選擇一個專長");
        return;
    }
    const result = Array.from(selectedSet).join('、');
    //lert("已成功選取：\n" + result);
    console.log(result, currentTarget)
    currentTarget.innerHTML = result
    closeModal();
}