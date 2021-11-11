export default class Rtrace {
    lines = [];
    constructor() {
        this.join()
    }
    static filterRtraceLine(arr) {
        const methods = ['getTrace', 'join', 'warn'].map(k => `Rtrace.${k}`) // 需要过滤掉的三个调用栈信息
        return arr.filter(traceText => methods.every(k => !traceText.includes(k))) // 过滤
    }
    getTrace() {
        try {
            throw new Error(); // 主动报错
        } catch (e) {
            const list = e.stack
                .replace(/at /g, "") //去除所有 at
                .split("\n")
                .map((i) => i.trim()); // 换行分割
            list.shift(); //  去掉首行的error
            return Rtrace.filterRtraceLine(
                list.filter(
                    (l) => !this.lines.includes(l)
                ) // 过滤重复的执行栈 过滤 Rtrace.join 的执行栈
            )
        }
    }
    join() {
        const {
            lines
        } = this;
        const list = this.getTrace();
        list.length && lines.unshift(...["---", ...list]);
        return this;
    }
    warn() {
        const {
            lines
        } = this;
        const list = this.getTrace();
        return [...list, ...lines]
    }
}