// 词云数据
const skills = [
    { text: "Python", color: "#3b82f6" },
    { text: "C++", color: "#ef4444" },
    { text: "Java", color: "#10b981" },
    { text: "前端", color: "#f59e0b" },
    { text: "算法", color: "#8b5cf6" },
    { text: "卷", color: "#3b82f6" },
    { text: "图书馆", color: "#ef4444" },
    { text: "摄影", color: "#10b981" },
    { text: "象棋", color: "#f59e0b" },
    { text: "钢琴", color: "#8b5cf6" },
    { text: "偷懒", color: "#3b82f6" },
    { text: "GTAV", color: "#ef4444" },
    { text: "解密", color: "#10b981" },
    { text: "后端", color: "#a3d7f5" }
];

// 动态生成词云
const wordCloud = document.querySelector('.word-cloud');

// 获取 main 区域的尺寸
const mainWidth = wordCloud.clientWidth;
const mainHeight = wordCloud.clientHeight;

// 分布范围：25%-75%
const minX = mainWidth * 0.25;
const maxX = mainWidth * 0.75;
const minY = mainHeight * 0.25;
const maxY = mainHeight * 0.75;

// 最小间距
const minDistance = 100;

// 已放置词云的位置
const placedItems = [];

skills.forEach((skill, index) => {
    const wordItem = document.createElement('div');
    wordItem.className = 'word-item';
    wordItem.style.setProperty('--word-color', skill.color);
    wordItem.style.setProperty('--circle-color', `${skill.color}20`);
    wordItem.style.setProperty('--circle-size', `${Math.max(80, skill.text.length * 20)}px`);
    wordItem.style.animationDelay = `${index * 0.2}s`;

    wordItem.innerHTML = `
        <span>${skill.text}</span>
        <div class="circle"></div>
    `;

    // 随机生成位置，确保不重叠
    let x, y;
    let attempts = 0;
    do {
        x = minX + Math.random() * (maxX - minX);
        y = minY + Math.random() * (maxY - minY);
        attempts++;
    } while (isOverlapping(x, y) && attempts < 100);

    placedItems.push({ x, y, element: wordItem });

    wordItem.style.left = `${x}px`;
    wordItem.style.top = `${y}px`;

    // 鼠标悬停事件
    wordItem.addEventListener('mouseenter', () => handleHover(wordItem));
    wordItem.addEventListener('mouseleave', () => handleLeave(wordItem));

    wordCloud.appendChild(wordItem);
});

// 检测是否与其他词云重叠
function isOverlapping(x, y) {
    for (const item of placedItems) {
        const dx = item.x - x;
        const dy = item.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

// 处理鼠标悬停
function handleHover(hoveredItem) {
    const hoveredIndex = placedItems.findIndex(item => item.element === hoveredItem);
    const hoveredX = placedItems[hoveredIndex].x;
    const hoveredY = placedItems[hoveredIndex].y;

    placedItems.forEach((item, index) => {
        if (index !== hoveredIndex) {
            const dx = item.x - hoveredX;
            const dy = item.y - hoveredY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
                const angle = Math.atan2(dy, dx);
                const newX = hoveredX + Math.cos(angle) * minDistance;
                const newY = hoveredY + Math.sin(angle) * minDistance;

                // 确保新位置在分布范围内
                item.x = Math.max(minX, Math.min(maxX, newX));
                item.y = Math.max(minY, Math.min(maxY, newY));

                item.element.style.left = `${item.x}px`;
                item.element.style.top = `${item.y}px`;
            }
        }
    });
}

// 处理鼠标离开
function handleLeave(hoveredItem) {
    placedItems.forEach(item => {
        item.element.style.transition = 'left 0.3s ease, top 0.3s ease';
        item.element.style.left = `${item.x}px`;
        item.element.style.top = `${item.y}px`;
    });

    // 移除过渡效果
    setTimeout(() => {
        placedItems.forEach(item => {
            item.element.style.transition = '';
        });
    }, 300);
}