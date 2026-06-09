// 資料集 (PDF 三階對照表)
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

const recommendItems = ["電子戰督導官", "電子戰裝備修修護官", "電訊搜索官"];
let currentTarget;
let currentData = [];
let activeMainIndex = 0;
let selectedSet = new Set();
let expandedSubs = new Set();
let isExpanded = false;

const modalOverlay = document.getElementById('modal-vh-overlay');
const modalContainer = document.getElementById('modal-container-box');

function openModal(dataSource, target) {
    currentTarget = document.querySelector(`#${target}`);
    currentData = dataSource;
    selectedSet.clear();
    expandedSubs.clear();
    modalContainer.classList.remove('view-sub'); // 確保每次開起都是手機初始畫面
    modalOverlay.classList.add('flex');
    renderUI();
}

function closeModal() {
    modalOverlay.classList.remove('flex');
}

function toggleExpandArea() {
    isExpanded = !isExpanded;
    const area = document.getElementById('tag-area');
    const text = document.getElementById('expand-text');
    const icon = document.getElementById('expand-icon');

    if (isExpanded) {
        area.classList.add('flex');
        text.innerText = '收起';
        icon.style.transform = 'rotate(180deg)';
    } else {
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
            modalContainer.classList.add('view-sub'); // 手機版進入次選單視圖
            renderUI();
        };
        btn.className = `menu-btn ${activeMainIndex === index ? 'active' : ''}`;

        btn.innerHTML = `
                    <span>${item.main}</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${count > 0 ? `<span class="menu-badge">${count}</span>` : ''}
                        <svg class="menu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                `;
        sidebar.appendChild(btn);
    });
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

    // 建立手機專用返回鍵
    const backBtn = document.createElement('div');
    backBtn.className = 'mobile-back-btn';
    backBtn.onclick = () => {
        modalContainer.classList.remove('view-sub'); // 移除次選單視圖切回主選單
    };
    backBtn.innerHTML = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                返回所有分類
            `;
    container.appendChild(backBtn);

    const main = currentData[activeMainIndex];
    if (!main) return;

    main.subs.forEach((sub) => {
        const subCheckedCount = sub.items.filter(i => selectedSet.has(i)).length;
        const isAllSubChecked = subCheckedCount === sub.items.length;
        const isExpanded = expandedSubs.has(sub.name);

        const section = document.createElement('div');
        section.className = "accordion-section";

        const header = document.createElement('div');
        header.className = `accordion-header ${isExpanded ? 'active-bg' : ''}`;
        header.onclick = (e) => {
            if (e.target.closest('.check-btn')) return;
            toggleAccordion(sub.name);
        };

        header.innerHTML = `
                    <div class="check-btn-container">
                         <div class="check-btn" onclick="event.stopPropagation(); toggleSubSelection('${sub.name}')">
                            ${subCheckedCount > 0 && !isAllSubChecked ? '－' : isAllSubChecked ? '✓' : ''}
                         </div>
                         <span class="sub-title">${sub.name}</span>
                    </div>
                    <svg class="accordion-arrow ${isExpanded ? 'rotate' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                `;

        const content = document.createElement('div');
        content.className = `accordion-content ${isExpanded ? 'expanded' : ''}`;
        content.innerHTML = `
                    <div class="child-list-grid">
                        ${sub.items.map(child => `
                            <label class="child-label">
                                <input type="checkbox" ${selectedSet.has(child) ? 'checked' : ''} onchange="toggleItem('${child}', event)">
                                <span>${child}</span>
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
        label.className = "recommend-label";
        label.innerHTML = `
                    <input type="checkbox" ${selectedSet.has(item) ? 'checked' : ''} onchange="toggleItem('${item}', event)">
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
        tag.className = "tag-item";
        tag.innerHTML = `
                    <span>${item}</span>
                    <button onclick="toggleItem('${item}')" class="tag-close">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                `;
        area.appendChild(tag);
    });
    if (selectedSet.size === 0) area.innerHTML = '<span style="color: #9ca3af; font-size: 0.75em; font-style: italic;">尚未選擇任何項目</span>';
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

    // 若目標內沒有 span（或目標不存在），避免 null 錯誤
    if (!currentTarget) {
        closeModal();
        return;
    }
    const targetTextNode = currentTarget.querySelector('span') || currentTarget;
    targetTextNode.textContent = result;
    closeModal();
}