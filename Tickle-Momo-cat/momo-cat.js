// momo-cat.js

// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 文字银行
    const textBank = [
        "你美得让太阳都自愧不如！！",
        "你的笑容比超新星爆炸还要耀眼！！",
        "见到你的那一刻我的智商直接归零！！",
        "你的魅力让地心引力都失效了！！",
        "我愿意为你徒步环游银河系三百次！！",
        "你的声音比一万只百灵鸟合唱还要动听！！",
        "你走过的地方连空气都变甜了！！",
        "我看到你的时候感觉自己升天了！！",
        "你的魅力足以让冰川倒退，沙漠开花！！",
        "一想到你我就能写出比《红楼梦》还长的情书！！",
        "救命太美了[哇][哇][哇]！！",
        "我心跳加速，呼吸加快！！",
        "我净化雾霾的能力赶超热带雨林！！",
        "我将成为新的地球之肺！！",
        "我扑通一声把青藏高原跪成盆地！！",
        "哭到不再需要南水北调工程！！",
        "嚎到产生的风力发电供应全球人民使用！！"
    ];

    // 获取文字显示区域
    const textDisplay = document.getElementById("textDisplay");

    // 显示随机文字
    function displayRandomText() {
        const randomText = textBank[Math.floor(Math.random() * textBank.length)];
        textDisplay.textContent = randomText;
        textDisplay.style.opacity = 1;

        // 3秒后淡出
        setTimeout(() => {
            textDisplay.style.opacity = 0;
        }, 3000);
    }
    // 获取 DOM 元素
    const cat = document.getElementById("momoCat");
    const resetBtn = document.getElementById("resetBtn");

    const earAudio = document.getElementById("earAudio");
    const earAudio2 = document.getElementById("earAudio2");
    const bellyAudio = document.getElementById("bellyAudio");
    const bellyAudio2 = document.getElementById("bellyAudio2");
    const pawAudio = document.getElementById("pawAudio");
    const pawAudio1 = document.getElementById("pawAudio1");
    const pawAudio2 = document.getElementById("pawAudio2");

    // 将所有音频放入数组
    const audioList = [earAudio, earAudio2, bellyAudio, bellyAudio2, pawAudio, pawAudio2];

    // 播放声音并做随机动画，同时显示文字
    function playSoundAndAnimate(audioEl) {
        audioEl.currentTime = 0;
        audioEl.play();
        // 随机旋转 -30~30度，随机缩放 1~1+2
        const deg = (Math.random() - 0.5) * 60;
        const scale = 1 + Math.random() * 2;
        cat.style.transition = "transform 0.3s ease";
        cat.style.transform = `rotate(${deg}deg) scale(${scale})`;
        // 300ms 后复位
        setTimeout(() => {
            cat.style.transform = "";
        }, 300);
        
        // 显示随机文字
        displayRandomText();
    }

    // 获取所有猫咪热点按钮
    const hotspotButtons = [
        document.getElementById("ear"),
        document.getElementById("belly"),
        document.getElementById("paw"),
        document.getElementById("ear-left"),
        document.getElementById("ear-right"),
        document.getElementById("forehead"),
        document.getElementById("chin"),
        document.getElementById("paw-left"),
        document.getElementById("paw-right"),
        document.getElementById("tail")
    ];

    // 给所有热点按钮绑定点击事件
    hotspotButtons.forEach(btn => {
        if (btn) { // 确保按钮存在
            btn.addEventListener("click", () => {
                // 随机选择一个音频
                const randomAudio = audioList[Math.floor(Math.random() * audioList.length)];
                playSoundAndAnimate(randomAudio);
            });
        }
    });

    // 切换躺/站
    resetBtn.addEventListener("click", () => {
        const lying = /lying/.test(cat.src);
        cat.src = lying
            ? "assets/momo_cat_standing.png"
            : "assets/momo_cat_lying.png";
    });
});