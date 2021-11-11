# r-trace
主动记录执行栈信息


# 🌰
```js
new Promise((res) => {
    const a = new Rtrace()
    setTimeout(() => {
        console.log(a.warn());
    }, 1000)
})

const b = new Rtrace()
b.join()
b.join()
b.join()
console.log(b.warn());

const c = new Rtrace()
let i = 10
while(i){
    i--
    c.join()
}
console.log(c.warn());
```