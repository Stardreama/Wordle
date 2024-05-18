let newdata
fetch("static/words.json")
    .then(response => response.json())
    .then(data => {
        // 固定的答案长度
        const answerLength = 5;
        // 最多尝试次数
        const maxGuessTime = 6;

        // Wordle 中出现的三种颜色，更推荐使用枚举
        // 此处 green 用字母 b 表示，具体原因请参见代码任务
        const grey = "g";
        const yellow = "y";
        const green = "b";

        // 颜色序列，类型为 string[]
        let colorSequence = [];
        // 单词序列，类型为 string[]
        let wordSequence = [];

        // 本次 Wordle 的答案
        let answer = ""
        // 当前猜测的答案
        let guess = "";
        // 当前已经使用的猜测次数
        let currentGuessTime = 0;
        let j = 0//当前字母输入框的下标
        let m = 0
        let flag = 0
        // const input = document.querySelectorAll('.single')
        // const button = document.querySelectorAll('button')
        newdata = data['words']
        console.log(newdata);
        // answer = generateRandomAnswer()
        console.log(answer);
        // console.log('--------');
        // console.log(isValidWord('maker'));
        console.log('--------');
        // initialize()
        // console.log('---------');

        // console.log('---------*');
        // handleAnswer('black',answer)
        function shake(elem) {
            if (elem) {
                elem.classList.add('shake')
                setTimeout(() => { elem.classList.remove('shake') }, 800)
            }
        }
        /**
         * 本文件是在构建 Wordle 程序过程中需要使用的脚本
         * ! 在编写代码之前请您务必仔细阅读每一行注释
         * 其中部分函数已经给出，需要您根据实际需求进行补全
         * 函数的具体作用请参考注释
         * 请确保所有的 TODO 都被补全
         * 若无特殊需要请尽量不要定义新的函数
         */

        /**
         * Global Variables
         * 
         * 您的所有全局变量需要在此处定义
         * 我们已经预先为您定义了一部分全局变量
         * 
         * 请思考：
         * 
         * 1. 为什么使用 let/const 来定义变量而不是 var 关键字
         * 2. let 和 const 关键字定义的变量有什么区别
         * 3. 已经被预定义的全局变量分别有怎样的作用
         */


        /**
         * 程序当前的状态，更推荐使用枚举
         * 
         * 预计会使用到的状态：
         * 1. "UNFINISHED": 表示 Wordle 未被解决即仍有剩余猜测次数
         * 2. "SOLVED": 表示当前 Wordle 已被解决
         * 3. "FAILED": 表示当前 Wordle 解决失败
         * 可以根据需要设计新的状态
         */
        let state = "UNFINISHED";
        const show_state = document.querySelector('.state')
        show_state.innerHTML = state
        /**
         * 预定义的 JavaScript 程序的入口
         * 请不要额外定义其他的程序入口
         */
        start();

        /**
         * start()
         * 
         * 整个程序的入口函数，这里为了简化程序的运行逻辑违背了单一指责原则和最小权限原则，在实际开发时不推荐这样处理
         * 
         * 您需要完成的任务：
         * 1. 初始化程序的运行状态
         * 2. 接收交互信息后改变内部状态并作出反馈
         * 
         * 请思考：
         * 1. 在怎样的时刻需要调用 initialize 函数
         * 2. 程序的交互信息是什么（猜测的单词？）
         * 3. 内部状态会如何根据交互信息而改变（state 变量的作用？）
         * 4. 程序内部状态变化之后会作出怎样的反馈（页面重新渲染？）
         * 5. 如何读取交互信息
         * 6. 程序在什么时候会终止
         */
        function start() {
            initialize();
            // TODO
            answer = generateRandomAnswer()
            // answer='aaabb'
            // if (checkGuessTime() === 2) {
            //     alert('2次')
            // }
            render()
        }
        console.log(answer);
        console.log('*******');
        show_state.style.color = 'blue'
        checkGuessTime()
        /**
         * render()
         * 
         * 根据程序当前的状态渲染对应的用户页面
         * 
         * 您需要完成的任务：
         * 1. 基于 DOM 实现程序状态和 HTML 组件的绑定
         * 2. 当程序内部状态发生改变时需要重新渲染页面
         * 
         * 请思考：
         * 1. 什么是 DOM，这项技术有怎样的作用
         * 2. 如何实现程序内部状态和 HTML 组建的绑定，为什么要这么设计
         * 3. 应该在怎样的时刻调用 render 函数
         */
        function render() {
            // TODO
            const button = document.querySelectorAll('.footer button')
            const input = document.querySelectorAll('.single')
            for (let i = 0; i < button.length; i++) {
                if (i === 19) {
                    button[i].addEventListener('click', () => handleAnswer(guess))
                }
                else if (i === button.length - 1) {
                    button[i].addEventListener('click', function (e) {
                        if (j > currentGuessTime * 5) {//判断该行是否已经删除完
                            j--
                            input[j].innerHTML = ''
                            guess = guess.slice(0, guess.length - 1)
                            console.log(guess);
                        }
                    })
                }
                else {
                    button[i].addEventListener('click', function (e) {
                        if (j >= currentGuessTime * 5 && j < (currentGuessTime + 1) * 5) {
                            input[j].innerHTML = this.innerHTML
                            guess += this.innerHTML
                            console.log(guess);
                            j++
                        }
                    })
                }
            }
            document.addEventListener('keyup', function (e) {
                if (e.key === 'Enter') {
                    handleAnswer(guess);
                } else if (e.key === 'Backspace') {
                    if (j > currentGuessTime * 5) {
                        j--;
                        input[j].innerHTML = '';
                        guess = guess.slice(0, guess.length - 1);
                    }
                } else if (e.key.length === 1 && ((e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) || (e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90))) {
                    if (j >= currentGuessTime * 5 && j < (currentGuessTime + 1) * 5) {
                        input[j].innerHTML = e.key.toUpperCase();
                        guess += e.key.toUpperCase();
                        console.log(guess);
                        j++;
                    }
                }
            });
        }

        /**
         * initialize()
         * 
         * 初始化程序的状态
         * 
         * 请思考：
         * 1. 有哪些状态或变量需要被初始化
         * colorSequence,wordSequence,currentGuessTime,answer,guess
         * 2. 初始化时 state 变量处于怎样的状态
         */
        function initialize() {
            // TODO
            guess = ''
            colorSequence = []
            wordSequence = []
        }
        /**
         * generateRandomAnswer()
         * 
         * 从题库中随机选取一个单词作为答案
         * 
         * 单词文件位于 /static/words.json 中
         * 
         * 请思考：
         * 1. 如何读取 json 文件
         * 2. 如何随机抽取一个单词
         * 
         * @return {string} answer
         */
        function generateRandomAnswer() {
            // TODO
            let random = Math.floor(Math.random() * newdata.length)
            return newdata[random]
        }
        /**
         * isValidWord()
         * 
         * 判断一个单词是否合法
         * 
         * 请思考：
         * 1. 判断一个单词是否合法的规则有哪些
         * 2. 是否存在多条判断规则
         * 3. 如果上条成立，那么这些规则执行的先后顺序是怎样的，不同的执行顺序是否会对单词的合法性判断造成影响
         * 4. 如果单词不合法，那么程序的状态会如何变化，程序应当作出怎样的反馈
         * 
         * @param {string} word 
         * @return {boolean} isValid
         */
        function isValidWord(word) {
            // TODO
            for (let i = 0; i < newdata.length; i++) {
                if ( newdata[i]=== word) {
                    return true
                }
            }
            // console.log(newdata);
            // console.log("isvalid");
            // newdata.forEach(element=> {
            //     if ( element=== word) {
            //         return true
            //     }
            // });
            return false
        }

        /**
         * handleAnswer()
         * 
         * 处理一次对单词的猜测，并根据其猜测结果更新程序内部状态
         * 
         * 请思考：
         * 1. 是否需要对 guess 变量的字符串作某种预处理，为什么
         * 
         * @param {string} guess 
         */
        function handleAnswer(guess) {
            // TODO
            currentGuessTime++
            let guess2 = guess.split('')
            const button = document.querySelectorAll('.footer button')
            const input = document.querySelectorAll('.single')
            guess = guess.toLowerCase()
            if (isValidWord(guess)) {
                // console.log('执行到这了');
                // console.log(guess.split(''));
                // console.log(guess);
                let n = m
                m += 5
                let str = calculateColorSequence(guess, answer)
                str = str.split('')
                console.log(str);
                for (n; n < m; n++) {
                    input[n].classList.add(str[n % 5])
                    input[n].classList.add('flipper')
                    for (let p = 0; p < button.length; p++) {
                        if (button[p].innerHTML === guess2[n % 5]) {
                            if (str[n % 5] === 'b') {
                                button[p].className = 'b'
                            }
                            else if (button[p].className !== 'b') {
                                if (str[n % 5] === 'y') {
                                    button[p].className = 'y'
                                }
                                else {
                                    if (button[p].className !== 'y') {
                                        button[p].className = 'g'
                                    }
                                }
                            }
                        }
                    }
                }
                if (guess === answer) {
                    flag = 1
                }
                checkGuessTime()
                initialize()
                // guess=''
            }
            else {
                // alert('该单词不存在')
                // let p = j
                // j -= 5
                // console.log(j);
                // currentGuessTime--
                // initialize()
                // for (let q = j; q <= p; q++) {
                //     input[q].innerHTML = ''
                // }
                const box = document.querySelectorAll('.Row')
                shake(box[currentGuessTime - 1])
                currentGuessTime--
            }
        }
        /**
         * calculateColorSequence()
         * 
         * 计算两个单词的颜色匹配序列
         * 
         * 例如：
         * 给定 answer = "apple", guess = "angel"
         * 
         * 那么返回结果为："bggyy"
         * 
         * 请思考：
         * 1. Wordle 的颜色匹配算法是如何实现的
         * 2. 有哪些特殊的匹配情况
         *
         * @param {string} guess
         * @param {string} answer
         * @return {string} colorSequence
         */
        function calculateColorSequence(guess, answer) {
            // TODO

            let guess1 = guess.split('')
            let solution1 = answer.split('')
            let res = []
            let i = 0
            let j = 0
            let flag = 1
            for (i = 0; i < guess1.length; i++) {
                if (guess1[i] === solution1[i]) {
                    guess1[i] = -1
                    solution1[i] = -1
                }
            }
            for (i = 0; i < guess1.length; i++) {
                flag = 1
                if (guess1[i] !== -1) {
                    for (j = 0; j < solution1.length; j++) {
                        if (guess1[i] === solution1[j]) {
                            flag = 0
                            // if (i === j) {
                            //     res.push('b')
                            //     break
                            // }
                            // else {
                            res.push('y')
                            solution1[j] = 0
                            break
                            // }
                        }
                    }
                    if (flag) {
                        res.push('g')
                    }
                }
                else {
                    res.push('b')
                }
            }
            return res.join('')
        }
        function checkGuessTime() {
            const re = document.querySelector('.re button')
            const button = document.querySelectorAll('.footer button')
            if (flag) {
                state = "SOLVED"
                show_state.style.color = 'green'
                show_state.innerHTML = state
                // alert('猜对了')
                re.addEventListener('click', function () {
                    location.reload()
                })
                for (let i = 0; i < button.length; i++) {
                    button[i].disabled = true
                    re.style.display = 'block'
                }
            }
            else {
                // state="UNFINISHED"
                if (currentGuessTime === 6) {
                    state = "FAILED"
                    show_state.innerHTML = state + ',the answer is ' + answer
                    show_state.style.color = 'red'
                    const button = document.querySelectorAll('.footer button')
                    re.addEventListener('click', function () {
                        location.reload()
                    })
                    for (let i = 0; i < button.length; i++) {
                        button[i].disabled = true
                        re.style.display = 'block'
                    }
                }
            }
        }
        const restart = document.querySelector('.re')
        restart.addEventListener('click', function () {
            const button = document.querySelectorAll('.footer button')
            const input = document.querySelectorAll('.single')
            initialize()
            checkGuessTime = 0
            state = "UNFINISHED"
            show_state.style.color = 'blue'
            show_state.innerHTML = state
            for (let i = 0; i < input.length; i++) {
                input[i].innerHTML = ''
                const element = document.getElementById(input[i]);
                const classNames = element.classList; // 获取类名列表
                element.classList.remove.apply(element.classList, classNames);
            }
            for (let i = 0; i < button.length; i++) {
                const element = document.getElementById(button[i]);
                const classNames = element.classList; // 获取类名列表
                element.classList.remove.apply(element.classList, classNames);
            }
            button[19].classList.add('enter')
            button[button.length - 1].classList.add('del')
            for (let i = 0; i < button.length; i++) {
                button[i].disabled = false
                re.style.display = 'none'
            }
        })
    });