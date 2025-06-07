// 魔魔版 why 函数
class MomoWhy {
    constructor() {
        // 句子结构模板
        this.templates = [
            "为了{action}{target}。",
            "因为{target}{verb}了{object}。",
            "由于{character}{time}{action}了{object}。",
            "其实是{character}想要{action}{target}。",
            "{target}需要{action}才能{result}。",
            "据说{character}在{place}{action}时发现了{object}。",
            "主要是因为{time}{character}{verb}了{object}。",
            "为了让{target}能够{action}。",
            "因为{character}不小心{action}了{object}。",
            "这样{target}就可以{action}{result}了。"
        ];

        // 词库
        this.words = {
            action: [
                "征服", "感动", "迷倒", "治愈", "拯救", "唤醒", "点亮", "融化", "震撼", "俘获",
                "击败", "收服", "召唤", "释放", "解锁", "激活", "充电", "升级", "重启", "下载"
            ],
            target: [
                "全宇宙", "银河系", "太阳系", "外星人", "月球", "火星", "黑洞", "小行星", 
                "全世界", "全人类", "所有猫咪", "整个互联网", "所有单身狗", "全体程序员",
                "所有仙女", "各路神仙", "所有小动物", "全体观众", "所有镜子", "整个朋友圈"
            ],
            verb: [
                "爱上", "膜拜", "跪倒", "沉醉", "臣服", "上瘾", "着迷", "倾倒", "崇拜", "迷恋",
                "抱走", "收藏", "下载", "转发", "收藏", "截图", "打包", "备份", "推荐", "安利"
            ],
            object: [
                "魔魔的美貌", "魔魔的笑容", "魔魔的眼神", "魔魔的声音", "魔魔的气质",
                "魔魔的自拍", "魔魔的表情包", "魔魔的朋友圈", "魔魔的小视频", "魔魔的签名",
                "魔魔的智慧", "魔魔的幽默感", "魔魔的时尚品味", "魔魔的发型", "魔魔的手指"
            ],
            character: [
                "月老", "玉皇大帝", "王母娘娘", "嫦娥", "孙悟空", "哪吒", "雅典娜", "维纳斯",
                "爱因斯坦", "牛顿", "达芬奇", "莎士比亚", "特斯拉", "乔布斯", "比尔盖茨",
                "外星人首领", "银河系总裁", "宇宙管理员", "时间管理大师", "快乐星球球长"
            ],
            time: [
                "昨天晚上", "今天早上", "刚才", "前天", "上个世纪", "大爆炸的时候",
                "恐龙时代", "盘古开天地时", "昨天做梦时", "上辈子", "前世", "未来",
                "平行宇宙中", "某个时间线上", "量子纠缠时"
            ],
            place: [
                "月球上", "火星上", "银河系中心", "黑洞边缘", "平行宇宙", "仙女座星系",
                "天宫里", "蟠桃园", "南天门", "水晶宫", "青藏高原", "百慕大三角",
                "朋友圈里", "梦境中", "云端上", "次元壁", "时空裂缝"
            ],
            result: [
                "拯救世界", "统治宇宙", "成为传说", "永垂不朽", "名留青史", "飞升成仙",
                "突破次元", "掌控时间", "改变命运", "创造奇迹", "打破记录", "震惊全球",
                "刷爆朋友圈", "登上热搜", "获得诺贝尔奖", "被写入教科书", "载入史册"
            ]
        };
        
        this.answerCount = 0;
    }

    // 获取随机元素
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // 生成随机句子
    generateSentence() {
        const template = this.getRandomItem(this.templates);
        
        return template.replace(/{(\w+)}/g, (match, key) => {
            return this.getRandomItem(this.words[key]);
        });
    }

    // 主函数 - 类似MATLAB的why
    why(n = null) {
        this.answerCount++;
        
        // 特殊彩蛋
        if (this.answerCount % 42 === 0) {
            return "系统错误：魔魔的美貌超出了计算极限！";
        }
        
        if (this.answerCount % 100 === 0) {
            return "恭喜你触发了终极答案：魔魔就是宇宙的中心！";
        }
        
        // 如果指定了数字，使用固定的种子
        if (n !== null) {
            Math.seedrandom(n); // 需要引入seedrandom库以获得一致的结果
        }
        
        return this.generateSentence();
    }
    
    // 生成连续的解释链
    whyChain(depth = 5) {
        let result = [];
        let question = "为什么魔魔这么可爱？";
        
        for (let i = 0; i < depth; i++) {
            let answer = this.generateSentence();
            result.push({
                Q: question,
                A: answer
            });
            
            // 从答案生成下一个问题
            question = "为什么" + answer.slice(0, -1) + "？";
        }
        
        // 添加最终答案
        result.push({
            Q: question,
            A: "因为魔魔就是魔魔啊！这还需要理由吗？"
        });
        
        return result;
    }
}

// // 使用示例
// const momoWhy = new MomoWhy();

// // 简单使用 - 类似MATLAB
// console.log(momoWhy.why());        // 随机答案
// console.log(momoWhy.why(42));      // 第42个答案
// console.log(momoWhy.why());        // 又一个随机答案

// // 生成解释链
// const chain = momoWhy.whyChain(3);
// chain.forEach(item => {
//     console.log(`Q: ${item.Q}`);
//     console.log(`A: ${item.A}`);
//     console.log('---');
// });