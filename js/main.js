const Store = {
    set(key, val) { localStorage.setItem(key, JSON.stringify(val)) },
    get(key) { let d = localStorage.getItem(key); return d ? JSON.parse(d) : null }
}
// 模拟濮阳主播房间数据
const LiveRoomList = [
    {id:1,name:"晓晓",area:"华龙区",online:1268,tag:"视频相亲",img:"https://picsum.photos/id/1039/400/240",title:"濮阳本地相亲连麦"},
    {id:2,name:"阿泽",area:"濮阳县",online:862,tag:"聊天交友",img:"https://picsum.photos/id/1012/400/240",title:"下班一起来聊天"},
    {id:3,name:"月月",area:"清丰县",online:945,tag:"才艺唱歌",img:"https://picsum.photos/id/1027/400/240",title:"清丰本地小姐姐在线唱歌"},
    {id:4,name:"曼曼",area:"台前县",online:632,tag:"同城约会",img:"https://picsum.photos/id/1068/400/240",title:"找濮阳同城小伙伴线下见面"},
    {id:5,name:"静静",area:"南乐县",online:710,tag:"深夜连麦",img:"https://picsum.photos/id/1062/400/240",title:"深夜连麦谈心"},
    {id:6,name:"小宇",area:"范县",online:520,tag:"户外直播",img:"https://picsum.photos/id/1074/400/240",title:"龙湖户外边走边聊"},
    {id:7,name:"辰辰",area:"华龙区",online:1103,tag:"游戏连麦",img:"https://picsum.photos/id/1005/400/240",title:"濮阳青年游戏组队"},
    {id:8,name:"小冉",area:"华龙区",online:1520,tag:"新人主播",img:"https://picsum.photos/id/64/400/240",title:"刚开播，濮阳老乡来聊天"}
]
// 短视频数据
const ShortVideoList = [
    {id:1,user:"晓晓",img:"https://picsum.photos/id/1040/300/320",like:3200,area:"华龙区"},
    {id:2,user:"阿泽",img:"https://picsum.photos/id/1041/300/320",like:1860,area:"濮阳县"},
    {id:3,user:"月月",img:"https://picsum.photos/id/1042/300/320",like:2450,area:"清丰县"},
    {id:4,user:"曼曼",img:"https://picsum.photos/id/1043/300/320",like:980,area:"台前县"},
    {id:5,user:"静静",img:"https://picsum.photos/id/1044/300/320",like:1620,area:"南乐县"},
    {id:6,user:"辰辰",img:"https://picsum.photos/id/1045/300/320",like:2100,area:"华龙区"},
    {id:7,user:"小冉",img:"https://picsum.photos/id/1046/300/320",like:4100,area:"华龙区"},
    {id:8,user:"小宇",img:"https://picsum.photos/id/1047/300/320",like:1350,area:"范县"},
    {id:9,user:"乐乐",img:"https://picsum.photos/id/1048/300/320",like:760,area:"濮阳县"},
    {id:10,user:"琪琪",img:"https://picsum.photos/id/1049/300/320",like:2780,area:"清丰县"}
]
// 初始化弹幕
let barrageList = Store.get("barrage") || [
    {name:"濮阳小张",msg:"主播是华龙区的吗？"},
    {name:"阿凯",msg:"我也在龙湖这边！"},
    {name:"月月",msg:"可以连麦聊聊吗"},
    {name:"老陈",msg:"线下活动什么时候开？"}
]
// 页面加载渲染
window.onload = function() {
    renderLiveRoom()
    renderShortVideo()
    renderBarrage()
}
// 渲染直播间卡片
function renderLiveRoom() {
    const wrap = document.getElementById("liveWrap")
    if(!wrap) return
    let html = ""
    LiveRoomList.forEach(item=>{
        html += `
        <div class="live-card" onclick="enterRoom(${item.id})">
            <div class="live-img" style="background:url(${item.img}) center/cover">
                <div class="live-online">👥 ${item.online}人在线</div>
                <div class="live-tag">${item.tag}</div>
            </div>
            <div class="live-info">
                <div class="live-name">${item.name}<span style="font-size:13px;color:var(--text-gray)">${item.area}</span></div>
                <p class="live-desc">${item.title}</p>
                <button class="enter-live">进入直播间</button>
            </div>
        </div>
        `
    })
    wrap.innerHTML = html
}
// 渲染短视频瀑布流
function renderShortVideo() {
    const wrap = document.getElementById("shortWrap")
    if(!wrap) return
    let html = ""
    ShortVideoList.forEach(v=>{
        html += `
        <div class="short-card">
            <img src="${v.img}" alt="短视频">
            <div class="short-mask">
                <div>${v.user} · ${v.area}</div>
                <div class="short-like">❤️ ${v.like}</div>
            </div>
        </div>
        `
    })
    wrap.innerHTML = html
}
// 渲染弹幕
function renderBarrage() {
    const box = document.getElementById("barrageBox")
    if(!box) return
    let html = ""
    barrageList.forEach(b=>{
        html += `<div class="barrage-item"><span class="barrage-name">${b.name}：</span>${b.msg}</div>`
    })
    box.innerHTML = html
    box.scrollTop = box.scrollHeight
}
// 发送弹幕
function sendBarrage() {
    const input = document.getElementById("barrageInput")
    const val = input.value.trim()
    if(!val) return
    let newBarrage = {name:"本地游客",msg:val}
    barrageList.push(newBarrage)
    Store.set("barrage", barrageList)
    renderBarrage()
    input.value = ""
}
// 进入直播间
function enterRoom(rid) {
    Store.set("currentRoomId", rid)
    window.location.href = "live.html"
}
// 登录注册
function register() {
    let name = document.getElementById("regName").value
    let phone = document.getElementById("regPhone").value
    let pwd = document.getElementById("regPwd").value
    let area = document.getElementById("regArea").value
    if(!name||!phone||!pwd||!area) return alert("请填写完整信息")
    Store.set("userInfo", {name,phone,pwd,area})
    alert("注册成功，自动登录！")
    window.location.href = "index.html"
}
function login() {
    let phone = document.getElementById("loginPhone").value
    let pwd = document.getElementById("loginPwd").value
    let user = Store.get("userInfo")
    if(!user) return alert("暂无账号，请注册")
    if(user.phone == phone && user.pwd == pwd) {
        alert("登录成功")
        window.location.href = "index.html"
    } else {
        alert("账号密码错误")
    }
}
